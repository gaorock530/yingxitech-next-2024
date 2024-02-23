
import Image from 'next/image'
import styles from './Home.module.css';
// Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
// import { Keyboard, Pagination, Mousewheel } from 'swiper/modules';
import Form from './form';
// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/bundle'

export default function Home() {

  return (
    <main className={styles.main}>
      <header>
        <img src="/favicon-32x32.png" />
        <p>影袭科技</p>
      </header>
      <div className={styles.pageWrapper}>
        <div className={styles.pageContent}>
          <p className="page-1-p">
            科技改变生活，技术推动思维
          </p>
          <p className="page-1-p">
            打造互联网运营新模式
          </p>
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
          <footer>
            <p><span>影袭网络技术有限公司 © 2024</span><span>All rights reserved.</span></p>
            <p><a href="https://beian.miit.gov.cn/#/Integrated/index">豫ICP备18021827号</a></p>
          </footer>
        </div>
        <div className={styles.pageMask}></div>
        <img className={styles.bgImg} src="/img/4.jpg" />
      </div>
      {/* <Swiper
        // modules={[Pagination, Keyboard, Mousewheel]}
        // spaceBetween={0}
        // direction={'vertical'}
        // // slidesPerView={1}
        // mousewheel
        // keyboard={{ enabled: true }}
        // pagination={{
        //   "clickable": true
        // }}
        // // controller={{ control: controlledSwiper }}
        // onSlideChange={(e) => console.log('slide change', e.snapIndex)}
        // onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <div className={styles.pageWrapper}>
              <div className={styles.pageContent}>
                <p className="page-1-p">
                  科技改变生活，技术推动思维
                </p>
                <p className="page-1-p">
                  打造互联网运营新模式
                </p>
              </div>
              <div className={styles.pageMask}></div>
              <img className={styles.bgImg} src="/img/1.jpg" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.pageWrapper}>
              <div className={styles.pageContent}>
                <p className="page-1-p">
                  常年在北京、上海、香港、台湾、新加坡、马来西亚、印尼、泰国、韩国、日本、英国等国家和地区联合举办各种大赛在河南地区的推广宣传
                </p>
              </div>
              <div className={styles.pageMask}></div>
              <img className={styles.bgImg} src="/img/2.jpg" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.pageWrapper}>
              <div className={styles.pageContent}>
                <form onSubmit={onSubmit}>
                  <h3>联系我们</h3>
                  <h5>个人/单位:</h5>
                  <input type="text" placeholder="姓名/名称" autoComplete="off" name="name" />
                  <h5>联系电话:</h5>
                  <input type="phone" placeholder="手机/座机" autoComplete="off" name="phone" pattern="[0-9]+" />
                  <h5>留言:</h5>
                  <textarea name="msg"></textarea>
                  <button>提交</button>
                </form>
              </div>
              <div className={styles.pageMask}></div>
              <img className={styles.bgImg} src="/img/3.jpg" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.pageWrapper}>
              <div className={styles.pageContent}>
                <footer>
                  <p><span>影袭网络技术有限公司 © 2024</span><span>All rights reserved.</span></p>
                  <p><a href="https://beian.miit.gov.cn/#/Integrated/index">豫ICP备18021827号</a></p>
                </footer>
              </div>
              <div className={styles.pageMask}></div>
              <img className={styles.bgImg} src="/img/4.jpg" />
            </div>
          </SwiperSlide>

        </Swiper> */}

    </main>
  )
}
