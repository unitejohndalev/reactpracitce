import { useState } from "react";

function App() {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTodoItem = () => {
    if (!todoItem) {
      alert("Press enter an item");
      return;
    }
    const item = {
      id: Math.floor(Math.random() * 100),
      value: todoItem,
    };

    setTodoList((oldTodoItem) => [...oldTodoItem, item]);
    setTodoItem("");
  };

  const deleteTodoItem = (id) => {
    const newArray = todoList.filter((list) => list.id !== id);
    setTodoList(newArray);
  };

  console.log(todoList);

  return (
    <>
      <h1>TODO LIST</h1>
      <input
        type="text"
        onChange={(e) => setTodoItem(e.target.value)}
        value={todoItem}
      />
      <button onClick={() => addTodoItem()}>Add</button>

      <div>
        {todoList.map((newTodo, id) => {
          return (
            <div key={id}>
              <li>{newTodo.value}</li>
              <button onClick={() => deleteTodoItem(newTodo.id)}>delete</button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
