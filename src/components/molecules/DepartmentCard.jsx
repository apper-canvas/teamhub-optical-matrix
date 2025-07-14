import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const DepartmentCard = ({ department, employees, onEdit, onDelete, className, ...props }) => {
  const manager = employees.find(emp => emp.Id === department.managerId);
  const departmentEmployees = employees.filter(emp => emp.departmentId === department.Id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn("p-6 hover:shadow-lg transition-all duration-300", className)} {...props}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">{department.name}</h3>
            <p className="text-sm text-gray-600">{department.description}</p>
          </div>
          <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-3">
            <ApperIcon name="Building" className="h-6 w-6 text-white" />
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Team Size</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {departmentEmployees.length}
            </span>
          </div>
          
          {manager && (
            <div className="flex items-center space-x-2">
              <Avatar
                src={manager.photo}
                alt={`${manager.firstName} ${manager.lastName}`}
                fallback={`${manager.firstName[0]}${manager.lastName[0]}`}
                size="sm"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {manager.firstName} {manager.lastName}
                </p>
                <p className="text-xs text-gray-500">Department Manager</p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {departmentEmployees.slice(0, 3).map((employee) => (
                <Avatar
                  key={employee.Id}
                  src={employee.photo}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  fallback={`${employee.firstName[0]}${employee.lastName[0]}`}
                  size="sm"
                  className="border-2 border-white"
                />
              ))}
              {departmentEmployees.length > 3 && (
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 border-2 border-white text-xs font-medium text-gray-600">
                  +{departmentEmployees.length - 3}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(department)}
              >
                <ApperIcon name="Edit" className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(department.Id)}
              >
                <ApperIcon name="Trash2" className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DepartmentCard;