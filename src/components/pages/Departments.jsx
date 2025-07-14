import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import DepartmentCard from "@/components/molecules/DepartmentCard";
import Modal from "@/components/molecules/Modal";
import DepartmentForm from "@/components/organisms/DepartmentForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { departmentService } from "@/services/api/departmentService";
import { employeeService } from "@/services/api/employeeService";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadDepartments();
    loadEmployees();
  }, []);

  useEffect(() => {
    filterDepartments();
  }, [departments, searchTerm]);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await departmentService.getAll();
      setDepartments(data);
    } catch (error) {
      setError("Failed to load departments");
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  const filterDepartments = () => {
    let filtered = departments;

    if (searchTerm) {
      filtered = filtered.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDepartments(filtered);
  };

  const handleAddDepartment = () => {
    setSelectedDepartment(null);
    setShowModal(true);
  };

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const handleDeleteDepartment = async (departmentId) => {
    const departmentEmployees = employees.filter(emp => emp.departmentId === departmentId);
    
    if (departmentEmployees.length > 0) {
      toast.error("Cannot delete department with employees. Please reassign employees first.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await departmentService.delete(departmentId);
        toast.success("Department deleted successfully");
        loadDepartments();
      } catch (error) {
        toast.error("Failed to delete department");
      }
    }
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    setSelectedDepartment(null);
    loadDepartments();
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading type="cards" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadDepartments} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Departments
        </h1>
        <Button onClick={handleAddDepartment}>
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search departments..."
            onSearch={setSearchTerm}
            className="w-full"
          />
        </div>
      </div>

      {filteredDepartments.length === 0 ? (
        <Empty
          title="No departments found"
          description="No departments match your current search. Try adjusting your search terms."
          action={{
            label: "Add Department",
            icon: "Plus",
            onClick: handleAddDepartment
          }}
          icon="Building"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredDepartments.map((department) => (
            <DepartmentCard
              key={department.Id}
              department={department}
              employees={employees}
              onEdit={handleEditDepartment}
              onDelete={handleDeleteDepartment}
            />
          ))}
        </motion.div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedDepartment ? "Edit Department" : "Add Department"}
        className="max-w-lg"
      >
        <DepartmentForm
          department={selectedDepartment}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Departments;