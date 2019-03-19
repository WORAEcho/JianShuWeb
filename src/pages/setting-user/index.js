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
    }
}

const mapState = (state) => ({
})

const mapDispatch= (dispatch) => ({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
    }
})
export default connect(mapState,mapDispatch)(UserSetting);