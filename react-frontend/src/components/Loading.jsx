import { Box, CircularProgress } from '@mui/material';

export default function Loading () {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
      <CircularProgress />
      <span>Loading...</span>
    </Box>
  )
}