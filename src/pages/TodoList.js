import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../api/api';
import TodoItem from './TodoItem';

const TodoList = ({ token }) => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const getTodos = async () => {
            const data = await fetchTodos(token);
            setTodos(data.todos);
        };

        getTodos();
    }, [token]);

    const handleAddTodo = async () => {
        const todo = await createTodo(token, newTodo);
        setTodos([...todos, todo]);
        setNewTodo('');
    };

    return (
        <div>
            <h2>Your Todo List</h2>
            <input 
                type="text" 
                placeholder="New Todo" 
                value={newTodo} 
                onChange={(e) => setNewTodo(e.target.value)} 
            />
            <button onClick={handleAddTodo}>Add Todo</button>
            <ul>
                {todos.map((todo) => (
                    <TodoItem key={todo._id} todo={todo} token={token} setTodos={setTodos} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
