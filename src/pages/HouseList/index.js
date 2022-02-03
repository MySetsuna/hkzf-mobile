import React from "react";

export default class HouseList extends React.Component{
    render(){
        return (
            <div>
                {this.props.children}
                列表找房
            </div>
        )
    }
}