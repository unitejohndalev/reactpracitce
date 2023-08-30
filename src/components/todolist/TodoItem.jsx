/* eslint-disable react/prop-types */
import React from 'react'

const TodoItem = ({ onEditClick, onDeleteClick, todos, isEditing }) => {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <ul key={todo.id}>
            {todo.text}
            { !isEditing &&
              <>
                <button onClick={() => onEditClick(todo)}>Edit</button>
                <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
              </>
            }
          </ul>
        );
      })}
    </div>
  );
};

export default TodoItem