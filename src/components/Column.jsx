import React from "react";
import Taskcard from "./Taskcard";
import { Droppable } from "@hello-pangea/dnd";

export default function Column({ id, title, icon, tasks, updateTask, deleteTask, accentClass }) {
  return (
    <div className={`column ${accentClass}`}>
      <div className="column-header">
        <span className="column-icon">{icon}</span>
        <h2>{title}</h2>
        <span className="column-count">{tasks.length}</span>
      </div>

      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className={`task-list ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks here yet</p>
              </div>
            ) : (
              tasks
                .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
                .map((task, index) => (
                  <Taskcard
                    key={task._id}
                    task={task}
                    index={index}
                    updateTask={updateTask}
                    deleteTask={deleteTask}
                  />
                ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

    </div>
  );
}