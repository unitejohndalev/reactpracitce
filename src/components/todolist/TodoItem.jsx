/* eslint-disable react/prop-types */
import React from 'react'

const TodoItem = ({todo, onEditClick, onDeleteClick, todos}) => {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.text}
            <button
            onClick={() => onEditClick(todo)}
            >Edit</button>
            <button onClick={() => onDeleteClick(todo.id)}>Delete</button>
          </li>
        )
      })}
    </div>
  )
}

export default TodoItem