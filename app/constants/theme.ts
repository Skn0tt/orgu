import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#11729c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ff954a",
      contrastText: "#333",
    },
    background: {
      default: "#333",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: 400,
      marginTop: "15px",
      marginBottom: "15px",
    },
    h2: {
      fontSize: "1.6rem",
      fontWeight: 400,
      marginTop: "10px",
      marginBottom: "10px",
    },
    h3: {
      fontSize: "1.3rem",
      fontWeight: 400,
      marginTop: "10px",
      marginBottom: "10px",
    },
    body1: {
      fontSize: "1.1rem",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
    },
  },
})

export default theme
