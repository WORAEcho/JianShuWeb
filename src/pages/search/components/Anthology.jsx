import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RightContent } from './style';
import { withRouter,Link } from 'react-router-dom';
import { ListItem,ListInfo } from '../../home/components/style';
import { getUrlParam } from '../../../common/function/commonFunction.js'
import { actionCreators } from '../store'
import { Avatar } from '../../all-writers/components/style';
import FollowButton from '../../all-writers/components/FollowButton.jsx';
import './Anthology.css';

class Anthology extends PureComponent {

    render(){
        const { list,totalPage } = this.props
        return (
                <RightContent>
                    <div style={{paddingBottom: '10px'}}>
                        <span className='orderItem'>综合排序 · </span>
                        <span className='orderItem'>热门专题 · </span>
                        <span className='orderItem'>最近更新</span>
                        <span className='totalCount'>{totalPage} 个结果</span>
                    </div>
                {
                    list.map((item)=>{
                        return (
                            <ListItem  key={item.get('id')}>
                            <ListInfo id='search-userlist-listInfo'>
                            <Link to={'userhome/'+item.get('id')}>
                                <Avatar id='search-anthologylist-avatar' src={item.get('anthologyAvatar')}></Avatar>
                            </Link>
                            <div id='search-anthologylist-info'>
                            <Link to={'userhome/'+item.get('id')}>
                                <span id='search-userlist-username'>{item.get('anthologyName')}</span>
                            </Link>
                            {/* <div>
                                <span className='search-userlist-meta'>关注 {item.get('followNum')}</span>
                                <span className='search-userlist-meta'>粉丝 {item.get('followedNum')}</span>
                                <span className='search-userlist-meta'>文章 {item.get('articleNum')}</span>
                            </div>
                            <div>
                                <span className='search-userlist-meta'>写了 {item.get('wordNum')} 字，获得了 {item.get('likeNum')} 个喜欢。</span>
                            </div> */}
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
        this.props.getAnthologyList(fuzzyKey,pageNum);
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['search','anthologyList']),
        totalPage: state.getIn(['search','anthologyTotalPage']),
        login: state.getIn(['login','login']),
        userId: state.getIn(['login','userId'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAnthologyList(fuzzyKey,pageNum){
            dispatch(actionCreators.getAnthologyList(fuzzyKey,pageNum));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Anthology));