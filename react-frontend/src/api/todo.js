import axios from 'axios';

// development urls
// const TODOS_URL = 'http://localhost:8000/api/todos/';
// const TODO_URL = 'http://localhost:8000/api/todo';

// production urls
const TODOS_URL = 'api/todos/';
const TODO_URL = 'api/todo';

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