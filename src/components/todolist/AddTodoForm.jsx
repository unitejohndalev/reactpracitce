import React from 'react'

const AddTodoForm = ({todo, onAddInputChange, onAddFormSubmit}) => {
  return (
    <form onSubmit={onAddFormSubmit}>
    <h1>Add Todo</h1>
      <label htmlFor="todo">Create todo:</label>
      <input type="text" name='todo' placeholder='Create new todo'
        value={todo}
        onChange={onAddInputChange}
      />
      <button type='sumbit'>Add</button>
    </form>
  )
}

export default AddTodoForm