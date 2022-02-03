import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import CityList from './pages/CityList'
function App() {
  return (
    <Router initialEntries={'/home/list'}>
      <div >

        {/**配置导航菜单 */}

        {/**配置项目路由 */}
        <Routes>
          <Route exact path='/' element={<Navigate to='/home'/>}></Route>
          <Route exact path='/home/*' element={<Home />}></Route>
          {/** 如果不要求重定向跳转，默认/ 显示首页，可以使用index属性
           * -<Route index element={<Home/>}></Route>*/}
          <Route path='/citylist' element={<CityList />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
