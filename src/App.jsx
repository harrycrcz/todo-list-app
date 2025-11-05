import { useState, useEffect } from 'react'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleAddTask = () => {
    if (input.trim() === '') return; // No agregar tareas vacías
    setTodoList([...todoList, {
      id: Date.now(),
      text: input,
      completed: false
    }]); 
    setInput('');
  }
  
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

  const getFilteredTasks = ()=> {
    if (filter === 'all') {return todoList };
    if (filter === 'active') {return todoList.filter((task) => task.completed===false)};
    if (filter === 'completed') {return todoList.filter((task) => task.completed==!false)};  
  }

  useEffect(() => {
    const savedTasks = localStorage.getItem('allofthem');
    if (savedTasks) {
      setTodoList(JSON.parse(savedTasks));
    }
    setIsLoaded(true);
  }, []); 

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('allofthem', JSON.stringify(todoList));
    }
  }, [todoList, isLoaded]);

  const activeTasks = todoList.filter(task => !task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Task Manager
          </h1>
          <p className="text-slate-400">
            {activeTasks} {activeTasks === 1 ? 'task' : 'tasks'} pending
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-2xl border border-slate-700/50">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleAddTask()}
              placeholder="What needs to be done?"
              className="flex-1 bg-slate-900/80 text-white placeholder-slate-500 border border-slate-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              onClick={handleAddTask}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95"
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 bg-slate-800/30 backdrop-blur-sm rounded-lg p-2 border border-slate-700/30">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              filter === 'active'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Completed
          </button>
        </div>
        {/* Tasks List */}
        <div className="space-y-3">
          {todoList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">No tasks yet. Add one to get started! 🚀</p>
            </div>
          ) : (
            getFilteredTasks().map((task) => (
              <div
                key={task.id}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border transition-all duration-200 hover:shadow-lg group ${
                  task.completed 
                    ? 'border-slate-700/30 hover:border-slate-600/50' 
                    : 'border-slate-700/50 hover:border-blue-500/50 hover:shadow-blue-500/10'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task.id)}
                    className="w-5 h-5 rounded border-2 border-slate-600 bg-slate-900 checked:bg-gradient-to-r checked:from-red-900 checked:to-red-800 checked:border-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-0 cursor-pointer transition-all"
                  />
                  
                  {/* Task Text */}
                  <span
                    className={`flex-1 text-lg transition-all duration-200 ${
                      task.completed
                        ? 'text-slate-500 line-through'
                        : 'text-white'
                    }`}
                  >
                    {task.text}
                  </span>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="opacity-0 group-hover:opacity-100 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-red-900/50 active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Stats */}
        {todoList.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              {todoList.filter(t => t.completed).length} of {todoList.length} completed
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App