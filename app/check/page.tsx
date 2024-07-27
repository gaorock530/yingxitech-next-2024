"use client"
import * as React from "react";
import style from "./Page.module.css";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import serverRequest from "./request";



const types = ["warn", "notice", "order", "register"];

export default function CheckPage() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const value = searchParams.get("value");

  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<Record<string, any>>({})

  React.useEffect(() => {
    if (!value || !type || !types.includes(type)) return;
    (async function () {
      try {
        setLoading(true)
        const res = await serverRequest(`/auth/getOneNoticePage?type=${type}&value=${value}`, {action : {action: 'type', value: 'value'}});
        console.log(res);
        if (!res) return
        setData(res)
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    })();
  }, [type, value]);

  const RenderData = () => Object.keys(data).length > 0 ? Object.keys(data).map((key: string) => <p key={key}><b>{key}:</b> <span>{data[key]}</span></p>): <p>NO DATA</p>

  return (
    <div className={style.container}>
      <Paper className={style.item}>{type || 'NO TYPE'}</Paper>
      <Paper className={style.item}>{loading? <CircularProgress />:<RenderData />}</Paper>
    </div>
  );
}
