import { createTheme } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500], // Customize the shade as necessary
        },
        secondary: {
            main: green[500], // Customize the shade as necessary
        },
        background: {
            default: '#f4f4f4',
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h1: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
        body1: {
            lineHeight: 1.5,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff', // A light background for the app bar
                    color: '#333333', // Dark text for contrast
                },
            },
        },
    },
});

export default theme;
