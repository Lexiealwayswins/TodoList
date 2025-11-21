import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";

export default function TodoItem ({todo, onToggle, onEdit, onDelete}) {
  const [editingTodo, setEditingTodo] = useState(false);
  const [task, setTask] = useState(todo.title);
  const handleEdit = () => {
    setEditingTodo(true);
  }

  useEffect(() => {
    if (!editingTodo) return;
    const timer = setTimeout(() => {
      setEditingTodo(false);
      onEdit(todo.id, {title: task});
    }, 3000);
    return () => clearTimeout(timer);
  }, [editingTodo, todo.id, task, onEdit]);

  return (
    <ListItem
      key={todo.id}
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => onDelete(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox 
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            edge="start"
            tabIndex={-1}
            sx={{ 
              '&.Mui-checked': { color: 'primary.main'  }
            }}
          />
        </ListItemIcon>
        {editingTodo ? 
          <TextField 
            label="Editing Task" 
            variant="standard" 
            value={task}
            onChange={(e) => setTask(e.target.value)}
          /> 
          : 
          <ListItemText 
            primary={todo.title} 
            sx={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              fontStyle: todo.completed ? 'italic' : 'normal',
            }}
          />
        }
      </ListItemButton>
    </ListItem>
  )
}