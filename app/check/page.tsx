import * as React from "react";
import style from "./Page.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function CheckPage() {
  return (
    <div className={style.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={style.item}>item</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={style.item}>item</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={style.item}>item</Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={style.item}>item</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
