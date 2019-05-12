import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { HomeLeft } from '../../home/components/style';
import FollowButton from '../../all-writers/components/FollowButton.jsx';
import { Followbutton } from '../../all-writers/components/style';
import { 
    Head,Avatar,UserName,Block,Num,TriggerMenuContainer,TriggerMenu,BlockWrapper
 } from './style';
import ArticleList from './ArticleList';
import DynamicList from './DynamicList.jsx';

class HomeUserLeft extends PureComponent {
    // gender,profile,website,email,qdcodeImg,
    state=({
        menu:'article' 
    })
    render(){
        const { userId,writerId,followedNum,fansNum,articleNum,likeNum,wordCount,nickname,gender,avatarImg } = this.props;
        return (
            <HomeLeft>
                <Head>
                    <Avatar>                                
                        <img className='avatar-img' style={{width: '78px',height: '78px'}} src={avatarImg} alt='fail'></img>
                    </Avatar>
                    <UserName>
                    {nickname}
                    <svg className='icon' aria-hidden="true">
                        <use xlinkHref={ gender === 1 ? "#icon-nan" : "#icon-nv"}></use>
                    </svg>
                    </UserName>
                    <div style={{float: 'right',paddingRight: '50px'}}>
                    {
                        userId === writerId ? null :
                        <FollowButton id='button-follow' writerId={writerId}>                                    
                        </FollowButton>
                    }
                    </div>
                    <BlockWrapper>
                        <Block><Num>{followedNum}</Num>关注
                        <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-arrow-right"></use>
                        </svg>
                        </Block>
                        <Block><Num>{fansNum}</Num>粉丝
                        <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-arrow-right"></use>
                        </svg>
                        </Block>
                        <Block><Num>{articleNum}</Num>文章
                        <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-arrow-right"></use>
                        </svg>
                        </Block>
                        <Block><Num>{wordCount}</Num>字数</Block>
                        <Block id='user-home-block5'><Num>{likeNum}</Num>收获喜欢</Block>
                    </BlockWrapper>

                </Head>
                <TriggerMenuContainer>
                    <TriggerMenu 
                        className={this.state.menu === 'article' ? 'active':'sleep'}
                        onClick={()=>this.toggleMenu('article')}
                    >
                        <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-wenzhang1"></use>
                        </svg>
                        <span>文章</span>
                    </TriggerMenu>
                    <TriggerMenu 
                        className={this.state.menu === 'dynamic' ? 'active':'sleep'}
                        onClick={()=>this.toggleMenu('dynamic')}
                    >
                        <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-dongtai1"></use>
                        </svg>
                        <span>动态</span>
                    </TriggerMenu>
                    <TriggerMenu
                        className={this.state.menu === 'comments' ? 'active':'sleep'}
                        onClick={()=>this.toggleMenu('comments')}
                    >
                        <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-pinglun"></use>
                        </svg>
                        <span>最新评论</span>
                    </TriggerMenu>
                    <TriggerMenu 
                        className={this.state.menu === 'hot' ? 'active':'sleep'}
                        onClick={()=>this.toggleMenu('hot')}
                    >
                        <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-remen"></use>
                        </svg>
                        <span>热门</span>
                    </TriggerMenu>
                </TriggerMenuContainer>
                {
                    this.state.menu === 'article' ? <ArticleList></ArticleList> : 
                    this.state.menu === 'dynamic' ? <DynamicList></DynamicList> : null
                }
            </HomeLeft>
        )
    }
    componentDidMount(){
        const {userId,writerId,subscriptionsUserId,getArticleListWithArticleProfile,getProfile,addClickEvent} = this.props
        if(writerId !== null && writerId !== undefined && writerId!== ''){
            addClickEvent(userId,'user',writerId)
        }
        if(subscriptionsUserId !== null && subscriptionsUserId !== undefined && subscriptionsUserId!== ''){
            getArticleListWithArticleProfile(subscriptionsUserId,1,10)
            getProfile(subscriptionsUserId)
        }
    }

    toggleMenu(menuItem){
        this.setState({
            menu:menuItem
        })
    }

    componentDidUpdate(prevProps) {
        const {userId,subscriptionsUserId,getArticleListWithArticleProfile,getProfile,addClickEvent} = this.props
        if (subscriptionsUserId !== prevProps.subscriptionsUserId) {
            getArticleListWithArticleProfile(subscriptionsUserId,1,10)
            getProfile(subscriptionsUserId)
            addClickEvent(userId,'user',subscriptionsUserId)
            this.toggleMenu('article');
        }

        const writerId = this.props.writerIdFromPath
        const prevUserId = prevProps.writerId
        if (writerId !== prevUserId && writerId>0 && prevUserId>0) {
            this.props.getProfile(writerId);
            this.props.getArticleListWithArticleProfile(writerId,1,10);
            this.toggleMenu('article');
        }
      }
}


const mapState = (state) => ({
    userId: state.getIn(['login','userId']),
    username: state.getIn(['login','user']),
    writerId: state.getIn(['userHome','writerId']),
    followedNum: state.getIn(['userHome','followedNum']),
    articleNum: state.getIn(['userHome','articleNum']),
    fansNum: state.getIn(['userHome','fansNum']),
    likeNum: state.getIn(['userHome','likeNum']),
    wordCount: state.getIn(['userHome','wordCount']),
    nickname: state.getIn(['userHome','nickname']),
    avatarImg: state.getIn(['userHome','avatarImg']),
    gender: state.getIn(['userHome','gender']),
    profile: state.getIn(['userHome','profile']),
    website: state.getIn(['userHome','website']),
    email: state.getIn(['userHome','email']),
    qdcodeImg: state.getIn(['userHome','qdcodeImg']),
    followedWriterList: state.getIn(['home','followedWriterList']),
})

const mapDispatch= (dispatch) => ({
    getArticleListWithArticleProfile(userId,pageNum,pageSize){
        dispatch(actionCreators.getArticleListWithArticleProfile(userId,pageNum,pageSize));
    },
    getProfile(userId){
        dispatch(actionCreators.getProfile(userId))
    },
    addClickEvent(userId,subscriptionType,subscriptionId){
        dispatch(actionCreators.addClickEvent(userId,subscriptionType,subscriptionId))
    }
})
export default connect(mapState,mapDispatch)(HomeUserLeft);