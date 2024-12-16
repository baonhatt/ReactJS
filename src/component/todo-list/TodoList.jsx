import React from 'react';
import TodoItem from '../todo-item/TodoItem';
import '../todo-list/TodoList.css'
 function TodoList  ({ todos, toggleComplete, deleteTodo }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          toggleComplete={() => toggleComplete(index)}
          deleteTodo={() => deleteTodo(index)}
        />
      ))}
    </ul>
  );
}
export default TodoList;
