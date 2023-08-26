// 1. create a user input state
// 2. create a container state for user input
// 3. create a add function
// 4. create a remove function

import { useState } from "react";

const TodoListPractice = () => {
  // user input state
  const [userInput, setUserInput] = useState("");

  //container state
  const [userList, setUserList] = useState([]);

  //add function
  const addUserInput = () => {
    if (!userInput) {
      alert("Please write a todo list");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 100),
      value: userInput,
    };

    setUserList((list) => [...list, item]);
    setUserInput("");
  };

  //remove function
  const removeUserList = (id) => {
    const newArray = userList.filter((user) => user.id !== id);
    setUserList(newArray);
  };

  // OPTIONAL EDIT FUNCTION
  // const [userUpdateInput, setUserUpdateInput] = useState("");
  // const [showEdit, setShowEdit] = useState(-1);

  //edit function
  // const userEditList = (id) => {
  //   if (!userUpdateInput) {
  //     alert("Please write a todo list");
  //     return;
  //   }

  //   const userId = userList.filter((list) => list.id !== id);
  //   const item = {
  //     id: userId.id,
  //     value: userUpdateInput,
  //   };

  //   removeUserList(id);

  //   setUserList((list) => [...list, item]);
  //   setShowEdit(-1);
  //   setUserUpdateInput("");
  // };

  // console.log(userList);

  return (
    <div className="h-full w-full">
      <div className="mt-10 flex flex-col max-w-[300px] mx-auto justify-center items-center">
        <h1 className="text-[2rem] font-bold">TODO LIST</h1>
        <div className="w-full flex justify-between mt-5">
          <input
            type="text"
            className="border border-black"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
          />
          <button
            className="border border-black"
            onClick={() => addUserInput()}>
            Add
          </button>
        </div>
        <div className="w-full mt-5">
          {userList.map((list, id) => {
            return (
              <div key={id}>
                <li className="flex justify-between mb-2">
                  {list.value}
                  <div className="flex gap-x-2">
                    <button
                      className="border border-black"
                      onClick={() => removeUserList(list.id)}>
                      Remove
                    </button>
                    {/* <button
                      className="border border-black"
                      onClick={() => setShowEdit(list.id)}>
                      Edit
                    </button> */}
                  </div>
                </li>
                {/* {showEdit == list.id ? (
                  <div>
                    <input
                      type="text"
                      className="border border-black"
                      onChange={(e) => setUserUpdateInput(e.target.value)}
                      value={userUpdateInput}
                    />
                    <button
                      className="border border-black"
                      onClick={() => userEditList(list.id, userUpdateInput)}>
                      Update
                    </button>
                  </div>
                ) : null} */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodoListPractice;
