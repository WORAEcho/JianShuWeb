import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Topic from './components/Topic.jsx';
import { actionCreators } from './store';
import SettingLeft  from './components/SettingLeft.jsx'
import SettingRightBasic  from './components/SettingRightBasic.jsx'
import SettingRightProfile  from './components/SettingRightProfile.jsx'
import { 
    UserSettingWrapper,
 } from './components/style';
class UserSetting extends PureComponent {
    state={
        itemIndex: 1
    }
    render(){
        const itemIndex = this.state.itemIndex;
        return (
            <UserSettingWrapper>
                <SettingLeft switchItem={this.switchItem.bind(this)}></SettingLeft>
                {
                    itemIndex === 2 ? 
                    <SettingRightProfile></SettingRightProfile> :
                    itemIndex === 3 ?
                    <SettingRightProfile></SettingRightProfile> :
                    itemIndex === 4 ?
                    <SettingRightProfile></SettingRightProfile> :
                    itemIndex === 5 ?
                    <SettingRightProfile></SettingRightProfile> :
                    <SettingRightBasic></SettingRightBasic>
                }

            </UserSettingWrapper>
        )
    }
    switchItem(index){
        this.setState({
            itemIndex: index
        })
    }
    componentDidMount(){
        this.props.changeHomeData();
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
export default connect(mapState,mapDispatch)(UserSetting);