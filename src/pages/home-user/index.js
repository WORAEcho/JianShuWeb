import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { HomeWrapper,HomeLeft,HomeRight } from '../home/components/style';
import FollowButton from '../all-writers/components/FollowButton.jsx';
import { Followbutton } from '../all-writers/components/style';
import { 
    Head,Avatar,UserName,Block,Num,TriggerMenuContainer,TriggerMenu,BlockWrapper
 } from './components/style';
import ArticleList from './components/ArticleList';
 
class UserHome extends PureComponent {
    // gender,profile,website,email,qdcodeImg,
    state=({
        menu:'article' 
    })
    render(){
        const { writerId,followedNum,fansNum,articleNum,likeNum,wordCount,nickname,gender,avatarImg } = this.props;
        return (
            <HomeWrapper>
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
                        <div style={{float: 'right'}}>
                            <FollowButton id='button-follow' writerId={writerId}>                                    
                            </FollowButton>
                            <Followbutton className='button chat'>发简信</Followbutton>
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
                            <Block><Num>{likeNum}</Num>收获喜欢</Block>
                            <Block id='user-home-block6'><Num>0</Num>简书钻</Block>
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
                        this.state.menu === 'article' ? <ArticleList></ArticleList> : null      
                    }
                </HomeLeft>
                <HomeRight></HomeRight>
            </HomeWrapper>
        )
    }
    componentDidMount(){
        let userId =this.props.match.params.id;
        this.props.getProfile(userId);
        this.props.getArticleListWithArticleProfile(userId,1,10);
    }
    toggleMenu(menuItem){
        this.setState({
            menu:menuItem
        })
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
    gender: state.getIn(['userHome','gender']),
    profile: state.getIn(['userHome','profile']),
    website: state.getIn(['userHome','website']),
    email: state.getIn(['userHome','email']),
    qdcodeImg: state.getIn(['userHome','qdcodeImg']),
    avatarImg: state.getIn(['userHome','avatarImg']),
})

const mapDispatch= (dispatch) => ({
    getArticleListWithArticleProfile(userId,pageNum,pageSize){
        dispatch(actionCreators.getArticleListWithArticleProfile(userId,pageNum,pageSize));
    },
    getProfile(userId){
        dispatch(actionCreators.getProfile(userId))
    }
})
export default connect(mapState,mapDispatch)(UserHome);