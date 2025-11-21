import axios from 'axios';

const TODOS_URL = 'http://localhost:8000/api/todos/';
const TODO_URL = 'http://localhost:8000/api/todo';

export const fetchTodos = () => axios.get(TODOS_URL + '?_limit=10');

export const createTodo = (title) => 
  axios.post(TODOS_URL, {
    title,
    completed: false,
  });

export const updateTodo = (id, data) => 
  axios.put(`${TODO_URL}/${id}/`, data);

export const deleteTodo = (id) => 
  axios.delete(`${TODO_URL}/${id}/`);