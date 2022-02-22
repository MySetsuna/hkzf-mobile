import React from 'react'
import {
  Route,
  Routes,
  Navigate,
  useLocation
} from "react-router-dom";
/**记录已经加载的 路由页面 */
const loadedCompnents = {}
/**路由缓存本体 */
/**
 * 
 * @param {Object} components 所要缓存的路由path和组件的键值对象
 * @param {Number} level 为路由嵌套等级
 * @param {String} defaultPath 未匹配时的默认重定向路由
 * @returns 
 */
const RouterCache = ({ components, level = 1, defaultPath }) => {
  /**初始化路径信息 */
  const paths = Object.keys(components)
  defaultPath = defaultPath ? defaultPath : paths[0]

  /**从router 获取location信息，因此该组件必须属于Router包裹的后代组件 */
  let location = useLocation();
  const pathname = location.pathname

  /**初始化css属性 */
  const pathDisplays = {}
  paths.forEach((path) => { pathDisplays[path] = 'none' })

  /**初始化所需参数 */
  let noMatchPath = null
  let path = null
  let endPath = pathname.split('/')
  if (endPath.length > level) {
    path = endPath[level]
  } else if (pathname === '/') {
    path = 'root'
  }

  /**判读是否匹配当前等级的路由（顶层routes为1，其嵌套路由为2，类推） */
  if (paths.indexOf(path) === -1) {
    noMatchPath = path
    pathDisplays[paths[0]] = undefined
    loadedCompnents[paths[0]] = true
  } else {
    pathDisplays[path] = undefined
    loadedCompnents[path] = true
  }
  return (
    <div>
      {
        noMatchPath &&
        <Routes>
          {/* 如果没有匹配到，则跳转到登录页面（待实现） */}
          <Route exact path='*' element={<Navigate to={defaultPath} />}></Route>
        </Routes>
      }
      {
        paths.map((key, index) => loadedCompnents[key] &&
          <div key={`${key}${index}`} style={{ display: pathDisplays[key] }}>
            <React.Suspense fallback={<div></div>}>{components[key]}</React.Suspense>
          </div>)

      }
    </div>
  )
}

export default RouterCache