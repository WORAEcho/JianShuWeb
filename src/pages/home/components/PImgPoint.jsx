import React, { Component } from 'react';

class PImgPoint extends Component {
    handlePoint = () => {
        if (this.props.onPoint) {
            this.props.onPoint(this.props.id);
        }
    }
    reStart = () => {
        if (this.props.start) {
            this.props.start();
        }
    }
    render() {
        let style = {display : 'inline'};
        return (
            <div style={style}> 
            <span 
                id = {this.props.id}
                className = 'point'
                style = {this.props.style}
                onMouseOver = {this.handlePoint}
                onMouseOut = {this.reStart} 
            > ● 
            </span>
            </div> 
        )
    }
}

export default PImgPoint;