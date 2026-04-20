import React from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function Taskcard({ task, index, updateTask, deleteTask }) {
  const toggleStatus = () => {
    const newStatus = task.status === "todo" ? "done" : "todo";
    updateTask(task._id, { status: newStatus });
  };

  const togglePin = () => {
    updateTask(task._id, { pinned: !task.pinned });
  };

  const priorityClass = task.priority ? task.priority.toLowerCase() : "low";

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card priority-border-${priorityClass} ${
            snapshot.isDragging ? "dragging" : ""
          } ${task.pinned ? "pinned" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="task-header">
            <span className="task-text">{task.text}</span>
            <div className="actions">
              <button
                className="action-btn pin-btn"
                onClick={togglePin}
                title={task.pinned ? "Unpin task" : "Pin task"}
              >
                {task.pinned ? "📌" : "📍"}
              </button>
              <button
                className="action-btn toggle-btn"
                onClick={toggleStatus}
                title={task.status === "todo" ? "Mark done" : "Undo"}
              >
                {task.status === "todo" ? "✓" : "↩"}
              </button>
              <button
                className="action-btn delete-btn"
                onClick={() => deleteTask(task._id)}
                title="Delete task"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="task-footer">
            <span className={`priority-badge ${priorityClass}`}>
              {task.priority || "Low"}
            </span>
            {task.dueDate && (
              <span className="due-date">
                📅 {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}