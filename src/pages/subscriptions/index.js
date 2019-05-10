import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Topic from './components/Topic.jsx';
import { actionCreators } from './store';
import SubscriptionsList  from './components/SubscriptionsList.jsx'
import { 
    UserSettingWrapper,
 } from './components/style';
import HomeUserLeft from '../home-user/components/HomeUserLeft';
class Subscriptions extends PureComponent {
    state={
        type: 'timeline',
        id: ''
    }
    render(){
        // const itemIndex = this.state.itemIndex;
        return (
            <UserSettingWrapper>
                <SubscriptionsList switchType={this.switchType.bind(this)}></SubscriptionsList>
                {
                    this.state.type === 'timeline' ? <div>timeline</div> :
                    this.state.type === 'anthology' ? <div>anthology</div> :
                    this.state.type === 'user' ? <div style={{marginRight:'40px',float:'right'}}><HomeUserLeft subscriptionsUserId={this.state.id}></HomeUserLeft></div> : null
                }
            </UserSettingWrapper>
        )
    }
    switchType(type,id){
        this.setState({
            type: type,
            id: id
        })
    }
    componentDidMount(){
        const type =this.props.match.params.type;
        if(type==='timeline'){
        }else if(type==='anthology'){
            // const id =this.props.match.params.id;
        }else if(type==='user'){
            // const id =this.props.match.params.id;
        }
    }
}

const mapState = (state) => ({
})

const mapDispatch= (dispatch) => ({
    changeHomeData(){
        dispatch(actionCreators.getHomeInfo());
    }
})
export default connect(mapState,mapDispatch)(Subscriptions);