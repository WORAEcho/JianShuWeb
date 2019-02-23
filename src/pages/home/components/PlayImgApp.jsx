import React, { Component } from 'react'
import PlayImgBut from './PlayImgbut.jsx'
import PlayImage from './PlayImage.jsx'
import PlayPoints from './PlayImgPoints.jsx'

class PlayImgApp extends Component {
    constructor() {
        super();
        this.state = {
            nowImgNumber: 0,
            playTime: 4000,
            showNextButom: false
        }
    }
    componentDidMount() {
        this.change = setInterval(() => this.changeNum(), this.state.playTime);
    }

    changeNum() {
        if (this.state.nowImgNumber === 3) {
            this.setState({
                nowImgNumber: 0,
            })
        } else {
            this.setState({
                nowImgNumber: this.state.nowImgNumber + 1,
            })
        }
    }
    handleSubmit = (flag) => {
        clearInterval(this.change);
        if (flag === 1) {
            if (this.state.nowImgNumber === 3) {
                this.setState({
                    nowImgNumber: 0
                })
            } else {
                this.setState({
                    nowImgNumber: this.state.nowImgNumber + 1
                })
            }
        } else {
            if (this.state.nowImgNumber === 0) {
                this.setState({
                    nowImgNumber: 3
                })
            } else {
                this.setState({
                    nowImgNumber: this.state.nowImgNumber - 1
                })
            }
        }
        this.change = setInterval(() => this.changeNum(), this.state.playTime);
    }
    handlePoint = (idNum) => {
        clearInterval(this.change);
        this.setState({
            nowImgNumber: idNum
        })
    }
    handlePointStart = () => {
        this.change = setInterval(() => this.changeNum(), this.state.playTime);
    }
    showNextBut = () => {
        this.setState({
            showNextButom: true
        }) 
    }
    hiddenNextBut = () => {
        this.setState({
            showNextButom: false
        }) 
    }
    componentWillUnmount() {
        clearInterval(this.change);
    }

    render() {
        return ( 
                <div onMouseEnter={this.showNextBut} onMouseLeave={this.hiddenNextBut} id = 'ImgApp'> 
                    <PlayImage  num = {this.state.nowImgNumber}/>
                    {
                        this.state.showNextButom ? (<div>
                        <PlayImgBut id='leftB' value='<' onSubmit={this.handleSubmit}/>
                        <PlayImgBut id='rightB' value='>' onSubmit={this.handleSubmit}/></div> )
                        : null
                    }
                    <PlayPoints num={this.state.nowImgNumber} onPoint={this.handlePoint} start={this.handlePointStart}/>
                </div >
                )
    }
}
export default PlayImgApp;