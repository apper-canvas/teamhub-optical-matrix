import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose, className, ...props }) => {
const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Employees", href: "/employees", icon: "Users" },
    { name: "Departments", href: "/departments", icon: "Building" },
    { name: "Leave Management", href: "/leave-management", icon: "Calendar" },
    { name: "Onboarding", href: "/onboarding", icon: "ClipboardCheck" },
  ];
  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-6 py-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Users" className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TeamHub
            </h1>
            <p className="text-xs text-gray-500">Employee Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-primary hover:text-white group",
                isActive
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-sm"
                  : "text-gray-700 hover:bg-primary hover:text-white"
              )
            }
          >
            <ApperIcon name={item.icon} className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-surface lg:border-r lg:shadow-sm", className)} {...props}>
        {sidebarContent}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            className="absolute left-0 top-0 h-full w-64 bg-surface shadow-lg"
          >
            {sidebarContent}
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Sidebar;