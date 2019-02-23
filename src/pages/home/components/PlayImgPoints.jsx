import React, { Component } from 'react';
import PImgPoint from './PImgPoint.jsx';

class PlayImgPoints extends Component {
    createLi = () => {
        let array = [];
        for (let i = 0; i < 4; i++) {
            if (i === this.props.num) {
                let style = {color: 'rgb(255,255,255)'};
                array.push( <PImgPoint key = {i} style = {style} id = {i} onPoint = {this.props.onPoint} start = {this.props.start}/>);
                }else{
                    let style = {color:'rgba(120, 120, 120, 0.4)'}
                    array.push(<PImgPoint key = {i} style = {style} id = {i} onPoint = {this.props.onPoint} start = {this.props.start}/> );
                }
        }
        return array;
    }
    render() {return (<div className = 'points' > {this.createLi()} </div>)}}
            
export default PlayImgPoints;