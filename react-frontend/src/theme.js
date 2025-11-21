import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main:'#f66086e9'
    }
  },
  typography: {
    fontFamily: 'Elms Sans, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  }
});

export default theme;
