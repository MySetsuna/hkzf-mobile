import React, { useEffect, useState, useContext } from 'react'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import axios from 'axios'

import { Swiper, Toast, Image, TabBar, Grid } from 'antd-mobile'
import indexStyle from './index.module.scss'

import Nav1 from './../../assets/images/nav-1.png'
import Nav2 from './../../assets/images/nav-2.png'
import Nav3 from './../../assets/images/nav-3.png'
import Nav4 from './../../assets/images/nav-4.png'
/**引入导航栏组件 */
import SearchHeader from '../../components/SearchHeader'

/**自定义context */
import { CityInfo } from '../../context'

/**防闪烁占位颜色 */
const colors = ['#ffffff', '#ffffff', '#ffffff', '#ffffff']
/**导航菜单 */
const NavMenu = (props) => {
  const navs = [
    {
      key: '/home',
      title: <div className={indexStyle.navTitle}>整租</div>,
      icon: <Image lazy placeholder={false} className={indexStyle.navImg} src={Nav1} />,
    },
    {
      key: '/home/list',
      title: <div className={indexStyle.navTitle}>合租</div>,
      icon: <Image lazy placeholder={false} className={indexStyle.navImg} src={Nav2} />,
    },
    {
      key: '/home/news',
      title: <div className={indexStyle.navTitle}>地图找房</div>,
      icon: <Image lazy placeholder={false} className={indexStyle.navImg} src={Nav3} />,
    },
    {
      key: '/home/profile',
      title: <div className={indexStyle.navTitle}>去出租</div>,
      icon: <Image lazy placeholder={false} className={indexStyle.navImg} src={Nav4} />,
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

/**位置信息 */
// navigator.geolocation.getCurrentPosition(position => {
//   console.log(position)
// })
/**轮播图 */
const swiperItems = (swipers) => {
  return swipers.length > 0 ? swipers.map((img, index) => (
    <Swiper.Item key={`swiper${index}`}>
      <div
        className={indexStyle.swiperImg}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`)
        }}
      >
        <Image lazy placeholder={false} alt={`${img.alt}`} src={`${process.env.REACT_APP_BACK_STAGE_URL}${img.imgSrc}`} />

      </div>
    </Swiper.Item>
  )) :
    <Swiper.Item key={`swiperOulet`}>
      <div
        className={indexStyle.swiperImg}
      >
      </div>
    </Swiper.Item>
}

const SwiperBlank = () => {
  const {name} = useContext(CityInfo)
  const [swipers, setSwipers] = useState([])
  const getSwipers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACK_STAGE_URL}/home/swiper`)
    const data = res.data.body
    setSwipers(data)
  }

  useEffect(() => {
    getSwipers()
  }, [])
  return (<div>
    <Swiper loop autoplay>{swiperItems(swipers || [])}</Swiper>
    {/**搜索框 */}
    {/* <CityInfo.Consumer>
      {cityInfo => <SearchHeader cityName={cityInfo.name}></SearchHeader>}
    </CityInfo.Consumer> */}
    <SearchHeader cityName={name} />
  </div>)
}

/**租房小组 */
const groupItems = (groups) => {
  return groups.length > 0 ? groups.map(item => (
    <Grid.Item key={`groups${item.id}`}>
      <div className={indexStyle.groupItem}>
        <div className={indexStyle.groupDesc}>
          <p className={indexStyle.itemTitle}>{item.title}</p>
          <span className={indexStyle.itemInfo}>{item.desc}</span>
        </div>
        <div className={indexStyle.itemImg}>
          <Image lazy placeholder={false}
            width={55}
            height={55}
            src={`${process.env.REACT_APP_BACK_STAGE_URL}${item.imgSrc}`}
            alt={item.title} />
        </div>
      </div>
    </Grid.Item>
  )) : colors.map((item, index) => (
    <Grid.Item key={`groups${index}`}>
      <div className={indexStyle.groupItem}>
        <div className={indexStyle.groupDesc}>
          <p className={indexStyle.itemTitle}></p>
          <span className={indexStyle.itemInfo}></span>
        </div>
        <div className={indexStyle.itemImg}>
          <div
            className={indexStyle.swiperImg}
            style={{ background: item }}
          >
          </div>
        </div>
      </div>
    </Grid.Item>
  ))
}

const GroupBlank = (props) => {
  const [groups, setGroups] = useState([])
  const getGroups = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACK_STAGE_URL}/home/groups`, {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    const data = res.data.body
    setGroups(data)
  }
  useEffect(() => {
    getGroups()
  }, [])
  return (
    <div className={indexStyle.agroupGrid}>
      <Grid columns={2} gap={10}>{groupItems(groups || [])}</Grid>
    </div>
  )
}

/**最新资讯 */
const NewsBlank = (props) => {
  const [news, setNews] = useState([])
  const getNews = async () => {
    const res = await axios.get(`${process.env.REACT_APP_BACK_STAGE_URL}/home/news`, {
      params: {
        area: 'AREA|88cff55c-aaa4-e2e0'
      }
    })
    const data = res.data.body
    setNews(data)
  }
  useEffect(() => {
    getNews()
  }, [])
  return (
    <div className={indexStyle.news}>
      <h3 className={indexStyle.newsTitle}>最新资讯</h3>
      {
        news.map(item => <NewsItems key={`news${item.id}`} item={item} />)
      }
    </div>
  )
}

const NewsItems = (props) => {
  let item = props.item
  return (
    <div className={indexStyle.newsItems} key={item.id}>
      <div className={indexStyle.newsImgwrap}>
        <Image lazy placeholder={false}
          style={{ width: '109%' }}
          className={indexStyle.newsItemImg}
          src={`${process.env.REACT_APP_BACK_STAGE_URL}${item.imgSrc}`}
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

/** 首页内容 */
const Index = () => {
  /** route跳转设置 */
  const history = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const setRouteActive = (value) => {
    history(value)
  }

  return (
    <div className={indexStyle.content}>
      {/**轮播图 */}
      <SwiperBlank></SwiperBlank>

      {/**导航菜单 */}
      <NavMenu location={pathname} setRouteActive={setRouteActive}></NavMenu>
      {/**租房小组 */}
      <div className={indexStyle.groups} >
        <h3 className={indexStyle.groupsTile}>
          租房小组<span className={indexStyle.groupsMore}>更多</span>
        </h3>
        <GroupBlank></GroupBlank>
      </div>
      {/**最新资讯 */}
      <NewsBlank></NewsBlank>
    </div>
  )
}

export default Index