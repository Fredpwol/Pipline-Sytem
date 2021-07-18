import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import { authContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { API_URL } from "../utils";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop: "20px",
  },
  content: {
    paddingTop: "100px",
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);
  const [errors, setErrors] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const auth = useContext(authContext);

  const handleChangePage = (event, newPage) => {
    console.log("page", newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(++event.target.value);
    setPage(0);
  };

  useEffect(() => {
    fetch(`${API_URL}/blocks`, {
      headers: new Headers({ Authorization: `Bearer ${auth.token}` }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status === "error") {
          setErrors(data.message);
        } else {
          setBlocks(data.blocks);
        }
      })
      .catch((err) => setErrors(String(err)));
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
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Block History
          </Typography>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>_id</StyledTableCell>
                <StyledTableCell>Time added</StyledTableCell>
                <StyledTableCell align="right">Flow Rate</StyledTableCell>
                <StyledTableCell align="right">Temeperature</StyledTableCell>
                <StyledTableCell align="right">vibration</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {blocks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row._id}>
                    <Link to={`/blocks/${row._id}`}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        style={{ color: "blue" }}
                      >
                        {row._id}
                      </StyledTableCell>
                    </Link>
                    <StyledTableCell>
                      {new Date(row.timestamp).toLocaleString()}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.flowRate}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.temperature}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.vibration}</StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={blocks.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </>
      )}
    </div>
  );
}
