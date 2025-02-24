"use client";
import * as React from "react";
import style from "./Page.module.css";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
import isWeixin from "../utils/weixin";
import { useRouter } from "next/navigation";

function formatDate(date: string) {
  if (!date) return;
  return new Date(
    date.length === 10 ? Number(date + "000") : date
  ).toLocaleString("zh-CN");
}

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const openid = searchParams.get("openid") || "";
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    if (!isWeixin()) return setError("缺少授权环境");
    if (!openid) return setError("缺少关键信息");
    (async function () {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.yingxitech.com/order/listOrdersAdmin`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-openid": openid,
            },
            body: JSON.stringify({
              status: "paid",
            }),
          }
        );
        const json = await res.json();
        console.log({ json });
        setData(json);
      } catch (e: any) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [openid]);

  const send = (orderNo: string) => () => {
    router.push(`/order?openid=${openid}&orderNo=${orderNo}`);
  };

  return loading ? (
    <div className={style.center}>
      <CircularProgress />
    </div>
  ) : data && data.length > 1 ? (
    <div className={style.container}>
      <h3>共计：{data.length} 单未发货</h3>
      {data.map((item: any) => (
        <Paper key={item.id} className={style.item}>
          <div>订单号：{item.orderNo}</div>
          <div>付款时间：{formatDate(item.paidDate)}</div>
          <div>商品名：{item.items[0].productName}</div>
          <div>商品规格：{item.items[0].specName}</div>
          <div>商品数量：{item.items[0].quatity}</div>
          <button onClick={send(item.orderNo)}>发货</button>
        </Paper>
      ))}
    </div>
  ) : (
    <div className={style.center}>没有数据</div>
  );
}
