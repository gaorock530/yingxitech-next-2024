'use client'

import { useRef, useState } from "react";
import Snackbar  from '@mui/material/Snackbar';

export default function Form() {
  const [open ,setOpen] = useState(false)

  const onSubmit = (e: any) => {
    e.preventDefault();
    e.currentTarget.reset()
    setOpen(true)
    // const data = new FormData(e.target);
    // console.log(data.get('name'))
    // console.log(data.get('phone'))
    // console.log(data.get('msg'))

  }


  return (
    <>
  <form onSubmit={onSubmit} style={{position: "relative"}}>
    <h3>联系我们</h3>
    <h5>个人/单位:</h5>
    <input type="text" placeholder="姓名/名称" autoComplete="off" name="name" />
    <h5>联系电话:</h5>
    <input type="phone" placeholder="手机/座机" autoComplete="off" name="phone" pattern="[0-9]+" />
    <h5>留言:</h5>
    <textarea name="msg"></textarea>
    <button>提交</button>
    
  </form>
    <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        message="联系信息已提交"
      />
    </>)
}