import { AppBar, createStyles, makeStyles, Theme, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Wallet } from "./Wallet";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}),
);

export default function SiteHeader() {
    const classes = useStyles();

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>TOKENCHOP!</Typography>
          <Wallet></Wallet>        
        </Toolbar>
      </AppBar>
    )
}