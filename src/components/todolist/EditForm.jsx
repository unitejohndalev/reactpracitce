/* eslint-disable react/prop-types */
import React from "react";

const EditForm = ({
  currentTodo,
  setIsEditing,
  onEditInputChange,
  onEditFormSubmit,
}) => {
  return <form onSubmit={onEditFormSubmit}>
    <h2>Edit Todo</h2>
    <label htmlFor="updateTodo">Update todo:</label>
    <input type="text"
    name="updateTodo"
    placeholder="Update todo"
    value={currentTodo}
    onChange={onEditInputChange}
     />
     <button type="submit">Update</button>
     <button onClick={() => setIsEditing(prev => !prev)}>Cancel</button>
  </form>;
};

export default EditForm;
