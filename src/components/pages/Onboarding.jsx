import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { onboardingService } from "@/services/api/onboardingService";
import { cn } from "@/utils/cn";

const Onboarding = () => {
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState({ completed: 0, total: 0, percentage: 0, categories: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [tasksData, progressData] = await Promise.all([
        onboardingService.getAll(),
        onboardingService.getProgress()
      ]);
      setTasks(tasksData);
      setProgress(progressData);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to load onboarding data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const updatedTask = await onboardingService.toggleCompletion(taskId);
      setTasks(prev => prev.map(task => 
        task.Id === taskId ? updatedTask : task
      ));
      
      // Update progress
      const newProgress = await onboardingService.getProgress();
      setProgress(newProgress);
      
      toast.success(
        updatedTask.completed 
          ? 'Task marked as complete!' 
          : 'Task marked as incomplete'
      );
    } catch (err) {
      toast.error('Failed to update task');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-white';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-info text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Paperwork': return 'FileText';
      case 'Training': return 'GraduationCap';
      case 'System Access': return 'Key';
      default: return 'CheckCircle';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return task.category === filter;
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadData} />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Onboarding Checklist</h1>
            <p className="text-gray-600 mt-1">Complete your onboarding tasks to get started</p>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Users" className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">{progress.percentage}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
            <span className="text-sm text-gray-500">
              {progress.completed} of {progress.total} tasks completed
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <motion.div
              className="bg-gradient-to-r from-success to-primary h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          {/* Category Progress */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(progress.categories).map(([key, category]) => (
              <div key={key} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ApperIcon 
                    name={getCategoryIcon(key === 'systemAccess' ? 'System Access' : key.charAt(0).toUpperCase() + key.slice(1))} 
                    className="h-5 w-5 text-primary mr-2" 
                  />
                  <span className="font-medium text-gray-700">
                    {key === 'systemAccess' ? 'System Access' : key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {category.completed}/{category.total} completed
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${category.total > 0 ? (category.completed / category.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'completed', 'Paperwork', 'Training', 'System Access'].map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(filterOption)}
            className="capitalize"
          >
            {filterOption === 'all' ? 'All Tasks' : filterOption}
          </Button>
        ))}
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTasks.map((task) => (
          <motion.div
            key={task.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={cn(
              "p-6 transition-all duration-200 hover:shadow-lg",
              task.completed ? "bg-success/5 border-success/20" : "bg-white"
            )}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleTask(task.Id)}
                    className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                      task.completed
                        ? "bg-success border-success text-white"
                        : "border-gray-300 hover:border-primary"
                    )}
                  >
                    {task.completed && <ApperIcon name="Check" className="h-4 w-4" />}
                  </button>
                  <div>
                    <h3 className={cn(
                      "font-semibold text-gray-900",
                      task.completed && "line-through text-gray-500"
                    )}>
                      {task.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        <ApperIcon name={getCategoryIcon(task.category)} className="h-3 w-3 mr-1" />
                        {task.category}
                      </Badge>
                      <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                </div>
                <ApperIcon 
                  name={task.completed ? "CheckCircle2" : "Circle"} 
                  className={cn(
                    "h-5 w-5",
                    task.completed ? "text-success" : "text-gray-400"
                  )}
                />
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{task.description}</p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <ApperIcon name="Clock" className="h-3 w-3 mr-1" />
                    {task.estimatedTime}
                  </span>
                  <span className="flex items-center">
                    <ApperIcon name="Calendar" className="h-3 w-3 mr-1" />
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant={task.completed ? "outline" : "default"}
                  onClick={() => handleToggleTask(task.Id)}
                  className="text-xs"
                >
                  {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <ApperIcon name="CheckCircle2" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No tasks found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};

export default Onboarding;