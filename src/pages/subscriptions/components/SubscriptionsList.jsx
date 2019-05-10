import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from '../store';
import { 
    SettingLeftContainer,
    SettingItemUl,
    SettingItemLi,
 } from './style';
import { Avatar } from '../../../common/header/style';
 
class SubscriptionsList extends PureComponent {
    state = ({
        selected: -1
    })
    render(){
        const { subscriptionsList } = this.props 
        const nicknameStyle= {fontSize:'14px',paddingLeft:'10px',color: '#333'}
        const unreadStyle = {fontSize:'14px',paddingRight:'10px',float:'right',color: '#969696'}
        return (
            <SettingLeftContainer>
                <SettingItemUl>
                    <div style={{padding:'10px 0 10px 15px',color:'#333',fontSize:'15px'}}>全部关注</div>
                    <Link key={undefined} to={'/subscriptions/user/'+undefined} style={{textDecoration:'none'}}>
                        <SettingItemLi className={this.state.selected === -1 ? 'selected' : null} onClick={()=>this.switchType('user',undefined)} style={{height:'60px',borderTop: '1px solid #f0f0f0'}}>
                            <div className='itemDiv'>  
                                <Avatar style={{margin:'0'}} src='https://cdn2.jianshu.io/assets/web/jianyouquan-2fb0cd72e35147c79d6507c3a3a2591b.png'></Avatar>
                                <span style={nicknameStyle}>全部动态</span>
                                <span style={unreadStyle}>999</span>
                            </div>
                        </SettingItemLi>
                    </Link>
                    {
                        subscriptionsList.map((item)=>{
                            return (
                                <Link key={item.user_id} to={'/subscriptions/user/'+item.user_id} style={{textDecoration:'none'}}>
                                    <SettingItemLi className={this.state.selected === item.user_id ? 'selected' : null} onClick={()=>this.switchType('user',item.user_id)} style={{height:'60px'}}>
                                        <div className='itemDiv'>  
                                            <Avatar style={{margin:'0'}} src={item.avatar_img}></Avatar>
                                            <span style={nicknameStyle}>{item.nickname}</span>
                                            {
                                                item.unread_count === 0 ? null :
                                                <span style={unreadStyle}>{item.unread_count}</span>
                                            }
                                        </div>
                                    </SettingItemLi>
                                </Link>
                            )
                        })
                    }
                </SettingItemUl>
            </SettingLeftContainer>
        )
    }
    switchType(type,id){
        this.props.switchType(type,id)
        this.selectedType(id)
    }
    selectedType(id){
        this.setState({
            selected: id
        })
    }
    componentDidMount(){
        const { userId } = this.props 
        if(userId !== undefined && userId !== null && userId !== ''){
            this.props.getSubscriptionsList(userId)
        }
    }
}

const mapState = (state) => ({
    userId: state.getIn(['login', 'userId']),
    subscriptionsList: state.getIn(['subscriptions', 'subscriptionsList'])
})

const mapDispatch = (dispatch) => {
    return {
        getSubscriptionsList(id){
            dispatch(actionCreators.getSubscriptionsList(id))
        }
    }
}

export default connect(mapState,mapDispatch)(SubscriptionsList);
