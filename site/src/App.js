import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./styles/App.css";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Copyright from "./components/Copyright";

import { Box } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import cyan from "@material-ui/core/colors/cyan";
import SignIn from "./pages/auth/Login";
import { authContext } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: cyan[600],
    },
  },
});
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = useContext(authContext);
  useEffect(() => {
    setIsAuthenticated(Boolean(auth.token));
  }, [auth.token]);
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div className="body">
        {!isAuthenticated ? (
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route render={() => <Redirect to="/login" />} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        )}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}

export default App;
