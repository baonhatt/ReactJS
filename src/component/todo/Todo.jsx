import TodoList from '../todo-list/TodoList';
import './Todo.css'
import {React, useState} from "react";
import Modal from '../modal/Modal'
const names = ['John', 'Linda', 'Tuan']
export const Todo = () => {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState("")
    const [selectedTask, setSelectedTask] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const chosenName = Math.random() > 0.5 ? names[1]: names[0]

    const addTodo = () => {
        if (input.trim()) {
            setTodos([...todos, { text: input, completed: false }]);
            setInput('');

            console.log(todos)
        }
      };

      const toggleComplete = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
      };
    
      const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
      };

      const openModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="wrapper">
        <div className="todo-wrap">
                <h2>{chosenName}</h2>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder='What is your next task?'/>
                <button onClick={addTodo}>Add</button>

        </div>
        <div className="todo-content">
            <TodoList toggleComplete={toggleComplete} deleteTodo={deleteTodo} todos={todos} openModal={openModal}/>
        </div>

        <div className="user">
          <UserList></UserList>
        </div>

        {isModalOpen && <Modal task={selectedTask} onClose={closeModal} />}
        </div>
    )
}

const UserList = (props) => {
  
  return (
    <ul>
      {names.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}