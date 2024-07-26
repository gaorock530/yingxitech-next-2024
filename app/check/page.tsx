import * as React from "react";
import style from "./Page.module.css";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import serverRequest from "./request";

const types = ["warn", "notice", "order", "register"];

export default function CheckPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  React.useEffect(() => {
    if (!type || !types.includes(type)) return;
    (async function () {
      try {
        const res = await serverRequest(`/auth/getOneNoticePage?type=${type}`);
        console.log(res);
      } catch (e) {
        console.log(e);
      } finally {
      }
    })();
  }, []);

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
