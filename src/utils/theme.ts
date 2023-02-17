import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        red: Palette['primary'];
    }

    interface PaletteOptions {
        red?: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    palette: {
        red: {
            light: '#e87474',
            main: '#b5413f',
            dark: '#840600',
            contrastText: '#fff',
        },
        primary: {
            light: '#000',
            main: '#000',
            dark: '#111',
            contrastText: '#fff',
        },
    },
});

export default theme;
