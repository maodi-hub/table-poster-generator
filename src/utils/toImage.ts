import html2canvas from "html2canvas";

export default function getPoster(el: HTMLElement) {
  const style = document.createElement('style');
  document.head.appendChild(style);
  style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');
  return html2canvas(el, {
    scrollX: 0,
    scrollY: 0,
    allowTaint: true,
    width: el.offsetWidth,
    height: el.offsetHeight,
    logging: true, // 是否尝试记录日志
    useCORS: true, // 是否尝试使用CORS从服务器加载图像，解决图片跨域
    scale: 2, // 缩放比例，处理模糊问题，数值越大越高清
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  }).then(ctx => {
    style.remove();
    return ctx
  });
}
