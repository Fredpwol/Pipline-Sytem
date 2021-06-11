import React from "react";
import { Switch, Route } from "react-router-dom";

import "./styles/App.css"
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Copyright from "./components/Copyright"

import { Box } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import cyan from "@material-ui/core/colors/cyan"
import SignIn from "./pages/auth/Login";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary:{
      main: cyan[600]
    }
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="body">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={SignIn} />
      </Switch>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}

export default App;
