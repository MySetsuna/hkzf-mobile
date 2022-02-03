import React from "react";

export default class News extends React.Component{
    render(){
        return (
            <div>
                {this.props.children}
                新闻资讯
            </div>
        )
    }
}