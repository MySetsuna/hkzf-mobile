import React, { useEffect, useState } from 'react'
import { TabBar, Badge } from 'antd-mobile'
import {
  useLocation,
  useNavigate,
} from 'react-router-dom'
import styles from './index.module.scss'
import './index.scss'
/** 引入路由缓存包装器 */
import RouterCache from '../../components/RouterCache'

/**引入自定义context */
import { CityInfo } from '../../context'
import axios from 'axios'
/**懒加载组件 */
const News = React.lazy(() => import('./../News'))
const HouseList = React.lazy(() => import('./../HouseList'))
const Index = React.lazy(() => import('./../Index'))
const Profile = React.lazy(() => import('./../Profile'))

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
  const [curCityInfo, setCurCityInfo] = useState({})
  /**获取 当前城市 */
  useEffect(() => {
    const getCityInfo = new window.BMapGL.LocalCity()
    getCityInfo.get(async info => {
      let cityName = info.name ? info.name.replace('市', '') : null
      if (cityName) {
        let res = await axios.get(`${process.env.REACT_APP_BACK_STAGE_URL}/area/info`, {
          params: {
            name: cityName
          }
        })
        setCurCityInfo(Object.assign(info, res.data.body))
      }
    })
  }, [])

  const components = {
    '/': <Index />,
    list: <HouseList />,
    news: <News />,
    profile: <Profile />,
  }
  /** route跳转设置 */
  const history = useNavigate()
  const location = useLocation()
  const pathname = location.pathname
  const setRouteActive = (value) => {
    history(value)
  }

  return (
    <CityInfo.Provider value={curCityInfo}>
      <div className={[styles.app, 'home'].join(' ')}>
        <div className={styles.body} >
          {/* 将display抽成组件 */}
          <RouterCache
            components={components}
            level={2}
            defaultPath={'/home'} />



          {/* 使用display: none 实现缓存页面实现 
        {
          paths.map((key, index) => loadedCompnents[key] &&
            <div key={`homecompnent${index}`} style={{ display: pathDisplays[key] }}>
              <React.Suspense fallback={<div>loading...</div>}>{components[key]}</React.Suspense>
            </div>)

        } */}
          {/* 未匹配则跳转到指定页面 */}
          {/* {
          noMatchPath &&
          <Routes>
            <Route path='*' element={<Navigate to='/home' />}></Route>
          </Routes>
        } */}

          {/* 以下为路由嵌套实现  */}
          {/* <Routes> */}
          {/* 如果未匹配，则自动跳转到首页 */}
          {/* <Route path='*' element={<Navigate to='/home'/>}></Route>
          <Route
            exact 
            path='/'
            element={
              <Index />
            }>
          </Route>
          <Route path='list' element={<HouseList />}>
          </Route>
          <Route path='news' element={<News />}>
          </Route>
          <Route path='profile' element={<Profile />}>
          </Route> */}
          {/* </Routes> */}
        </div>
        <div className={styles.bottom}>
          <Bottom
            pathname={pathname}
            setRouteActive={setRouteActive} />
        </div>
      </div>
    </CityInfo.Provider>
  )
}

export default Home

