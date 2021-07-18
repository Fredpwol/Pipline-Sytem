import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "70%",
    marginBottom: "50px",
  },

  container: {
    padding: "10px ",
    border: "1px solid",
    borderRadius: "15px",
    borderColor: theme.palette.primary.main,
  },
}));

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

export default function Block({ title, block }) {
  const classes = useStyles();
  return (
    <div align="center" className={classes.container}>
      <Typography color="primary">{title}</Typography>
      <Table className={classes.table}>
        <TableBody>
          {Object.entries(block).map((row) => (
            <StyledTableRow key={row[0]}>
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
                {row[1]}{" "}
                {row[0].toLowerCase() === "temperature"
                  ? "°C"
                  : row[0].toLowerCase() === "flowrate"
                  ? "Litre/m"
                  : row[0].toLowerCase() === "vibration"
                  ? "Hz"
                  : null}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
