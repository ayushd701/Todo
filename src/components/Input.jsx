import React, { useState } from "react";
import { Pencil, Check, Trash2 } from "lucide-react"; // Importing icons

export default function Input() {
    const [input, setInput] = useState("");
    const [todos, setTodos] = useState([]);

    const addTodo = () => {
        if (input.trim()) {
            const newTodo = {
                name: input,
                id: Date.now(),
                completed: false,
                edit: false
            };
            setTodos([...todos, newTodo]);
            setInput("");
        }
    };

    const toggleEdit = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, edit: !todo.edit } : todo
        ));
    };

    const updateTodoName = (id, newName) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, name: newName } : todo
        ));
    };

    const onCheck = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
            {/* Input Section */}
            <div className="flex gap-2 bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-md">
                <input
                    className="border border-gray-600 bg-gray-700 text-white rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a todo..."
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Add
                </button>
            </div>

            {/* Todo List Section */}
            <div className="mt-6 w-full max-w-md bg-gray-800 p-4 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-2 text-center">Todo List</h2>
                {todos.length === 0 ? (
                    <p className="text-gray-400 text-center">No todos yet!</p>
                ) : (
                    <ul className="space-y-2">
                        {todos.map((todo) => (
                            <li
                                key={todo.id}
                                className="bg-gray-700 px-4 py-2 rounded-md shadow-sm flex justify-between items-center"
                            >
                                <div className="flex items-center gap-4 flex-grow">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => onCheck(todo.id)}
                                        disabled={todo.edit}
                                        className="w-5 h-5 accent-blue-500 cursor-pointer"
                                    />

                                    {todo.edit ? (
                                        <input
                                            type="text"
                                            value={todo.name}
                                            onChange={(e) => updateTodoName(todo.id, e.target.value)}
                                            className="bg-gray-600 mr-2 text-white rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 w-full"
                                        />
                                    ) : (
                                        <span className={`${todo.completed ? "line-through text-gray-400" : ""}`}>
                                            {todo.name}
                                        </span>
                                    )}
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => toggleEdit(todo.id)}
                                        className="text-yellow-400 hover:text-yellow-600 transition"
                                    >
                                        {todo.edit ? <Check size={20} /> : <Pencil size={20} />}
                                    </button>

                                    <button
                                        onClick={() => handleDelete(todo.id)}
                                        className="text-red-400 hover:text-red-600 transition"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
