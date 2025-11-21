import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

export default function AddTask({onSubmit}) {
    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    onSubmit(data.title);
    reset();
  }

  return (
    <Box 
      component={"form"} 
      onSubmit={handleSubmit(submitHandler)}
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',  
        margin: '10px',
        }}
    >
      <TextField 
        label="What's the task today? " 
        variant="outlined" 
        error={!!errors.title} 
        helperText={errors.title ? 'Task is required' : ''}
        {...register("title", { required: true })}      
        sx={{ 
          padding: 0, 
          margin: 0,
          fontStyle: 'bold',
          width: '80%',
        }}
      />
      <Button 
        variant="contained"
        type="submit"
        sx={{mr: 0, height: '56px'}}
      >Add</Button>
    </Box>
  )
}