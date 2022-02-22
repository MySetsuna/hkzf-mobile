import React from "react";
import BaiduMap from "../../components/BaiduMap";

const Map = () => {
  return (
    <div>
      <BaiduMap zoom={15} style={
        { height: '100vh' }
      } point={new window.BMapGL.Point(116.404449, 39.914889)} />
    </div>
  )
}

export default Map