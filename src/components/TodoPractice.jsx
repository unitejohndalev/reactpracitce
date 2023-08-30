import React, { useEffect, useState } from "react";

const TodoPractice = () => {
  const [todos, setTodos] = useState(() => {
    const getTodo = localStorage.getItem("todos");
    if (getTodo) {
      return JSON.parse(getTodo);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
  };

  const handleDelete = (id) => {
    const removeTodo = todos.filter((todo) => todo.id !== id);
    setTodos(removeTodo);
  };

  const handleEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdate(currentTodo.id, currentTodo);
  };

  const handleUpdate = (id, updatedTodo) => {
    const updateItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });

    setIsEditing(false);
    setTodos(updateItem);
  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
  };

  return (
    <div>
      {isEditing ? (
        <form onSubmit={handleEditFormSubmit}>
          <input
            type="text"
            value={currentTodo.text}
            onChange={handleEditInputChange}
          />
          <button type="submit">Update</button>
        </form>
      ) : (
        <form onSubmit={handleAddFormSubmit}>
          <input type="text" value={todo} onChange={handleInputChange} />
          <button type="submit">Add todo</button>
        </form>
      )}

      <>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              {todo.text}
              <button onClick={() => handleDelete(todo.id)}>Remove</button>
              <button onClick={() => handleEdit(todo)}>Edit</button>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default TodoPractice;
