import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { HomeWrapper,HomeLeft,HomeRight } from '../home/components/style';
import FollowButton from '../all-writers/components/FollowButton.jsx';
import { Followbutton } from '../all-writers/components/style';
import { 
    Head,Avatar,UserName,Block,Num,TriggerMenu,BlockWrapper
 } from './components/style';
 
class UserHome extends PureComponent {
    // gender,profile,website,email,qdcodeImg,
    render(){
        const { writerId,followedNum,fansNum,nickname,avatarImg } = this.props;
        return (
            <HomeWrapper>
                <HomeLeft>
                    <Head>
                        <Avatar>                                
                            <img className='avatar-img' style={{width: '78px',height: '78px'}} src={avatarImg} alt='fail'></img>
                        </Avatar>
                        <UserName>{nickname}</UserName>
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
                            <Block><Num>4</Num>文章
                            <svg className="icon" aria-hidden="true">
                                 <use xlinkHref="#icon-arrow-right"></use>
                            </svg>
                            </Block>
                            <Block><Num>100</Num>字数</Block>
                            <Block><Num>14</Num>收获喜欢</Block>
                            <Block id='user-home-block6'><Num>0</Num>简书钻</Block>
                        </BlockWrapper>

                    </Head>
                    <div>
                        <TriggerMenu>
                            <svg className="icon" aria-hidden="true">
                                 <use xlinkHref="#icon-wenzhang1"></use>
                            </svg>
                            <span>文章</span>
                        </TriggerMenu>
                        <TriggerMenu>
                            <svg className="icon" aria-hidden="true">
                                 <use xlinkHref="#icon-dongtai1"></use>
                            </svg>
                            <span>动态</span>
                        </TriggerMenu>
                        <TriggerMenu>
                            <svg className="icon" aria-hidden="true">
                                 <use xlinkHref="#icon-pinglun"></use>
                            </svg>
                            <span>最新评论</span>
                        </TriggerMenu>
                        <TriggerMenu>
                            <svg className="icon" aria-hidden="true">
                                 <use xlinkHref="#icon-remen"></use>
                            </svg>
                            <span>热门</span>
                        </TriggerMenu>
                    </div>
                </HomeLeft>
                <HomeRight></HomeRight>
            </HomeWrapper>
        )
    }
    componentDidMount(){
        let userId =this.props.match.params.id;
        this.props.getProfile(userId);
    }
}


const mapState = (state) => ({
    userId: state.getIn(['login','userId']),
    username: state.getIn(['login','user']),
    writerId: state.getIn(['userHome','writerId']),
    followedNum: state.getIn(['userHome','followedNum']),
    fansNum: state.getIn(['userHome','fansNum']),
    nickname: state.getIn(['userHome','nickname']),
    gender: state.getIn(['userHome','gender']),
    profile: state.getIn(['userHome','profile']),
    website: state.getIn(['userHome','website']),
    email: state.getIn(['userHome','email']),
    qdcodeImg: state.getIn(['userHome','qdcodeImg']),
    avatarImg: state.getIn(['userHome','avatarImg']),
})

const mapDispatch= (dispatch) => ({
    getProfile(userId){
        dispatch(actionCreators.getProfile(userId))
    }
})
export default connect(mapState,mapDispatch)(UserHome);