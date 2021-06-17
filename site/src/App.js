import React, { useContext, useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./styles/App.css";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import BlockList from "./pages/BlockList";
import Copyright from "./components/Copyright";

import { Box } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import cyan from "@material-ui/core/colors/cyan";
import SignIn from "./pages/auth/Login";
import { authContext } from "./contexts/AuthContext";
import NavBar from "./components/NavBar";
import ErrorPage from "./pages/404";
import BlockDisplay from "./pages/BlockDisplay";

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


function PrivateRoute ({component: Component, authed, ...rest}) {
  console.log(authed)
  return (
    <Route
      {...rest}
      exact 
      render={(props) => authed
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

//block all
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const auth = useContext(authContext);
  useEffect(() => {
    setIsAuthenticated(Boolean(auth.token));
  }, [auth.token]);
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div className="body">
         <Switch>
          <PrivateRoute authed={isAuthenticated} exact path="/" component={Home} />
            <PrivateRoute authed={isAuthenticated} exact path="/blocks" component={BlockList} />
            <PrivateRoute authed={isAuthenticated} path="/blocks/:_id" component={BlockDisplay}  />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="*" component={ErrorPage} />
            {/* <Route render={() => <Redirect to="/login" />} /> */}
          </Switch>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}

export default App;
