import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from '@material-ui/core';
import { authContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Block from "../components/Block";
import { API_URL } from "../utils";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: "100px",
  },
  all:{
    margin:"10px"
  }
}));

export default function BasicTable() {
  const classes = useStyles();
  const auth = useContext(authContext);
  const [block, setBlock] = useState({});
  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/blocks/latest`, {
      headers: new Headers({ Authorization: `Bearer ${auth.token}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "error") {
          setErrors(data.message);
        } else {
          setBlock(data.block);
        }
      })
      .catch((err) => setErrors(String(err)));
  }, []);

  return (
    <div className={classes.content}>
      {Boolean(errors) ? (
        <div align="center">
          <Typography variant="h3">
            Sorry an Unexpected error occurred!
          </Typography>
          <p>{errors}</p>
        </div>
      ) : (
        <>
        <Typography align="right" className={classes.all}><Link to="/blocks">See all</Link></Typography>
          <Block block={block} title="Latest" />
        </>
      )}
    </div>
  );
}
