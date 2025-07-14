import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import Select from "@/components/atoms/Select";
import { departmentService } from "@/services/api/departmentService";
import { employeeService } from "@/services/api/employeeService";

const DepartmentForm = ({ department, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    managerId: "",
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (department) {
      setFormData(department);
    }
    loadEmployees();
  }, [department]);

  const loadEmployees = async () => {
    try {
      const data = await employeeService.getAll();
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (department) {
        await departmentService.update(department.Id, formData);
        toast.success("Department updated successfully");
      } else {
        await departmentService.create(formData);
        toast.success("Department created successfully");
      }
      onSuccess();
    } catch (error) {
      toast.error("Failed to save department");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField
        label="Department Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <FormField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />

      <FormField label="Manager">
        <Select
          name="managerId"
          value={formData.managerId}
          onChange={handleChange}
        >
          <option value="">Select Manager</option>
          {employees.map(emp => (
            <option key={emp.Id} value={emp.Id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </Select>
      </FormField>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : department ? "Update Department" : "Create Department"}
        </Button>
      </div>
    </form>
  );
};

export default DepartmentForm;