"use client";

import { useState } from "react";
import DialogPay from "./dialog";

const service = ["网站应用", "手机APP", "微信支付宝小程序", "技术合作"];

export default function Option() {
  const [state, setState] = useState({
    open: false,
    option: 0,
  });

  const onOptionChange = (e: any) => {
    setState((s) => ({ ...s, option: e.target.value }));
  };

  const onPay = () => {
    setState((s) => ({ ...s, open: true }));
  };

  return (
    <div className="charge">
      <select onChange={onOptionChange} name="type">
        {service.map((op, idx) => (
          <option value={idx}>{op}</option>
        ))}
      </select>
      <button onClick={onPay}>付费咨询</button>
      <div className="pay">
        <div className="pay-info">info</div>
      </div>
      <DialogPay
        type={service[state.option]}
        amount={Number(state.option) * 100 + 100}
        open={state.open}
        handleClose={() => setState((s) => ({ ...s, open: false }))}
      />
    </div>
  );
}
