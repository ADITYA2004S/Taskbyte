import React, { useState, useEffect } from "react";
import { Plus, Search, LogOut, User, Moon, Sun } from "lucide-react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";
import { getTasks, saveTasks, logout } from "../utils/localStorage";

const TaskDashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTasks = getTasks();
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  const updateTask = (id, updates) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "completed" && task.completed) ||
      (activeFilter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  return (
    <div className={`dashboard ${isDarkMode ? "dark" : "light"}`}>
      <div className="dashboard-background"></div>

      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="user-info">
              <div className="user-avatar">
                <User size={20} />
              </div>
              <div>
                <h1 className="welcome-text">Welcome back, {username}</h1>
                <p className="dashboard-subtitle">
                  Manage your tasks efficiently
                </p>
              </div>
            </div>
          </div>

          <div className="header-right">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="theme-toggle"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Search and Add Section */}
          <div className="dashboard-controls">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            <button
              onClick={() => setShowTaskForm(true)}
              className="add-task-button"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>

          {/* Task Filter */}
          <TaskFilter
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            taskCounts={taskCounts}
          />

          {/* Task Form Modal */}
          {showTaskForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <TaskForm
                  onAddTask={addTask}
                  onCancel={() => setShowTaskForm(false)}
                />
              </div>
            </div>
          )}

          {/* Task List */}
          <TaskList
            tasks={filteredTasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
            onToggleComplete={toggleComplete}
          />
        </div>
      </main>
    </div>
  );
};

export default TaskDashboard;
