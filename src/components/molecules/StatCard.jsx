import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ title, value, icon, trend, className, ...props }) => {
  return (
    <Card className={cn("p-6 bg-gradient-to-br from-surface to-gray-50", className)} {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {value}
          </p>
        </div>
        <div className="rounded-full bg-gradient-to-r from-primary to-secondary p-3">
          <ApperIcon name={icon} className="h-6 w-6 text-white" />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <ApperIcon 
            name={trend.direction === "up" ? "TrendingUp" : "TrendingDown"} 
            className={cn("h-4 w-4 mr-1", {
              "text-success": trend.direction === "up",
              "text-error": trend.direction === "down",
            })}
          />
          <span className={cn("font-medium", {
            "text-success": trend.direction === "up",
            "text-error": trend.direction === "down",
          })}>
            {trend.value}
          </span>
          <span className="text-gray-500 ml-1">{trend.label}</span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;