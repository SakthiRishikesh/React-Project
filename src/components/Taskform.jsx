import React, { useState } from "react";

export default function Taskform({ addTask }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Task cannot be empty");
      return;
    }

    setError("");
    addTask({
      text: text.trim(),
      priority,
      status: "todo",
      ...(dueDate && { dueDate }),
    });

    setText("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <div className="input-group">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="task-input"
          />
          {error && <span className="error-message">{error}</span>}
        </div>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="priority-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="date-input"
        />

        <button type="submit" className="add-btn">
          Add Task
        </button>
      </div>
    </form>
  );
}