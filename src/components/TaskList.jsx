import React from "react";
import TaskItem from "./TaskItem";
import { CheckCircle } from "lucide-react";

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleComplete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <CheckCircle size={64} />
        </div>
        <h3 className="empty-state-title">No tasks found</h3>
        <p className="empty-state-description">
          Create your first task to get started with managing your productivity
        </p>
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    // Sort by completion status first (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then by priority (high, medium, low)
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    // Finally by creation date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2 className="task-list-title">Your Tasks ({tasks.length})</h2>
      </div>

      <div className="task-items">
        {sortedTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
