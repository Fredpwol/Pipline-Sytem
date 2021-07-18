import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { authContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Loading from "@material-ui/core/CircularProgress";
import Block from "../components/Block";
import { API_URL } from "../utils";
import DataChart from "../components/DataChart";

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: "100px",
  },
  all: {
    margin: "10px",
  },
}));

export default function BasicTable() {
  const classes = useStyles();
  const auth = useContext(authContext);
  const [block, setBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`${API_URL}/blocks/latest`, {
      headers: new Headers({ Authorization: `Bearer ${auth.token}` }),
    })
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        if (data?.status === "error") {
          setErrors(data.message);
        } else {
          setBlock(data.block);
        }
      })
      .catch((err) => setErrors(String(err)));
      fetch(`${API_URL}/blocks/timeline/all`, {
        headers: new Headers({ Authorization: `Bearer ${auth.token}` }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data?.status === "error") {
            // setErrors(data.message);
          } else {
            setTimeline(data.data);
          }
        })
      
  }, [auth.token]);

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
          <Typography align="right" className={classes.all}>
            <Link to="/blocks">See all</Link>
          </Typography>
          {block !== null ? (
            Object.entries(block).length !== 0 ? (
              <Block block={block} title="Latest" />
            ) : (
              <center>
                <h2>Sorry no block added yet.</h2>
              </center>
            )
          ) : isLoading ? (
            <center>
              <Loading />
            </center>
          ) : null}
          <div style={{padding:"20px"}}>
            <h2 align="center">Data Timeline</h2>
          <DataChart data={timeline} />
          </div>
        </>
      )}
    </div>
  );
}
