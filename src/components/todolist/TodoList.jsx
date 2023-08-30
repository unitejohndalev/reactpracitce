import { useState, useEffect } from "react";

import EditForm from "./EditForm";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "./todoItem";

const TodoList = () => {
  //get list in local storage store in in todos state
  const [todos, setTodos] = useState(() => {
    const saveTodos = localStorage.getItem("todos");
    if (saveTodos) {
      return JSON.parse(saveTodos);
    }
    return [];
  });
  // input state
  const [todo, setTodo] = useState("");

  //edit state
  const [isEditing, setIsEditing] = useState(false);

  // current state
  const [currentTodo, setCurrentTodo] = useState({});


  //put todos in localstorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },[todos]); //set todos as depencies since it changes data

  //input onChange function
  const handleAddInputChange = (e) => {
    setTodo(e.target.value);
  };

  // add submit function
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

  //edit input function
  const handleEditInputChange = (e) => {
    setCurrentTodo({ ...currentTodo, text: e.target.value });
    console.log(currentTodo);
  };

  //edit submit function 
  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    handleUpdateTodo(currentTodo.id, currentTodo);
  };

  // update function
  const handleUpdateTodo = (id, updatedTodo) => {
    const updatedItem = todos.map((todo) => {
      return todo.id === id ? updatedTodo : todo;
    });
    setIsEditing(false);
    setTodos(updatedItem);
  };

  //set isEdit function
  const handleEditClick = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  //delete function
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
        isEditing={isEditing}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default TodoList;
