import { ThemeProvider, createTheme } from '@mui/material/styles';

let theme = createTheme({
    palette: {
      primary: {
        main: '#00bdd3',
      },

      danger: {
        main: '#d32f2f'
      }
    },
    typography: {
      fontFamily : ['inherit']  
    }
});

export default function MUICustomTheme({children}) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}