import Box from "@mui/material/Box"
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

export default function Progress ({todos}) {
  const total = todos.length;
  const [countCompleted, setCountCompleted] = useState(0);

  useEffect(() => {
    setCountCompleted(todos.filter(todo => todo.completed).length);
  }, [todos, total, countCompleted]);

  const ProgressBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: 'primary.main',
      ...theme.applyStyles('dark', {
        backgroundColor: 'primary.main',
      }),
    },
  }));

  return (
    <Box 
      sx={{ 
        display:'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '10px',
        width: '100%', 
        maxWidth: 360, 
        bgcolor: 'background.paper',
        border: '1px solid grey',
        borderRadius: '8px',
      }}
    >
      <Box  
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          ml: '20px',
          padding: '0',
      }}
      >
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            textAlign: 'left',
          }}
        >
          Keep it Up! 
        </Typography>
        <ProgressBar 
          variant="determinate" 
          value={total === 0 ? 0 : (countCompleted / total) * 100} 
          sx={{ 
            width: '180px',
          }}
        />
      </Box>      
      <Box  
        sx={{ 
          margin: '20px', 
          border: '2px solid lightgrey', 
          borderRadius: '50%',
          width: '100px',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.4rem',
      }}
      >
        <p>{countCompleted} / {total} </p>
      </Box>
    </Box>
  )
}