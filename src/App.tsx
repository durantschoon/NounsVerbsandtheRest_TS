import * as React from "react";
import * as Colors from "material-ui-colors";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import createTheme from "@mui/material/styles/createTheme";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import PoemView from "./components/PoemView";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b6484e", // App.css var(--color-deep-red)
    },
    secondary: {
      main: "#f6e9fc", // App.css var(--color-secondary)
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          color: "#f6e9fc", // App.css var(--color-secondary)
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          margin: "4px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          paddingTop: "0.1rem",
          paddingLeft: "1.5rem",
        },
      },
    },
  },
});

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                Nouns, Verbs and the Rest
              </Typography>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1 }}>
            <PoemView />
          </Box>
        </Box>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
