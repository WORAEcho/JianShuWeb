import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RightContent,NotFoundResourse } from './style';
import { withRouter,Link } from 'react-router-dom';
import { ListItem,ListInfo } from '../../home/components/style';
import { getUrlParam } from '../../../common/function/commonFunction.js'
import { actionCreators } from '../store'
import { Avatar } from '../../all-writers/components/style';
import FollowButton from '../../all-writers/components/FollowButton.jsx';
import PageHelper from '../../../common/pageHelper/PageHelper.jsx';
import './UserList.css';

class UserList extends PureComponent {
    state=({
        orderType:'normal',
        initActivePageFlag: false
    })
    render(){
        const { list,totalPage,userTotalNum } = this.props
        return (
                <RightContent>
                    <div style={{paddingBottom: '10px'}}>
                        <span className='orderItem' onClick={()=>this.changeOrderType('normal')}>综合排序 · </span>
                        <span className='orderItem' onClick={()=>this.changeOrderType('follwedNum')}>最受欢迎 · </span>
                        <span className='orderItem' onClick={()=>this.changeOrderType('articleNum')}>最多创作</span>
                        <span className='totalCount'>{userTotalNum} 个结果</span>
                    </div>
                    {
                        list.size === 0 ? 
                        <NotFoundResourse>
                        <img className='not-found-img'  
                             src='http://jianshu-pic.oss-cn-qingdao.aliyuncs.com/static/noResourse.png' 
                             alt=''></img>
                        <div className='not-found-hint'>未找到相关内容</div>
                        </NotFoundResourse> 
                        : null
                    }
                    {
                        list.map((item)=>{
                            const userId = item.get('id')
                            return (
                                <ListItem  key={userId}>
                                <ListInfo id='search-userlist-listInfo'>
                                <Link to={'userhome/'+userId}>
                                    <Avatar id='search-userlist-avatar' src={item.get('avatar_img')}></Avatar>
                                </Link>
                                <div id='search-userlist-info'>
                                <Link to={'userhome/'+userId}>
                                    <span id='search-userlist-username'>{item.get('nickname')}</span>
                                </Link>
                                <div>
                                    <span className='search-userlist-meta'>关注 {item.get('followNum')}</span>
                                    <span className='search-userlist-meta'>粉丝 {item.get('followedNum')}</span>
                                    <span className='search-userlist-meta'>文章 {item.get('articleNum')}</span>
                                </div>
                                <div>
                                    <span className='search-userlist-meta'>写了 {item.get('wordNum')} 字，获得了 {item.get('likeNum')} 个喜欢。</span>
                                </div>
                                </div>
                                <FollowButton writerId={userId}></FollowButton>
                                </ListInfo>
                                </ListItem>
                            );
                        })
                    }

                    <div style={{textAlign:'center',margin:'30px auto'}}> 
                    {
                        totalPage <= 1 ? null :
                        <PageHelper pageTotal={totalPage}
                                    initActivePageFlag={this.state.initActivePageFlag}
                                    getInfo={(pageNum)=>this.props.getUserList(getUrlParam('fuzzyKey'),this.state.orderType,pageNum)}
                        ></PageHelper>
                    }
                    </div>
                </RightContent>
        )
    }
    changeOrderType(orderType){
        this.setState({
            orderType:orderType,
            initActivePageFlag: true
        })

    }
    componentDidMount(){
        let fuzzyKey = getUrlParam('fuzzyKey');
        let pageNum = getUrlParam('pageNum');
        this.props.getUserList(fuzzyKey,this.state.orderType,pageNum);
    }
    componentDidUpdate(prevprops,prevState) {
        const {orderType} = this.state
        if (orderType !== prevState.orderType) {
            let fuzzyKey = getUrlParam('fuzzyKey');
            let pageNum = getUrlParam('pageNum');
            this.props.getUserList(fuzzyKey,orderType,pageNum);
        }
      }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['search','userList']),
        totalPage: state.getIn(['search','userTotalPage']),
        login: state.getIn(['login','login']),
        userId: state.getIn(['login','userId']),
        userTotalNum: state.getIn(['search','userTotalNum']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList(fuzzyKey,orderType,pageNum){
            dispatch(actionCreators.getUserList(fuzzyKey,orderType,pageNum));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserList));