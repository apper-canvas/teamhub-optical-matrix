import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg bg-surface p-6 shadow-sm"
          >
            <div className="animate-pulse space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="h-3 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                <div className="h-3 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
                <div className="flex space-x-2">
                  <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "stats") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg bg-surface p-6 shadow-sm"
          >
            <div className="animate-pulse">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                  <div className="h-8 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
                </div>
                <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;