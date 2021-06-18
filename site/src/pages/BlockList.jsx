import React, {useState, useEffect, useContext} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Typography } from '@material-ui/core';
import { authContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { API_URL } from '../utils';

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
    marginTop:"20px"
  },
  content: {
    paddingTop: "100px",
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [blocks, setBlocks] = useState([]);
  const [errors, setErrors] = useState("");
  const auth = useContext(authContext);
  
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
      ):(
      <>
        <Typography variant="h5" style={{fontWeight:"bold"}}>Block History</Typography>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>_id</StyledTableCell>
              <StyledTableCell>Time added</StyledTableCell>
              <StyledTableCell align="right">Flow Rate</StyledTableCell>
              <StyledTableCell align="right">Temeperature</StyledTableCell>
              <StyledTableCell align="right">Density</StyledTableCell>
              <StyledTableCell align="right">PH</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((row) => (
              <StyledTableRow key={row._id}>
                <Link to={`/blocks/${row._id}`}>
                <StyledTableCell component="th" scope="row" style={{color:"blue"}}>
                  {row._id}
                </StyledTableCell>
                </Link>
                <StyledTableCell>{new Date(row.timestamp).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="right">{row.flowRate}</StyledTableCell>
                <StyledTableCell align="right">{row.temperature}</StyledTableCell>
                <StyledTableCell align="right">{row.density}</StyledTableCell>
                <StyledTableCell align="right">{row.PH}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </>)}

    </div>
  );
}
