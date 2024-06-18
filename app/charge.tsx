"use client";

import { useState } from "react";

export default function Option() {
  const [state, setState] = useState({
    open: false,
    option: 0,
  });

  const onOptionChange = (e: any) => {
    setState((s) => ({ ...s, option: e.target.value }));
  };

  const onPay = () => {
    const fee = Number(state.option) * 100 + 100;
    console.log(fee);
  };

  return (
    <div className="charge">
      <select onChange={onOptionChange} name="type">
        <option value={0}>网站应用</option>
        <option value={1}>手机APP</option>
        <option value={2}>微信支付宝小程序</option>
        <option value={3}>技术合作</option>
      </select>
      <button onClick={onPay}>付费咨询</button>
      <div className="pay">
        <div className="pay-info">info</div>
      </div>
    </div>
  );
}
