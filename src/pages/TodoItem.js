import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../api/api';

const TodoItem = ({ todo, token, setTodos }) => {
    const [newTitle, setNewTitle] = useState(todo.title);

    const handleUpdate = async () => {
        const updatedTodo = await updateTodo(token, todo._id, newTitle);
        setTodos((prevTodos) =>
            prevTodos.map((item) => (item._id === todo._id ? updatedTodo : item))
        );
    };

    const handleDelete = async () => {
        await deleteTodo(token, todo._id);
        setTodos((prevTodos) => prevTodos.filter((item) => item._id !== todo._id));
    };

    return (
        <li>
            <input 
                type="text" 
                value={newTitle} 
                onChange={(e) => setNewTitle(e.target.value)} 
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default TodoItem;
