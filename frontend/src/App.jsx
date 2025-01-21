import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskBody, setTaskBody] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8000/api/');
    setTasks(response.data);
  };

  const openModal = (task = null) => {
    setTaskTitle(task ? task.title : '');
    setTaskBody(task ? task.body : '');
    setEditTaskId(task ? task.id : null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTaskTitle('');
    setTaskBody('');
    setEditTaskId(null);
  };

  const saveTask = async () => {
    if (taskTitle.trim() === '') return;

    if (editTaskId) {
      await axios.patch(`http://localhost:8000/api/${editTaskId}/`, {
        title: taskTitle,
        body: taskBody,
      });
    } else {
      await axios.post('http://localhost:8000/api/', {
        title: taskTitle,
        body: taskBody,
        done: false,
      });
    }

    closeModal();
    fetchTasks();
  };

  const toggleTask = async (id, done) => {
    await axios.patch(`http://localhost:8000/api/${id}/`, { done: !done });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/api/${id}/`);
    fetchTasks();
  };

  return (
    <div className="app">
      <h1>Todo List</h1>
      <button className="add-task-button" onClick={() => openModal()}>Add Task</button>

      <ul className="task-list">
        {tasks
          .sort((a, b) => a.done - b.done)
          .map((task) => (
            <li key={task.id} className={`task-item ${task.done ? 'completed' : ''}`}>
              <div className="task-header">
                <div className="task-info">
                  <strong className="task-title">
                    {task.title}
                  </strong>
                  {task.body && <div className="task-body">{task.body}</div>}
                </div>
                <div className="task-actions">
                  <button className="task-edit" onClick={() => openModal(task)}>Edit</button><br/>
                  <button className="task-delete" onClick={() => deleteTask(task.id)}>Delete</button><br/>
                  <button className="task-complete" onClick={() => toggleTask(task.id, task.done)}>
                    {task.done ? 'Undo' : 'Complete'}
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editTaskId ? 'Edit Task' : 'Add Task'}</h2>
            <label>Task Title</label>
            <input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task Title"
            />
            <label>Task Body</label>
            <textarea
              value={taskBody}
              onChange={(e) => setTaskBody(e.target.value)}
              placeholder="Task Description (optional)"
            />
            <div className="modal-actions">
              <button onClick={saveTask}>{editTaskId ? 'Save Changes' : 'Add Task'}</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;