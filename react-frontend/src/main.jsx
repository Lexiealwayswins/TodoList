import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import theme from './theme.js'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import "@fontsource/elms-sans";          // 默认 Regular 400
import "@fontsource/elms-sans/600.css";  // SemiBold 600
import "@fontsource/elms-sans/700.css";  // Bold 700

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
)
