import React from 'react'
import Home from './pages/Home'

/** 引入路由缓存包装器 */
import RouterCache from './components/RouterCache'

/**异步加载地图 */

import { MapApiLoaderHOC } from 'react-bmapgl/Map'

/**懒加载组件 */
const CityList = React.lazy(() => import('./pages/CityList'))
const Map = React.lazy(() => import('./pages/Map'))




function App() {
  const components = {
    home: <Home />,
    citylist: <CityList />,
    map: <Map />
  }
  console.log(process.env)
  return (
      <RouterCache
        components={components}
        level={1}
        defaultPath={'/home'} />
  );
}

export default MapApiLoaderHOC({ ak: process.env.REACT_APP_MAP_AK })(App);
