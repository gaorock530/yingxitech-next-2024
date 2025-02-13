"use client";
import * as React from "react";
import style from "./Page.module.css";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
// import serverRequest from "./request";

const types = ["paid", "sent", "received", "done", "other"];

export default function OrderPage() {
  const searchParams = useSearchParams();
  // const status = searchParams.get("status");
  const orderNo = searchParams.get("orderNo");
  const openid = searchParams.get("openid");

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Record<string, any>>({});
  const [result, setResult] = React.useState<any>("no result");

  React.useEffect(() => {
    if (!orderNo || !openid) {
      return;
    }
    (async function () {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.yingxitech.com/order/findOneOrderByOrderNoAdmin`,
          {
            method: 'POST',
            headers: {
              'x-openid': openid
            },
            body: JSON.stringify({
              orderNo: orderNo
            })
          }
        );
        const json = await res.json();
        setResult(json);
      } catch (e: any) {
        setResult(e.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [orderNo, openid]);

  const RenderData = () =>
    Object.keys(data).length > 0 ? (
      Object.keys(data).map((key: string) => (
        <p key={key}>
          <b>{key}:</b>{" "}
          <span className={style.detail}>
            {typeof data[key] === "object"
              ? JSON.stringify(data[key])
              : data[key]}
          </span>
        </p>
      ))
    ) : (
      <p>NO DATA</p>
    );

  return (
    <div className={style.container}>
      <Paper className={style.item}>
        <p>
          {status && types.includes(status)
            ? `status: ${status.toUpperCase()}`
            : "NO Status"}
        </p>
        <p>{orderNo ? `orderNo: ${orderNo}` : "NO orderId"}</p>
        <p>{openid ? `openid: ${openid}` : "NO openid"}</p>
      </Paper>
      <Paper className={style.item}>
        {loading ? <CircularProgress /> : <RenderData />}
      </Paper>
      <Paper className={style.item}>
        {result && typeof result === "object" ? JSON.stringify(result) : result}
      </Paper>
    </div>
  );
}
