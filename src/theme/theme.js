import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0D203F', // Primary color
        },
        secondary: {
            main: '#5BB345', // Secondary color
        },
        background: {
            default: '#C4D7F2', // Background color
        },
        text: {
            primary: '#0D203F', // Primary text color
            secondary: '#19456B', // Secondary text color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#3A8827', // Hover color for buttons
                    },
                },
            },
        },
    },
});

export default theme;
