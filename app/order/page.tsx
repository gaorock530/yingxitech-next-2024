"use client";
import * as React from "react";
import style from "./Page.module.css";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearchParams } from "next/navigation";
// import serverRequest from "./request";

const types = ["paid", "sent", "received", "done", "other"];
const comps = ["顺丰", "申通", "中通", "圆通"];

function formatDate(date: string) {
  return new Date(date).toLocaleString("zh-CN");
}

function formatPrice(weixinPrice: number) {
  return (weixinPrice / 100).toFixed(2) + "元";
}

function formatStatus(status: string) {
  switch (status) {
    case "paid":
      return "已支付";
    case "sent":
      return "已发货";
    case "received":
      return "已收货";
    case "received":
      return "已结束";
    default:
      return "未知";
  }
}

export default function OrderPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const orderNo = searchParams.get("orderNo");
  const openid = searchParams.get("openid") || "";

  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Record<string, any>>({});
  const [error, setError] = React.useState<any>(null);
  const [delivery, setDelivery] = React.useState({
    comp: "中通",
    no: "",
    error: false,
  });

  React.useEffect(() => {
    if (!orderNo || !openid) {
      setError("!orderNo || !openid");
      return;
    }
    (async function () {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.yingxitech.com/order/findOneOrderByOrderNoAdmin`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
              "x-openid": openid,
            },
            body: JSON.stringify({
              orderNo: orderNo,
            }),
          }
        );
        const json = await res.json();
        setData(json);
      } catch (e: any) {
        setError(e.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [orderNo, openid]);

  const onNumberChange = (e: any) => {
    const value = e.currentTarget.value;
    if (!value.match(/^[0-9]*$/)) return;
    setDelivery({ comp: delivery.comp, error: false, no: value });
  };

  const onClick = async () => {
    if (error || data.status !== "paid") return;
    if (!delivery.no)
      return setDelivery({ comp: delivery.comp, error: true, no: delivery.no });
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.yingxitech.com/order/sendOrderByOrderNo`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-openid": openid,
          },
          body: JSON.stringify({
            orderNo: orderNo,
            deliverService: delivery.comp,
            deliverNumber: delivery.no,
          }),
        }
      );
      const json = await res.json();
      console.log(json);
      if (json.success === true) setSuccess(true);
      else setError("更改订单状态错误");
    } catch (e: any) {
      setError(e.toString());
    } finally {
      setLoading(false);
    }
  };

  // const RenderData = () =>
  //   Object.keys(data).length > 0 ? (
  //     Object.keys(data).map((key: string) => (
  //       <p key={key}>
  //         <b>{key}:</b>{" "}
  //         <span className={style.detail}>
  //           {typeof data[key] === "object"
  //             ? JSON.stringify(data[key])
  //             : data[key]}
  //         </span>
  //       </p>
  //     ))
  //   ) : (
  //     <p>NO DATA</p>
  //   );

  const RenderOrder = () => {
    const item = data.items[0];
    return (
      <>
        <Paper className={style.item}>
          <h3>订单概况</h3>
          <li className={style.li}>
            <h4>订单状态</h4>
            <p>{formatStatus(data.status)}</p>
          </li>
          <li className={style.li}>
            <h4>订单号</h4>
            <p>{data.orderNo}</p>
          </li>
          <li className={style.li}>
            <h4>下单日期</h4>
            <p>{formatDate(data.paidDate)}</p>
          </li>
        </Paper>
        <Paper className={style.item}>
          <h3>商品详情</h3>
          {/* {data.items.map((item: any) => (
            <div key={item.id}>
              <li className={style.li}>
                <h4>图片</h4>
                <img src={item.specCover} />
              </li>
              <li className={style.li}>
                <h4>名称</h4>
                <p>{item.productName}</p>
              </li>
              <li className={style.li}>
                <h4>规格</h4>
                <p>{item.specName}</p>
              </li>
              <li className={style.li}>
                <h4>数量</h4>
                <p>{item.quatity}</p>
              </li>
            </div>
          ))} */}
          <li className={style.li}>
            <h4>图片</h4>
            <img src={item.specCover} />
          </li>
          <li className={style.li}>
            <h4>名称</h4>
            <p>{item.productName}</p>
          </li>
          <li className={style.li}>
            <h4>规格</h4>
            <p>{item.specName}</p>
          </li>
          <li className={style.li}>
            <h4>数量</h4>
            <p>{item.quatity}</p>
          </li>
        </Paper>
        <Paper className={style.item}>
          <h3>支付详情</h3>
          <li className={style.li}>
            <h4>支付订单号</h4>
            <p>{data.paymentDetail.out_trade_no}</p>
          </li>
          <li className={style.li}>
            <h4>实付金额</h4>
            <p>{formatPrice(data.paymentDetail.amount.total)}</p>
          </li>
          <li className={style.li}>
            <h4>支付时间</h4>
            <p>{formatDate(data.paymentDetail.success_time)}</p>
          </li>
          <li className={style.li}>
            <h4>使用优惠卷</h4>
            <p>{data.couponUsed}</p>
          </li>
        </Paper>
        <Paper className={style.item}>
          <h3>收货详情</h3>
          <li className={style.li}>
            <h4>名称</h4>
            <p>{data.postName}</p>
          </li>
          <li className={style.li}>
            <h4>电话</h4>
            <p>{data.postPhone}</p>
          </li>
          <li className={style.li}>
            <h4>地址</h4>
            <p>{data.postAddress}</p>
          </li>
          <li className={style.li}>
            <h4>邮编</h4>
            <p>{data.postCode}</p>
          </li>
        </Paper>
        {data.status !== "paid" && (
          <Paper className={style.item}>
            <h3>发货详情</h3>
            <li className={style.li}>
              <h4>发货时间</h4>
              <p>{formatDate(data.sentDate)}</p>
            </li>
            <li className={style.li}>
              <h4>服务商</h4>
              <p>{data.deliverService}</p>
            </li>
            <li className={style.li}>
              <h4>发货单号</h4>
              <p>{data.deliverNumber}</p>
            </li>
            <li className={style.li}>
              <h4>发货进度</h4>
              <p>{data.postCode}</p>
            </li>
          </Paper>
        )}
      </>
    );
  };

  return (
    <div className={style.container}>
      {/* <Paper className={style.item}>
        <p>
          {status && types.includes(status)
            ? `status: ${status.toUpperCase()}`
            : "NO Status"}
        </p>
        <p>{orderNo ? `orderNo: ${orderNo}` : "NO orderNo"}</p>
        <p>{openid ? `openid: ${openid}` : "NO openid"}</p>
      </Paper> */}
      {/* <Paper className={style.item}>
        {loading ? <CircularProgress /> : <RenderData />}
      </Paper> */}
      {error && (
        <Paper className={style.item}>
          {error && typeof error === "object" ? JSON.stringify(error) : error}
        </Paper>
      )}
      {loading ? (
        <div className={style.center}>
          <CircularProgress />
        </div>
      ) : success ? (
        <div className={style.center}>已成功发货</div>
      ) : (
        <RenderOrder />
      )}

      {data.status === "paid" && !success && (
        <Paper className={style.item}>
          <h3>邮寄详情</h3>
          <li className={style.li}>
            <h4>快递公司</h4>
            <select
              defaultValue={delivery.comp}
              disabled={loading || data.status !== "paid" || success}
            >
              {comps.map((com) => (
                <option value={com} key={com}>
                  {com}
                </option>
              ))}
            </select>
          </li>
          <li className={style.li}>
            <h4>快递单号</h4>
            <input
              className={delivery.error ? style.error : ""}
              type="tel"
              pattern="/^[0-9]*$/"
              onChange={onNumberChange}
              value={delivery.no}
              disabled={loading || data.status !== "paid" || success}
            />
          </li>
          <button
            onClick={onClick}
            type="button"
            disabled={
              delivery.error || loading || data.status !== "paid" || success
            }
          >
            {loading ? "请稍等" : "确认发货"}
          </button>
        </Paper>
      )}
    </div>
  );
}
