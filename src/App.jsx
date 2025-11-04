import { useState, useEffect } from 'react'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const handleAddTask = () => {setTodoList([...todoList, {id: Date.now(),
    text: input,
    completed: false
    }]); setInput('')}
  const toggleCompleted = (id) => {
    const updatedList = todoList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
  });
    setTodoList(updatedList);
  }
  const deleteTask = (id) => {
    const newList = todoList.filter((task) => task.id !== id);
    setTodoList(newList);
  }

  useEffect(() => {
  const savedTasks = localStorage.getItem('allofthem');
  if (savedTasks) {setTodoList(JSON.parse(savedTasks));
    }
    setIsLoaded(true)
}, []); 

useEffect(() => {
  if (isLoaded) { 
    localStorage.setItem('allofthem', JSON.stringify(todoList));
    console.log('💾 saving:', todoList);
  }
}, [todoList, isLoaded]);

  return (
    <div>
      <input
      value={input}
      onChange= {e => setInput(e.target.value)}
      placeholder= 'ex: do the shopping'/>
      <button
      onClick={handleAddTask}>Add Task</button>
      <ul>{todoList.map((task) => (<li key={task.id}>
        <input type='checkbox' checked={task.completed} onChange={()=> toggleCompleted(task.id)}/>
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
        </span>
        <button onClick={()=>deleteTask(task.id)}>Delete</button></li>))}
      </ul>
    </div>
  )
}

export default App