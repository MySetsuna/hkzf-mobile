/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Swiper, Toast, Image, TabBar, Grid } from 'antd-mobile'
import indexStyle from './index.module.scss'

import Nav1 from './../../assets/images/nav-1.png'
import Nav2 from './../../assets/images/nav-2.png'
import Nav3 from './../../assets/images/nav-3.png'
import Nav4 from './../../assets/images/nav-4.png'

/**导航栏 */
const NavBar = (props) => {
  const navs = [
    {
      key: '/home',
      title: <div className={indexStyle.navTitle}>整租</div>,
      icon: <Image className={indexStyle.navImg} src={Nav1} />,
    },
    {
      key: '/home/list',
      title: <div className={indexStyle.navTitle}>合租</div>,
      icon: <Image className={indexStyle.navImg} src={Nav2} />,
    },
    {
      key: '/home/news',
      title: <div className={indexStyle.navTitle}>地图找房</div>,
      icon: <Image className={indexStyle.navImg} src={Nav3} />,
    },
    {
      key: '/home/profile',
      title: <div className={indexStyle.navTitle}>去出租</div>,
      icon: <Image className={indexStyle.navImg} src={Nav4} />,
    },
  ]

  return (
    <div>
      <TabBar activeKey={props.pathname} onChange={value => props.setRouteActive(value)}>
        {navs.map(item => (
          <TabBar.Item className={indexStyle.nvbar} key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}

/**轮播图 */
const swiperItems = (swipers) => {
  return swipers.map((img, index) => (
    <Swiper.Item key={img.id}>
      <div
        className={indexStyle.swiperImg}  
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`)
        }}
      >
        <Image alt={`${img.alt}`} src={`http://192.168.3.13:8080${img.imgSrc}`} />
      </div>
    </Swiper.Item>
  ))
}

/**租房小组 */
const groupItems = (groups) => {
  return groups.length > 0 && groups.map(item => (
    <Grid.Item key={`groups${item.id}`}>
      <div className={indexStyle.groupItem}>
        <div className={indexStyle.groupDesc}>
          <p className={indexStyle.itemTitle}>{item.title}</p>
          <span className={indexStyle.itemInfo}>{item.desc}</span>
        </div>
        <div className={indexStyle.itemImg}>
          <Image
            width={55}
            height={55}
            src={`http://192.168.3.13:8080${item.imgSrc}`}
            alt={item.title} />
        </div>
      </div>
    </Grid.Item>
  ))
}

/**最新资讯 */
const NewsBlank = (props)=>{
  let news = props.news
    return (
      <div className={indexStyle.news}>
        <h3 className={indexStyle.newsTitle}>最新资讯</h3>
        {
          news.map(item => <NewsItems key={`news${item.id}`} item={item}/>)
        }
      </div>)
}

const NewsItems = (props) => {
  let item = props.item
  console.log(props)
  return (
    <div className={indexStyle.newsItems} key={item.id}>
      <div className={indexStyle.newsImgwrap}>
        <Image
          style={{width:'109%'}}
          className={indexStyle.newsItemImg}
          src={`http://192.168.3.13:8080${item.imgSrc}`}
          alt=""
        />
      </div>
      <div className={indexStyle.newsItemContent}>
        <div className={indexStyle.newsItemTitle}>{item.title}</div>
        <div className={indexStyle.newsItemInfo}>
          <div className={indexStyle.from}>{item.from}</div>
          <div className={indexStyle.date}>{item.date}</div>
        </div>
      </div>
    </div>
  )
}

const Index = (props) => {
  /** 使用useEffect会引起多次渲染组件,提升到父组件home中，避免多次发送请求
   * const [swipers, setSwipers] = useState([]);
  const getSwipers = async () => {
    let swdata =  await axios.get('http://192.168.3.13:8080/home/swiper')
    setSwipers(swdata.data.body)
  }
  useEffect(() => {
    getSwipers()
  }, []);
  */
  // 1.轮播图数据
  let swipers = props.swipers
  // 2.租房小组数据
  let groups = props.groups
  // 3.资讯数据
  let news = props.news


  return (
    <div className={indexStyle.content}>
      {/**轮播图 */}
      {swipers.length > 0 && <Swiper loop autoplay>{swiperItems(swipers)}</Swiper>}
      {/**导航菜单 */}
      <NavBar location={props.location} setRouteActive={props.setRouteActive}></NavBar>
      {/**租房小组 */}
      <div className={indexStyle.groups} >
        <h3 className={indexStyle.groupsTile}>
          租房小组<span className={indexStyle.groupsMore}>更多</span>
        </h3>
        <div className={indexStyle.agroupGrid}>
          <Grid columns={2} gap={10}>{groupItems(groups)}</Grid>
        </div>
      </div>
      {/**最新资讯 */}
      <NewsBlank news={news}></NewsBlank>
    </div>
  )
}

export default Index