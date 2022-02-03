import React, { useEffect, useState } from 'react'
import News from './../News'
import HouseList from './../HouseList'
import Index from './../Index'
import Profile from './../Profile'
import { TabBar, Badge } from 'antd-mobile'
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import styles from './index.module.scss'
import './index.scss'
import axios from 'axios'



const Bottom = (props) => {
  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <i className='iconfont icon-ind' />,
    },
    {
      key: '/home/list',
      title: '找房',
      icon: <i className='iconfont icon-findHouse' />,
    },
    {
      key: '/home/news',
      title: '资讯',
      icon: <i className='iconfont icon-infom' />,
      badge: Badge.dot
    },
    {
      key: '/home/profile',
      title: '我的',
      icon: <i className='iconfont icon-my' />,
    },
  ]

  return (
    <div>
      <TabBar activeKey={props.pathname} onChange={value => props.setRouteActive(value)}>
        {tabs.map(item => (
          <TabBar.Item badge={item.badge} key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  )
}




const Home = () => {
  /** route跳转设置 */
  const history = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const setRouteActive = (value) => {
    history(value)
  }
  /**获取轮播图数据 */
  const [swipers, setSwipers] = useState([])
  const getSwipers = async () => {
    let res = await axios.get('http://192.168.3.13:8080/home/swiper')
    setSwipers(res.data.body)
  }
  /** 获取租房小组数据 */
  const [groups, setGroups] = useState([]);
  const getGroups = async () => {
    let res =  await axios.get('http://192.168.3.13:8080/home/groups',{
      params:{
        area:'AREA|88cff55c-aaa4-e2e0'
      }
    })
    setGroups(res.data.body)
  }
  /**获取资讯数据 */
  const [news,setNews] = useState([])
  const getNews=async ()=>{
    let res = await axios.get('http://localhost:8080/home/news',{
      params:{
        area:'AREA|88cff55c-aaa4-e2e0'
      }
    })
    setNews(res.data.body)
  }

  useEffect(() => {
    getSwipers()
    getGroups()
    getNews()
  }, []);
  return (
    <div className={[styles.app, 'home'].join(' ')}>
      <div className={styles.body} >
        <Routes>
          <Route
            exact path='/'
            element={
              <Index location={location}
                setRouteActive={setRouteActive}
                swipers={swipers}
                groups={groups}
                news={news} />
            }>
          </Route>
          <Route path='list' element={<HouseList />}>
          </Route>
          <Route path='news' element={<News />}>
          </Route>
          <Route path='profile' element={<Profile />}>
          </Route>
        </Routes>
      </div>
      <div className={styles.bottom}>
        <Bottom
          pathname={pathname}
          setRouteActive={setRouteActive} />
      </div>
    </div>
  )
}

export default Home

