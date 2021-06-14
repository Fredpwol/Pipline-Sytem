import React, { useContext, useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import { authContext } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 500,
    width: "70%",
    marginBottom:"50px"
  },
  content: {
    paddingTop: "100px",
  },
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159),
  createData("Ice cream sandwich", 237),
  createData("Eclair", 262),
  createData("Cupcake", 305),
  createData("Gingerbread", 356),
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    borderBottom: "2px solid",
    borderBottomColor: theme.palette.primary.main,
    // height: "70px",
    width: "100px",
  },
}))(TableRow);

export default function BasicTable() {
  const classes = useStyles();
  const auth = useContext(authContext);
  const [block, setBlock] = useState({});
  const [errors, setErrors] = useState("");

  useEffect(() => {
    fetch(`/blocks/latest`, {
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
        <Table className={classes.table} align="center">
          <Typography color="primary">Latest</Typography>
          <TableBody>
            {Object.entries(block).map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell scope="row" component="row" align="right">
                  {row[0]}
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  style={{
                    whiteSpace: "normal",
                    wordBreak: "break-word",
                  }}
                >
                  {row[1]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
