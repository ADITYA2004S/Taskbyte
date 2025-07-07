import React, { useState } from "react";
import { X, Plus, Calendar, Flag } from "lucide-react";

const TaskForm = ({ onAddTask, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || null,
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
    }
  };

  const priorityColors = {
    low: "priority-low",
    medium: "priority-medium",
    high: "priority-high",
  };

  return (
    <div className="task-form-container">
      <div className="task-form-header">
        <h2 className="task-form-title">
          <Plus size={24} />
          Create New Task
        </h2>
        <button onClick={onCancel} className="close-button">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label className="form-label">Task Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-textarea"
            placeholder="Enter task description (optional)"
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">
              <Flag size={16} />
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={`form-select ${priorityColors[priority]}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Calendar size={16} />
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="form-input"
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
