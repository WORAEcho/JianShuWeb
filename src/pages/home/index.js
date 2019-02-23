import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Topic from './components/Topic.jsx';
import List from './components/List.jsx';
import Recommend from './components/Recommend.jsx';
import Writer from './components/Writer.jsx';
import { actionCreators } from './store';
import PlayImgApp from './components/PlayImgApp.jsx'
import { 
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop
 } from './components/style';
 import './components/PlayImage.css'
 
class Home extends PureComponent {

    handleScrollTop(){
        window.scrollTo(0, 0);
    }

    render(){
        return (
            <HomeWrapper>
                <HomeLeft>
                    <PlayImgApp></PlayImgApp>
                    {/* <Topic /> */}
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                { this.props.showScroll ?
                <BackTop onClick={this.handleScrollTop}>
                    回到顶部
                </BackTop>:null
                }
            </HomeWrapper>
        )
    }

    componentDidMount(){
        this.props.changeHomeData(this.props.userId);
        this.bandEvents();
    }
    
    componentWillUnmount(){
        window.removeEventListener('scroll',this.props.changeScrollTopShow)
    }

    bandEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopShow)
    }
}

const mapState = (state) => ({
    userId: state.getIn(['login','userId']),
    showScroll: state.getIn(['home', 'showScroll'])
})

const mapDispatch= (dispatch) => ({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
    },
    changeScrollTopShow(){
        if(document.documentElement.scrollTop > 400) {
            dispatch(actionCreators.toggleTopShow(true));
        }else{
            dispatch(actionCreators.toggleTopShow(false));
        }
    }
})
export default connect(mapState,mapDispatch)(Home);