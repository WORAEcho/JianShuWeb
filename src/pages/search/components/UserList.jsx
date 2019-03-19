import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RightContent } from './style';
import { withRouter,Link } from 'react-router-dom';
import { ListItem,ListInfo } from '../../home/components/style';
import { getUrlParam } from '../../../common/function/commonFunction.js'
import { actionCreators } from '../store'
import { Avatar } from '../../all-writers/components/style';
import FollowButton from '../../all-writers/components/FollowButton.jsx';
import './UserList.css';

class UserList extends PureComponent {

    render(){
        const { list } = this.props
        return (
                <RightContent>
                    <div style={{paddingBottom: '10px'}}>
                        <span className='orderItem'>综合排序 · </span>
                        <span className='orderItem'>注册时间 · </span>
                        <span className='orderItem'>性别</span>
                        <span className='totalCount'>1269 个结果</span>
                    </div>
                    
                {
                    list.map((item)=>{
                        return (
                            <ListItem  key={item.get('id')}>
                            <ListInfo id='search-userlist-listInfo'>
                            <Link to={'userHome/'+item.get('id')}>
                                <Avatar id='search-userlist-avatar' src={item.get('avatar_img')}></Avatar>
                            </Link>
                            <div id='search-userlist-info'>
                            <Link to={'userHome/'+item.get('id')}>
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
                            <FollowButton></FollowButton>
                            </ListInfo>
                            </ListItem>
                        );
                    })
                }

                {/* {
                    articlePageCount >= articlePageNum ?
                    <LoadMore onClick={()=>getMoreList(articlePageNum,articlePageCount)}>阅读更多</LoadMore> :
                    <NoMore>已经到底啦！</NoMore>
                } */}


                </RightContent>
        )
    }

    componentDidMount(){
        let fuzzyKey = getUrlParam('fuzzyKey');
        let pageNum = getUrlParam('pageNum');
        this.props.getUserList(fuzzyKey,pageNum);
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['search','userList']),
        totalPage: state.getIn(['search','totalPage']),
        login: state.getIn(['login','login']),
        userId: state.getIn(['login','userId'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserList(fuzzyKey,pageNum){
            dispatch(actionCreators.getUserList(fuzzyKey,pageNum));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(UserList));