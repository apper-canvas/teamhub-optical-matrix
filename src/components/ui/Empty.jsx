import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No data found", 
  description = "Get started by adding your first item", 
  action,
  icon = "Database"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 p-6">
        <ApperIcon name={icon} className="h-16 w-16 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-sm">
        {description}
      </p>
      
      {action && (
        <Button onClick={action.onClick} className="min-w-[120px]">
          <ApperIcon name={action.icon} className="h-4 w-4 mr-2" />
          {action.label}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;