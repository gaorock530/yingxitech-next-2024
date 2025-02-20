export default function isWeixin() {
  var isMobile = window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i); // 是否手机端
  var isWx = /micromessenger/i.test(navigator.userAgent); // 是否微信
  var isComWx = /wxwork/i.test(navigator.userAgent); // 是否企业微信

  if (isComWx && isMobile) { //手机端企业微信
     return 'com-wx-mobile'
   }
  if (isComWx && !isMobile) { //PC端企业微信
    return 'com-wx-pc'
  }
  if (isWx && isMobile) { // 手机端微信
    return 'wx-mobile';
  }
  if (isWx && !isMobile) { // PC端微信
    return 'wx-pc';
  }
  return false
}