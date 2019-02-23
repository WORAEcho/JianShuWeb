import React, { Component } from 'react';

class PlayImgBut extends Component {
    handleSubmit = () => {
        if (this.props.onSubmit) {
            if (this.props.value === '>') {
                this.props.onSubmit(1);
            } else {
                this.props.onSubmit(0)
            }
        }
    }
    render() {
        return (
            <div> 
                <div id = {this.props.id} onClick = {this.handleSubmit}>
                    <svg className="icon" aria-hidden="true">
                            <use xlinkHref={this.props.value === '>' ? "#icon-jiantouyou-copy" : "#icon-jiantouzuo-copy"}></use>
                    </svg>
                </div>
            </div>
            )
    }
}
export default PlayImgBut

