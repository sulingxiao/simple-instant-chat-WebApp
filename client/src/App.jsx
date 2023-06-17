import './App.css';
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Layout from "./layout"

const theme = createTheme({
  palette: {
    primary: {
      main: "#008080",
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Layout></Layout>
  </ThemeProvider>
  );
}

export default App;
