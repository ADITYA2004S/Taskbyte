// Local Storage utility functions for task management

export const getTasks = () => {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

export const getUsername = () => {
  try {
    return localStorage.getItem("username") || "";
  } catch (error) {
    console.error("Error loading username:", error);
    return "";
  }
};

export const saveUsername = (username) => {
  try {
    localStorage.setItem("username", username);
  } catch (error) {
    console.error("Error saving username:", error);
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("username");
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

// Sample data for testing
export const sampleTasks = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application with modern UI",
    completed: false,
    priority: "high",
    dueDate: "2024-12-25",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features and modern JavaScript",
    completed: true,
    priority: "medium",
    dueDate: null,
    createdAt: "2024-01-14T15:30:00Z",
  },
  {
    id: 3,
    title: "Setup project deployment",
    description: "Deploy the application to production",
    completed: false,
    priority: "low",
    dueDate: "2024-12-30",
    createdAt: "2024-01-13T09:15:00Z",
  },
];

// Function to load sample data (useful for testing)
export const loadSampleData = () => {
  saveTasks(sampleTasks);
};
