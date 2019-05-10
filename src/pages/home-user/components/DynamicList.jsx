import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore,NoMore } from '../../home/components/style';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Link } from 'react-router-dom';
// import moment from 'moment';
import DynamicHeader from './DynamicHeader.jsx';
import AuthorCard from '../../detail/components/AuthorCard';

class DynamicList extends PureComponent {
    render(){
        const { dynamicList,pageSum,pageNum,writerId,avatarImg,nickname } =this.props;
        return (
            <div>
                {
                    dynamicList.map((item)=>{
                        const type = item.get('action_type');
                        switch(type){
                            case 1:
                                const article = item.get('article');
                                const content = article.get('pure_content')+"";
                                return (
                                    <div key={item.get('id')}>
                                        <ListItem>
                                        <ListInfo>
                                            <DynamicHeader avatarImg={avatarImg} 
                                                            nickname={nickname} 
                                                            DynamicInfo='发表了文章' 
                                                            DynamicTime={item.get('action_time')}>
                                            </DynamicHeader>
                                            <Link style={{textDecoration: 'none'}} to={'/detail/' + article.get('id')}>

                                            <h3 className='title'>{article.get('title')}</h3>
                                            <p className='desc' 
                                            dangerouslySetInnerHTML = 
                                            {{__html: content.length <= 60 ? content : content.substr(0,60)+'...'}}>
                                            </p>
                                            <svg className='article-bottom icon' aria-hidden="true">
                                                <use xlinkHref="#icon-pinglun2"></use>
                                            </svg>
                                            <span className='article-bottom'>{article.get('comment_count') === undefined ? 0 : article.get('comment_count')}</span>
                                            <svg className='article-bottom icon' aria-hidden="true">
                                                <use xlinkHref="#icon-aixin"></use>
                                            </svg>
                                            <span className='article-bottom'>{article.get('like_count') === undefined ? 0 : article.get('like_count')}</span>
                                            </Link>
                                        </ListInfo>
                                        {
                                            item.get('cover_img') === undefined ? null :
                                            <img alt='' className='list-pic' src={article.get('cover_img')} />
                                        }
                                        </ListItem>
                                </div>
                                )
                            case 2:
                                const article2 = item.get('article');
                                const writer2 = item.get('writer');
                                const comment2 = item.get('comment');
                                const content2 = article2.get('pure_content')+"";
                                return (
                                    <div key={item.get('id')}>
                                        <ListItem>
                                        <ListInfo style={{width:'100%'}}>
                                            <DynamicHeader avatarImg={avatarImg} 
                                                            nickname={nickname} 
                                                            DynamicInfo='发表了评论' 
                                                            DynamicTime={item.get('action_time')}>
                                            </DynamicHeader>
                                            <Link style={{textDecoration: 'none'}} to={'/detail/' + article2.get('id')}>
                                            <div style={{margin: '0 0 15px 0'}}>
                                                <span style={{fontSize:'15px',color:'#333'}}>{comment2.get('content')}</span>
                                            </div>
                                            <div style={{borderLeft:'3px solid #d9d9d9',paddingLeft:'20px'}}>
                                                <h3 className='title' style={{color:'#969696'}}>{article2.get('title')}</h3>
                                                <p className='desc' 
                                                dangerouslySetInnerHTML = 
                                                {{__html: content2.length <= 60 ? content2 : content2.substr(0,60)+'...'}}>
                                                </p>
                                                <span className='desc' style={{paddingRight:'10px'}}>{writer2.get('nickname')}</span>
                                                <svg className='article-bottom icon' aria-hidden="true">
                                                    <use xlinkHref="#icon-pinglun2"></use>
                                                </svg>
                                                <span className='article-bottom'>{article2.get('comment_count') === undefined ? 0 : article2.get('comment_count')}</span>
                                                <svg className='article-bottom icon' aria-hidden="true">
                                                    <use xlinkHref="#icon-aixin"></use>
                                                </svg>
                                                <span className='article-bottom'>{article2.get('like_count') === undefined ? 0 : article2.get('like_count')}</span>
                                            </div>
                                            </Link>
                                        </ListInfo>
                                        </ListItem>
                                </div>
                                )
                        case 3:
                            const user3 = item.get('user');
                            const comment3 = item.get('comment');
                            const article3 = item.get('article')
                            return (
                                <div key={item.get('id')}>
                                    <ListItem>
                                    <ListInfo style={{width:'100%'}}>
                                        <DynamicHeader  avatarImg={avatarImg} 
                                                        nickname={nickname} 
                                                        DynamicInfo='点赞了评论' 
                                                        DynamicTime={item.get('action_time')}>
                                        </DynamicHeader>
                                        <div style={{margin: '0 0 15px 0'}}>
                                            <span style={{fontSize:'15px',color:'#333'}}>{comment3.get('content')}</span>
                                        </div>
                                        <div style={{padding:'10px 0 10px 20px',borderLeft:'3px solid #d9d9d9',fontSize:'12px'}}>
                                            <Link style={{textDecoration: 'none'}} to={'/userhome/'+user3.get('userId')}>
                                            <span style={{paddingRight:'10px',color: '#2f2f2f'}}>{user3.get('nickname')}</span>
                                            </Link>
                                            <span style={{color: '#969696'}}>评论自</span>
                                            <Link style={{textDecoration: 'none'}} to={'/detail/' + article3.get('id')}>
                                            <span style={{color: '#2f2f2f'}}>{article3.get('title')}</span>
                                            </Link>
                                        </div>
                                    </ListInfo>
                                    </ListItem>
                            </div>
                            )
                        case 4:
                            const article4 = item.get('article');
                            const writer4 = item.get('writer');
                            const content4 = article4.get('pure_content')+"";
                            return (
                                <div key={item.get('id')}>
                                    <ListItem>
                                    <ListInfo>
                                        <DynamicHeader avatarImg={avatarImg} 
                                                        nickname={nickname} 
                                                        DynamicInfo='喜欢了文章' 
                                                        DynamicTime={item.get('action_time')}>
                                        </DynamicHeader>
                                        <Link style={{textDecoration: 'none'}} to={'/detail/' + article4.get('id')}>

                                        <h3 className='title'>{article4.get('title')}</h3>
                                        <p className='desc' 
                                        dangerouslySetInnerHTML = 
                                        {{__html: content4.length <= 60 ? content4 : content4.substr(0,60)+'...'}}>
                                        </p>
                                        <span className='desc' style={{paddingRight:'10px'}}>{writer4.get('nickname')}</span>
                                        <svg className='article-bottom icon' aria-hidden="true">
                                            <use xlinkHref="#icon-pinglun2"></use>
                                        </svg>
                                        <span className='article-bottom'>{article4.get('comment_count') === undefined ? 0 : article4.get('comment_count')}</span>
                                        <svg className='article-bottom icon' aria-hidden="true">
                                            <use xlinkHref="#icon-aixin"></use>
                                        </svg>
                                        <span className='article-bottom'>{article4.get('like_count') === undefined ? 0 : article4.get('like_count')}</span>
                                        </Link>
                                    </ListInfo>
                                    {
                                        item.get('cover_img') === undefined ? null :
                                        <img alt='' className='list-pic' src={article4.get('cover_img')} />
                                    }
                                    </ListItem>
                            </div>
                            )
                        case 5:
                            const user = item.get('user');
                            const profile = user.get('profile')
                            return (
                                <ListItem key={item.get('id')}>
                                    <ListInfo style={{width:'100%'}}>
                                        <DynamicHeader avatarImg={avatarImg} 
                                                        nickname={nickname} 
                                                        DynamicInfo='关注了用户' 
                                                        DynamicTime={item.get('action_time')}>
                                        </DynamicHeader>
                                        <div style={{margin:'5px 0 10px 0'}}>
                                            <AuthorCard userId={profile.get('userId')}
                                                        avatarImg={profile.get('avatarImg')}
                                                        nickname={profile.get('nickname')}
                                                        gender={profile.get('gender')}
                                                        profile={profile.get('profile')}
                                                        totalWordCount={user.get('totalWordCount')}
                                                        fansNum={user.get('fansNum')}
                                                        totalLikeCount={user.get('totalLikeCount')}
                                            ></AuthorCard>
                                        </div>
                                    </ListInfo>
                                </ListItem>
                            )
                        default: return null
                        } 
                            
                        }

                    )
                }
                {   dynamicList.size === 0 ? 
                    <NoMore>该用户暂无动态。</NoMore> :
                    pageSum >= pageNum ?
                    <LoadMore onClick={()=>this.getMoreArticleList(writerId,pageNum,10)}>浏览更多</LoadMore> :
                    <NoMore>已经到底啦！</NoMore>
                }

            </div>
        )
    }

    componentDidMount(){
        const {writerId,getUserAction} = this.props
        getUserAction(writerId,1,10)
    }
}

const mapState = (state) =>({
    userId: state.getIn(['login','userId']),
    writerId: state.getIn(['userHome','writerId']),
    nickname: state.getIn(['userHome','nickname']),
    avatarImg: state.getIn(['userHome','avatarImg']),
    dynamicList: state.getIn(['userHome','dynamicList']),
})

const mapDispatch = (dispatch) =>({
    getUserAction(writerId,pageNum,pageSize){
        dispatch(actionCreators.getUserAction(writerId,pageNum,pageSize));
    }
})

export default connect(mapState,mapDispatch)(DynamicList);