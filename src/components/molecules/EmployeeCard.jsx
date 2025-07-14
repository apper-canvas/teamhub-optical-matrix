import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const EmployeeCard = ({ employee, onEdit, onDelete, className, ...props }) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "error";
      default:
        return "default";
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
          <Badge variant={getStatusVariant(employee.status)}>
            {employee.status}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
            {employee.email}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Phone" className="h-4 w-4 mr-2" />
            {employee.phone}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
            Joined {new Date(employee.hireDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            Leave Balance: <span className="font-semibold text-accent">{employee.leaveBalance} days</span>
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(employee)}
            >
              <ApperIcon name="Edit" className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(employee.Id)}
            >
              <ApperIcon name="Trash2" className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EmployeeCard;