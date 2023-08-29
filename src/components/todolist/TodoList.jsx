import { useState, useEffect } from "react";

import EditForm from "./EditForm";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./todoItem";

const TodoList = () => {
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      return JSON.parse(saveTodos);
    }
    return [];
  });

  const [todo, setTodo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]);

  const handleAddInputChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: new Date(),
          text: todo.trim(),
        },
      ]);
    }
    setTodo("");
 

  };

  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  };

  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => todo.id !== id);
    setTodos(removeItem);

  };

  return (
    <div>
      {isEditing ? (
        <EditForm
          currentTodo={currentTodo.text}
          setIsEditing={setIsEditing}
          onEditInputChange={handleEditInputChange}
          onEditFormSubmit={handleEditFormSubmit}
        />
      ) : (
        <AddTodoForm
          todo={todo}
          onAddInputChange={handleAddInputChange}
          onAddFormSubmit={handleAddFormSubmit}
        />
      )}

      <TodoItem
        todos={todos}
        todo={todo}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default TodoList;
