import React from 'react';
import '../todo-item/TodoItem.css'
function TodoItem({ todo, toggleComplete, deleteTodo }) {
  if (!todo) return null; // Kiểm tra nếu 'todo' không tồn tại
  
  return (
    <li className={todo.completed ? 'completed' : ''}>
      <span onClick={toggleComplete}>{todo.text}</span>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
}

export default TodoItem;