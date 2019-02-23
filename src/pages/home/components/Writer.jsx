import React, { PureComponent } from 'react';
import { WritterWrapper } from './style';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from '../store'
import { SearchInfoTitle,SearchInfoSwitch } from '../../../common/header/style';
import { WriterItem,FollowButtom,WriterInfo,LoadAll } from './style';
import { withRouter,Link } from 'react-router-dom';
// import { set } from 'immutable';

class Writer extends PureComponent {

    state=({
        unfollowState: false
    })
    render(){
        const {handleChangePage,writerPageNum,writerList,userId,followedWriterList} =this.props;
            return (
                <WritterWrapper>
                    <CSSTransition
                        in={true}
                        timeout={400}
                        classNames="slide"
                    >
                        <SearchInfoTitle style={{margin: '0'}}>
                            <span style={{float: 'left'}}>推荐作者</span>
                            <SearchInfoSwitch onClick={()=>handleChangePage(userId,writerPageNum,this.spinIcon)} >
                                <i ref={(icon) =>{this.spinIcon =icon}} className="iconfont spin">&#xe851;</i>
                                换一批
                            </SearchInfoSwitch>
                        </SearchInfoTitle>
                    </CSSTransition>
                    {
                        writerList.map(item=>{
                            const writerId = item.get('id');
                            const unFollowed = followedWriterList.indexOf(writerId) === -1;
                            return (
                                <WriterItem key={writerId}>
                                    <WriterInfo>
                                        <Link to={'userHome/'+writerId}>
                                        <img className='avatar_img' src={item.get('avatarImg')} alt='加载失败'></img>
                                        </Link>
                                        <FollowButtom onClick={()=>this.changeFollow(userId,writerId,unFollowed)}
                                                    onMouseEnter={() => this.toggelUnfollowState(unFollowed,true)}
                                                    onMouseLeave={()=> this.toggelUnfollowState(unFollowed,false)}
                                        >
                                        <svg className={unFollowed ? 'icon unfollowed' : 'icon followed'} aria-hidden="true">
                                            <use xlinkHref={unFollowed ? '#icon-jiahao' : this.state.unfollowState ? '#icon-cha' : '#icon-gou'}></use>
                                        </svg>
                                        <span className={unFollowed ? 'span unfollowed' : 'span followed'}>
                                            {unFollowed ? '关注' : this.state.unfollowState ? '取消关注' : '已关注'}
                                        </span>
                                        </FollowButtom>
                                        <Link to={'userHome/'+writerId}><span className='writer_name'>{item.get('username')}</span></Link>
                                        <span className='writer_desc'>写了1523.3k字 · 30.8k喜欢</span>
                                    </WriterInfo>
                                </WriterItem>
                                )
                        })
                    }
                    <Link to={'all-writers'}><LoadAll>查看全部</LoadAll></Link>
                </WritterWrapper>
            )            
    }
    changeFollow(userId,writerId,unFollowed){
        const { loginStatus,follow,unfollow,history } = this.props
        if(loginStatus){
            if(unFollowed){
                follow(userId,writerId)
            }else{
                unfollow(userId,writerId)
        }}else{
            history.push('/login');
        }
    }
    toggelUnfollowState(unFollowed,unfollowState){
        if(!unFollowed){
            this.setState({
                unfollowState: unfollowState
            })
        }
    }
    componentDidMount(){
        this.props.handleChangePage(this.props.userId,1);
    }

}



const mapState = (state) =>({
    loginStatus: state.getIn(['login', 'login']),
    writerPageNum: state.getIn(['home','writerPageNum']),
    writerList: state.getIn(['home','writerList']),
    avatarImg: state.getIn(['home','avatarImg']),
    userId: state.getIn(['login','userId']),
    followedWriterList: state.getIn(['home','followedWriterList']),
})

const mapDispatch = (dispatch) =>({
    handleChangePage(userId,writerPageNum,spin){
        if(spin !== undefined){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if(originAngle){
                originAngle = parseInt(originAngle ,10);
            }else{
                originAngle = 0;
            }
            spin.style.transform = 'rotate('+(originAngle + 360)+'deg)'
        }
        dispatch(actionCreators.getWriters(userId,writerPageNum));
    },
    follow(userId,followUserId){
        dispatch(actionCreators.follow(userId,followUserId))
    },
    unfollow(userId,followUserId){
        dispatch(actionCreators.unfollow(userId,followUserId))
    }
})
export default connect(mapState,mapDispatch)(withRouter(Writer));