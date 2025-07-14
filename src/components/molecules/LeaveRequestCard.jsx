import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";
import { format } from "date-fns";

const LeaveRequestCard = ({ request, employee, onApprove, onReject, className, ...props }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "vacation":
        return "Palmtree";
      case "sick":
        return "Heart";
      case "personal":
        return "User";
      default:
        return "Calendar";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("p-6 hover:shadow-lg transition-all duration-300", className)} {...props}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar
              src={employee.photo}
              alt={`${employee.firstName} ${employee.lastName}`}
              fallback={`${employee.firstName[0]}${employee.lastName[0]}`}
              size="lg"
            />
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-600">{employee.role}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant(request.status)}>
            {request.status}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name={getTypeIcon(request.type)} className="h-4 w-4 mr-2" />
            {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Leave
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
            {format(new Date(request.startDate), "MMM d, yyyy")} - {format(new Date(request.endDate), "MMM d, yyyy")}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Clock" className="h-4 w-4 mr-2" />
            Requested on {format(new Date(request.requestDate), "MMM d, yyyy")}
          </div>
        </div>

        {request.reason && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-700">{request.reason}</p>
          </div>
        )}

        {request.status === "pending" && (
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onReject(request.Id)}
            >
              <ApperIcon name="X" className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Button
              variant="success"
              size="sm"
              onClick={() => onApprove(request.Id)}
            >
              <ApperIcon name="Check" className="h-4 w-4 mr-1" />
              Approve
            </Button>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default LeaveRequestCard;