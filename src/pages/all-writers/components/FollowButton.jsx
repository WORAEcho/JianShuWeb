import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { actionCreators as homeActionCreators } from '../../home/store'
import { Followbutton } from './style';
 
class FollowButton extends PureComponent {
    state=({
        unfollowState: false
    })
    render(){
        const { writerId,followedWriterList,userId } = this.props;
        const unFollowed = followedWriterList.indexOf(writerId) === -1;
        return (
            <Followbutton className={unFollowed ? 'button-unfollowed' : 'button-followed'} 
                        onClick={()=>this.changeFollow(userId,writerId,unFollowed)}
                        onMouseEnter={() => this.toggelUnfollowState(unFollowed,true)}
                        onMouseLeave={()=> this.toggelUnfollowState(unFollowed,false)}>
                <svg className={unFollowed ? 'icon unfollowed' : 'icon followed'} aria-hidden="true" style={{margin: '0 5px 0 0'}}>
                    <use xlinkHref={unFollowed ? '#icon-jiahao-copy' : this.state.unfollowState ? '#icon-cha' : '#icon-gou'}></use>
                </svg>
                {unFollowed ? '关注' : this.state.unfollowState ? '取消关注' : '已关注'}
            </Followbutton>     
        )

    }

    changeFollow(userId,writerId,unFollowed){
        const { follow,unfollow,loginStatus,history } =this.props;
        if(loginStatus){
            //没有被关注，触发关注；关注了，触发取关
            if(unFollowed){
                follow(userId,writerId)
            }else{
                unfollow(userId,writerId)
            }
        }else{
            history.push('/login')
        }
    }
    toggelUnfollowState(unFollowed,unfollowState){
        //被关注后，才能触发取消关注
        if(!unFollowed){
            this.setState({
                unfollowState: unfollowState
            })
        }
    }
}


const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login']),
    userId: state.getIn(['login','userId']),
    followedWriterList: state.getIn(['home','followedWriterList']),
})

const mapDispatch= (dispatch) => ({
    getProfile(userId){
        dispatch(actionCreators.getProfile(userId))
    },
    follow(userId,followUserId){
        dispatch(homeActionCreators.follow(userId,followUserId))
    },
    unfollow(userId,followUserId){
        dispatch(homeActionCreators.unfollow(userId,followUserId))
    }
})
export default connect(mapState,mapDispatch)(withRouter(FollowButton));