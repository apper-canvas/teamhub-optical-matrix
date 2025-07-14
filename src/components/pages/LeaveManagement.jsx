import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import SearchBar from "@/components/molecules/SearchBar";
import LeaveRequestCard from "@/components/molecules/LeaveRequestCard";
import Modal from "@/components/molecules/Modal";
import LeaveRequestForm from "@/components/organisms/LeaveRequestForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { leaveService } from "@/services/api/leaveService";
import { employeeService } from "@/services/api/employeeService";

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    loadLeaveRequests();
    loadEmployees();
  }, []);

  useEffect(() => {
    filterRequests();
  }, [leaveRequests, employees, searchTerm, statusFilter, typeFilter]);

  const loadLeaveRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await leaveService.getAll();
      setLeaveRequests(data);
    } catch (error) {
      setError("Failed to load leave requests");
      toast.error("Failed to load leave requests");
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

  const filterRequests = () => {
    let filtered = leaveRequests;

    if (searchTerm) {
      filtered = filtered.filter(request => {
        const employee = employees.find(emp => emp.Id === request.employeeId);
        return employee && 
          `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter(request => request.type === typeFilter);
    }

    setFilteredRequests(filtered);
  };

  const handleAddRequest = () => {
    setShowModal(true);
  };

  const handleApproveRequest = async (requestId) => {
    try {
      await leaveService.update(requestId, { status: "approved" });
      toast.success("Leave request approved");
      loadLeaveRequests();
    } catch (error) {
      toast.error("Failed to approve leave request");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await leaveService.update(requestId, { status: "rejected" });
      toast.success("Leave request rejected");
      loadLeaveRequests();
    } catch (error) {
      toast.error("Failed to reject leave request");
    }
  };

  const handleFormSuccess = () => {
    setShowModal(false);
    loadLeaveRequests();
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
        <Error message={error} onRetry={loadLeaveRequests} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Leave Management
        </h1>
        <Button onClick={handleAddRequest}>
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          New Request
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search by employee name..."
            onSearch={setSearchTerm}
            className="w-full"
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-40"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </Select>
        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full md:w-40"
        >
          <option value="all">All Types</option>
          <option value="vacation">Vacation</option>
          <option value="sick">Sick</option>
          <option value="personal">Personal</option>
        </Select>
      </div>

      {filteredRequests.length === 0 ? (
        <Empty
          title="No leave requests found"
          description="No leave requests match your current filters. Try adjusting your search or filters."
          action={{
            label: "New Request",
            icon: "Plus",
            onClick: handleAddRequest
          }}
          icon="Calendar"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRequests.map((request) => {
            const employee = employees.find(emp => emp.Id === request.employeeId);
            return employee ? (
              <LeaveRequestCard
                key={request.Id}
                request={request}
                employee={employee}
                onApprove={handleApproveRequest}
                onReject={handleRejectRequest}
              />
            ) : null;
          })}
        </motion.div>
      )}

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="New Leave Request"
        className="max-w-lg"
      >
        <LeaveRequestForm
          onSuccess={handleFormSuccess}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default LeaveManagement;