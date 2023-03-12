import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    background: {
      paper: '#ebeff2',
    },
    primary: {
      main: '#2f496e',
      light: '#ebeff2',
    },
    secondary: {
      main: '#2783b1',
    },
    text: {
      primary: '#5e6066',
      secondary: '#1566b7',
    },
    error: {
      main: red.A400,
    },
  },
   typography: {
     fontFamily: [
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'monospace',
     ].join(','),
   },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: () => ({
          marginTop: 10,
          marginBottom: 10,
        })
      }
    }
  },
});

export default theme;
