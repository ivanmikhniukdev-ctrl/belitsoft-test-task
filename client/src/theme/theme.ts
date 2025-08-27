
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2E7D32' },
    secondary: { main: '#1976d2' },
    background: { default: '#f6f8fb' }
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: '\'Inter\', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
    h5: { fontWeight: 700 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 18 }
      }
    }
  }
});
