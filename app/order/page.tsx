"use client";
import * as React from "react";
import style from "./Page.module.css";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import serverRequest from "./request";

const types = ["paid", "sent", "received", "done", "other"];

export default function OrderPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<Record<string, any>>({});
  const [result, setResult] = React.useState<any>("no result");

  React.useEffect(() => {
    if (!status || !orderId || !types.includes(status)) {
      return;
    }
    (async function () {
      try {
        setLoading(true);
        const res = await fetch(
          `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb02245b16056a2d2&redirect_uri=https%3A%2F%2Fapi.yingxitech.com%2Fauth%2FgetOpenidFromCodeRedirect&response_type=code&scope=snsapi_base&state=${orderId}#wechat_redirect`
        );
        const json = await res.json();
        console.log({ res });
        setResult(json);
        // const res = await serverRequest(
        //   `/auth/getOneNoticePage?type=${type}&value=${value}`,
        //   { action: { action: "type", value: "value" } }
        // );
        // console.log(res);
        // if (!res) return;
        // setData(res);
      } catch (e: any) {
        console.log(e);
        setResult(e.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [status, orderId]);

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
        <p>{orderId ? `orderId: ${orderId}` : "NO orderId"}</p>
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
