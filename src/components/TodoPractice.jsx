import React, { useEffect, useState } from "react";

const TodoPractice = () => {
  const [todos, setTodos] = useState(() => {
    const getTodos = localStorage.getItem("todos")
    if(getTodos) {
      return JSON.parse(getTodos)
    }
    return []
  });
  const [todo, setTodo] = useState("");

  const [currentTodo, setCurrentTodo] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const addSubmitForm = (e) => {
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

  const deleteTodo = (id) => {
    const removeTodo = todos.filter((todo) => todo.id !== id);
    setTodos(removeTodo);
  };

  const editTodo = (todo) => {
    setIsEditing(true)
    setCurrentTodo({...todo})
  }

  const updateOnChange = (e) => {
    setCurrentTodo({...currentTodo, text:e.target.value})
  }

  const handleUpdate = (id, updatedTodo) => {
    const updateTodo = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo
    })
    setTodos(updateTodo)
    setIsEditing(false)
  }

  const updateSubmitForm = (e) => {
    e.preventDefault()
    handleUpdate(currentTodo.id, currentTodo)
  }
  console.log(todos);
  return (
    <div>
      {isEditing ? (
        <form onSubmit={updateSubmitForm}>
          <input
            type="text"
            value={currentTodo.text}
            onChange={updateOnChange}
          />
          <button type="submit">Update</button>
          <button onClick={() => setIsEditing(prev => !prev)}>Cancel</button>
        </form>
      ) : (
        <form onSubmit={addSubmitForm}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      )}

      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              {todo.text}
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button onClick={() => editTodo(todo)}>Edit</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoPractice;
