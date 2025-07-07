import React from "react";
import { List, CheckCircle, Clock } from "lucide-react";

const TaskFilter = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    {
      id: "all",
      label: "All Tasks",
      icon: List,
      count: taskCounts.all,
      color: "filter-all",
    },
    {
      id: "pending",
      label: "Pending",
      icon: Clock,
      count: taskCounts.pending,
      color: "filter-pending",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: taskCounts.completed,
      color: "filter-completed",
    },
  ];

  return (
    <div className="task-filter">
      <div className="filter-buttons">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id)}
              className={`filter-button ${filter.color} ${
                activeFilter === filter.id ? "active" : ""
              }`}
            >
              <Icon size={20} />
              <span className="filter-label">{filter.label}</span>
              <span className="filter-count">{filter.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskFilter;
