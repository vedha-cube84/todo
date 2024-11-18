import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/api';
import './style/style.css';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editTodoId, setEditTodoId] = useState(null);
  const navigate = useHistory();
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  useEffect(() => {
    if (!token) return navigate.push('/login');
    fetchTodos();
  }, [token, navigate]);

  const fetchTodos = async () => {
    try {
      const response = await getTodos(token);
      setTodos(response.data);
    //   console.log('gtodooo', token);
    } catch (err) {
        navigate.push('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      console.error('Failed to fetch todos', err);
    }
  };

  const handleCreate = async () => {
    try {
      await createTodo(token, { title, description });
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (err) {
      console.error('Failed to create todo', err);
    }
  };

  const handleUpdate = async (id, completed) => {
    if (!editTitle.trim()) return;
    try {
      await updateTodo(token, id, { completed: !completed, title: editTitle, description: editDescription });
      setEditTodoId(null);
      setEditTitle('');
      setEditDescription('');
      fetchTodos();
    } catch (err) {
      console.error('Failed to update todo', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(token, id);
      fetchTodos();
    } catch (err) {
      console.error('Failed to delete todo', err);
    }
  };

  const toggleStatus = async (id, completed) => {
    try {
      await updateTodo(token, id, { completed: !completed });
      fetchTodos();
    } catch (err) {
      console.error('Failed to update todo status', err);
    }
  };

  const handleEditClick = (id, currentTitle, currentDescription) => {
    setEditTodoId(id);
    setEditTitle(currentTitle);
    setEditDescription(currentDescription);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate.push('/login');
  };

  return (
    <div>
        <div className='dashboard'>
        <div className='nav'>
            <p>Hello {user},</p>
            <p onClick={handleLogout} className='logout'>Logout</p>
        </div>
        <div className='todo-input'>
        <h2>Todo List</h2>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description'/>
        <button onClick={handleCreate}>Add Todo</button>
        </div>
        <div className='todo-list'>
        <ul>
            {todos.map((todo) => (
            <li key={todo._id}>
                {editTodoId === todo._id ? (
                <>
                    <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder='Title'
                    />
                    <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder='Description'
                    />
                    <button onClick={() => handleUpdate(todo._id)}>Save</button>
                    <button onClick={() => setEditTodoId(null)}>Cancel</button>
                </>
                ) : (
                <>
                    <div className='box'><h6>Title</h6><p> - {todo.title}</p></div>
                    <div className='box'><h6>Description</h6><p> - {todo.description === ""?"-":todo.description}</p></div>
                    <div className='box'><h6>Status</h6><p style={{color:todo.completed ? 'green':'orange'}}> - {todo.completed ? 'Completed' : 'Pending'}</p></div>
                    <div className='buttons'>
                    <button onClick={() => toggleStatus(todo._id, todo.completed)}>
                    Toggle Status
                    </button>
                    <button onClick={() => handleEditClick(todo._id, todo.title, todo.description)}>
                    Edit
                    </button>
                    <button onClick={() => handleDelete(todo._id)}>Delete</button>
                    </div>
                </>
                )}
            </li>
            ))}
        </ul>
        </div>
        </div>
    </div>
  );
};

export default Home;
