import TodoItem from "./TodoItem";
import List from "@mui/material/List";

export default function TodoList ({todos, onToggle, onEdit, onDelete}) {
  
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {todos
        .slice() // 复制一份，避免直接修改原数组
        .sort((a, b) => {
           // 未完成的排前面，已完成的排后面
          if (a.completed === b.completed) return 0;
          return a.completed ? 1 : -1;
        })
        .map(todo => (
          <TodoItem 
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
      ))}
    </List>
  )
}