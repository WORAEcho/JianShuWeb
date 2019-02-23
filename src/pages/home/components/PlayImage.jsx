import React, {Component} from 'react';
import image1 from '../../../statics/008.jpg';
import image2 from '../../../statics/009.jpg';
import image3 from '../../../statics/aaa.jpg';
import image4 from '../../../statics/dd.jpg';

import { CSSTransition } from 'react-transition-group'
class PlayImage extends Component {
    render() {
        let images = [image1, image2, image3, image4]
        return (
            <CSSTransition
                in={true}
                timeout={600}
                classNames="slide"
            >
            <div id = 'graphContainer' style={{left: -this.props.num*625}}>
                <img className = 'graph 0' src = {images[0]} alt='图片加载失败'/>
                <img className = 'graph 1' src = {images[1]} alt='图片加载失败'/>
                <img className = 'graph 2' src = {images[2]} alt='图片加载失败'/>
                <img className = 'graph 3' src = {images[3]} alt='图片加载失败'/>
            </div>
            </CSSTransition>
        )    
        }
}
export default PlayImage;