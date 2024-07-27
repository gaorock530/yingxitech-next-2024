// import Image from "next/image";
import Option from "./charge";
import styles from "./Home.module.css";
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
// import { Keyboard, Pagination, Mousewheel } from 'swiper/modules';
import Form from "./form";
// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/bundle'

export default function Home() {
  return (
    <main className={styles.main}>
      <header>
        <img src="/favicon-32x32.png" />
        <p>影袭网络</p>
      </header>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <p className="page-1-p">科技改变生活，技术推动思维</p>
          <p className="page-1-p">打造互联网运营新模式</p>
        </div>
        <div className={styles.pageMask}></div>
        <img className={styles.bgImg} src="/img/1.jpg" />
      </div>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <p className="page-1-p">
            提供多种AI算法，分布式网络存储，流媒体编码、解码，SORA技术应用。
          </p>
        </div>
        <div className={styles.pageMask}></div>
        <img className={styles.bgImg} src="/img/2.jpg" />
      </div>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <Form />
        </div>
        <div className={styles.pageMask}></div>
        <img className={styles.bgImg} src="/img/3.jpg" />
      </div>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <div className="consult">
            <p>
              承接各种网站应用、手机APP、微信支付宝小程序开发业务，和各种技术类合作，包括AI算法、大数据分析、区块链、加密算法等。
            </p>
            <Option />
          </div>
          <footer>
            <p>
              <span>影袭网络技术有限公司 © 2024</span>
              <span>All rights reserved.</span>
            </p>
            <p>
              <a href="https://beian.miit.gov.cn/#/Integrated/index">
                豫ICP备18021827号
              </a>
            </p>
          </footer>
        </div>
        <div className={styles.pageMask}></div>
        <img className={styles.bgImg} src="/img/4.jpg" />
      </div>
    </main>
  );
}
