import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import TodoList from './components/TodoList';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todo';
import Box from '@mui/material/Box';
import ErrorAlert from './components/ErrorAlert'
import Loading from './components/Loading'
import Progress from './components/Progress';
import Typography from '@mui/material/Typography';

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos()
      .then(res => setTodos(res.data))
      .catch(() => setError('Fail to load data, please refresh'))
      .finally(() => setLoading(false));
  }, []);

  const addTask = async (title) => {
    try {
      const res = await createTodo(title);
      setTodos(prev => [res.data, ...prev]);
    } catch {
      setError('Fail to add new task');
    }
  };

  const toggleTask = async (id) => {
    try {
      const current = todos.find(todo => todo.id === id);
      if (!current) {
        setError('Todo not found');
        return;
      }
      const res = await updateTodo(id, {completed: !current.completed})
      setTodos(prev => prev.map(todo => todo.id === id ? res.data : todo))
    } catch {
      setError('Fail to toggle the task');
    }

  }

  const editTask = async (id, data) => {
    try {
      const res = await updateTodo(id, data);
      setTodos(prev => prev.map(todo => todo.id === id ? res.data : todo));
    } catch {
      setError('Fail to edit the task');
    }
  }

  const deleteTask = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id != id ))
    } catch {
      setError('Fail to delete the task');
    }
  }

  return (
    <>
      <Box 
        component={"section"} 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          padding: '30px', 
          margin: '30px auto', 
          border: '2px solid grey', 
          borderRadius: "5%",
          textAlign: 'center', 
          position: 'absolute', 
          top: '0', 
          left: '50%', 
          transform: 'translate(-50%, 0)',
        }}>
        <Typography 
          variant="h3" 
          gutterBottom
          sx={{ 
            m: '20px 0px',
            fontWeight: 700,
          }}
        >
          My To-Do List
        </Typography>
        <Progress todos={todos} />
        <ErrorAlert message={error} />
        <AddTask onSubmit={addTask}/>
        
        {loading ? <Loading /> : <TodoList 
          todos={todos} 
          onToggle={toggleTask} 
          onEdit={editTask} 
          onDelete={deleteTask}
        />}

      </Box>
    </>
  )
}

export default App
