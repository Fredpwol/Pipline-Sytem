import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Loading from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { authContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import { API_URL } from "../../utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [logining, setLogining] = useState(false);
  const [errors, setErrors] = useState("");
  const [remember, setRemember] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const auth = useContext(authContext);
  const history = useHistory();

  const submit = () => {
    if (password === confirmPassword) {
      setLogining(true)
      fetch(`${API_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ email, password, organization }),
        headers: new Headers({ "Content-Type": "application/json" }),
      })
        .then((res) => res.json())
        .then((data) => {
          setLogining(false)
          if (data.status === "error") {
            setErrors(data.message);
            return;
          }
          auth.setEmail(email);
          auth.setToken(data.token);
          console.log(data.token);
          if (remember) {
            localStorage.setItem("token", data.token);
          }
          history.push("/");
        })
        .catch((err) => {
          console.error(err);
          setErrors(String(err));
        });
    } else {
      setErrors("Please confirm your password");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Typography color="error">{errors}</Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                label="Organization"
                name="organization"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={remember}
                    color="primary"
                    onChange={() => setRemember(!remember)}
                  />
                }
                label="Remember me"
              />
            </Grid>
          </Grid>
          <Button
            onClick={submit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           {logining ? <Loading color="white" /> : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
