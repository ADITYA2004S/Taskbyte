import React, { useState } from "react";
import { Edit3, Trash2, Check, X, Calendar, Flag, Clock } from "lucide-react";

const TaskItem = ({ task, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
    >
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <h3>Delete Task</h3>
            <p>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div className="delete-confirm-actions">
              <button onClick={cancelDelete} className="cancel-button">
                Cancel
              </button>
              <button onClick={confirmDelete} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="task-content">
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="checkbox"
          />
        </div>

        <div className="task-details">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-title-input"
                placeholder="Task title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="edit-description-input"
                placeholder="Task description"
                rows="2"
              />
              <div className="edit-actions">
                <button onClick={handleSaveEdit} className="save-edit-button">
                  <Check size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="cancel-edit-button"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="task-info">
              <h3 className="task-title">{task.title}</h3>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}

              <div className="task-meta">
                <div className="meta-item">
                  <Clock size={14} />
                  <span>
                    Created {formatDate(task.createdAt)} at{" "}
                    {formatTime(task.createdAt)}
                  </span>
                </div>

                {task.dueDate && (
                  <div className={`meta-item ${isOverdue ? "overdue" : ""}`}>
                    <Calendar size={14} />
                    <span>Due {formatDate(task.dueDate)}</span>
                  </div>
                )}

                <div
                  className={`meta-item priority-badge ${getPriorityClass(
                    task.priority
                  )}`}
                >
                  <Flag size={14} />
                  <span>{task.priority} priority</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isEditing && (
          <div className="task-actions">
            <button onClick={handleEdit} className="action-button edit-button">
              <Edit3 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="action-button delete-button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
