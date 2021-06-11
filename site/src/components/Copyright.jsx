import {Typography, Link} from "@material-ui/core"



export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center" className="copyright">
        {"Copyright © "}
        <Link color="inherit" href="/">
          Water System
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }