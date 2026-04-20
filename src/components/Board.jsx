import React, { useEffect, useState } from "react";
import Column from "./Column";
import Taskform from "./Taskform";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DragDropContext } from "@hello-pangea/dnd";
import { useAuth } from "../context/AuthContext";

const API_URL = "http://localhost:5000/api/tasks";

export default function Board() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data || []);
    } catch (err) {
      console.error("Fetch error:", err.message);
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await axios.post(API_URL, taskData);
      setTasks((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Add task error:", err.message);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updates);
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error("Update error:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find((t) => t._id === draggableId);
    if (task && task.status !== destination.droppableId) {
      updateTask(draggableId, { status: destination.droppableId });
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  if (loading) {
    return (
      <div className="board-wrapper">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="board-wrapper">
      <header className="board-header">
        <div className="header-left">
          <h1 className="app-title">
            <span className="title-icon">✦</span> TaskFlow
          </h1>
          <span className="task-count">{tasks.length} tasks</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </header>

      <Taskform addTask={addTask} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-columns">
          <Column
            id="todo"
            title="To Do"
            icon="📋"
            tasks={tasks.filter((t) => t.status === "todo")}
            updateTask={updateTask}
            deleteTask={deleteTask}
            accentClass="accent-blue"
          />
          <Column
            id="done"
            title="Done"
            icon="✅"
            tasks={tasks.filter((t) => t.status === "done")}
            updateTask={updateTask}
            deleteTask={deleteTask}
            accentClass="accent-green"
          />
        </div>
      </DragDropContext>
    </div>
  );
}