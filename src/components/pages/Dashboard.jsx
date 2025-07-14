import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import StatCard from "@/components/molecules/StatCard";
import LeaveRequestCard from "@/components/molecules/LeaveRequestCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { employeeService } from "@/services/api/employeeService";
import { departmentService } from "@/services/api/departmentService";
import { leaveService } from "@/services/api/leaveService";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [employeesData, departmentsData, leaveData] = await Promise.all([
        employeeService.getAll(),
        departmentService.getAll(),
        leaveService.getAll()
      ]);

      setEmployees(employeesData);
      setDepartments(departmentsData);
      setLeaveRequests(leaveData);
    } catch (error) {
      setError("Failed to load dashboard data");
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLeave = async (requestId) => {
    try {
      await leaveService.update(requestId, { status: "approved" });
      toast.success("Leave request approved");
      loadDashboardData();
    } catch (error) {
      toast.error("Failed to approve leave request");
    }
  };

  const handleRejectLeave = async (requestId) => {
    try {
      await leaveService.update(requestId, { status: "rejected" });
      toast.success("Leave request rejected");
      loadDashboardData();
    } catch (error) {
      toast.error("Failed to reject leave request");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Loading type="stats" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Loading type="cards" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Error message={error} onRetry={loadDashboardData} />
      </div>
    );
  }

  const activeEmployees = employees.filter(emp => emp.status === "active");
  const pendingRequests = leaveRequests.filter(req => req.status === "pending");

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome back! Here's what's happening in your organization.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={employees.length}
          icon="Users"
          trend={{ direction: "up", value: "+12%", label: "from last month" }}
        />
        <StatCard
          title="Active Employees"
          value={activeEmployees.length}
          icon="UserCheck"
          trend={{ direction: "up", value: "+5%", label: "from last month" }}
        />
        <StatCard
          title="Departments"
          value={departments.length}
          icon="Building"
        />
        <StatCard
          title="Pending Requests"
          value={pendingRequests.length}
          icon="Clock"
          trend={{ direction: "down", value: "-8%", label: "from last month" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {employees.slice(-5).map((employee, index) => (
              <motion.div
                key={employee.Id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {employee.firstName} {employee.lastName} joined the team
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(employee.hireDate).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Pending Leave Requests ({pendingRequests.length})
          </h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {pendingRequests.length === 0 ? (
              <Empty
                title="No pending requests"
                description="All leave requests have been processed"
                icon="Check"
              />
            ) : (
              pendingRequests.slice(0, 3).map((request) => {
                const employee = employees.find(emp => emp.Id === request.employeeId);
                return employee ? (
                  <LeaveRequestCard
                    key={request.Id}
                    request={request}
                    employee={employee}
                    onApprove={handleApproveLeave}
                    onReject={handleRejectLeave}
                  />
                ) : null;
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;