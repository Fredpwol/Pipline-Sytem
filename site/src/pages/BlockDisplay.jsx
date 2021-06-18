import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Block from "../components/Block";
import { authContext } from "../contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import { API_URL } from "../utils";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  content: {
    paddingTop: "100px",
  },
  all: {
    margin: "10px",
  },
}));

export default function BlockDisplay() {
  const { _id } = useParams();
  const [block, setBlock] = useState({});
  const [errors, setErrors] = useState("");
  const auth = useContext(authContext);
  const classes = useStyles();

  useEffect(() => {
    Boolean(_id) &&
      fetch(`${API_URL}/blocks/${_id}`, {
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
  }, [_id, auth.token]);

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
        <Block
          block={block}
          title={`Block ${block._id} Created on ${new Date(
            block.timestamp
          ).toLocaleString()}`}
        />
      )}
    </div>
  );
}
