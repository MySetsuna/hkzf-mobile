import React from 'react'
import {
  useNavigate,
} from 'react-router-dom';

//import PropTypes from 'prop-types'

// 导入样式
import './index.scss'

const SearchHeader = (props)=> {
  let cityName = props.cityName;
  const history = useNavigate()
  const setRouteActive = (value) => {
    history(value)
  }
  return (
    <div className='search-box'>
      {/* 左侧白色区域 */}
      <div className='search'>
        {/* 位置 */}
        <div className='location' onClick={() => setRouteActive('/citylist')}>
          <span className='name'>{cityName}</span>
          <i className='iconfont icon-arrow' />
        </div>

        {/* 搜索表单 */}
        <div className='form' onClick={() => setRouteActive('/search')}>
          <i className='iconfont icon-seach' />
          <span className='text'>请输入小区或地址</span>
        </div>
      </div>
      {/* 右侧地图图标 */}
      <i className='iconfont icon-map' onClick={() => setRouteActive('/map')} />
    </div>
  )
}

// // 添加属性校验
// SearchHeader.propTypes = {
//   cityName: PropTypes.string.isRequired,
//   className: PropTypes.string
// }

export default SearchHeader
