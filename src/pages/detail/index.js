import React, { PureComponent } from 'react';
import { DetailWrapper,Header,Content,Author,MetaBottom,ArticleFoot } from './components/style'
import { withRouter,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store'
import FollowButton from '../all-writers/components/FollowButton.jsx';
import LikeButton from './components/LikeButton.jsx';
import moment from 'moment';
import CommentSubmit from './components/CommentSubmit.jsx';
import AuthorCard from './components/AuthorCard.jsx';
import Comment from './components/Comment.jsx';
import { Avatar } from '../../common/header/style';
import PageHelper from '../../common/pageHelper/PageHelper';
class Detail extends PureComponent {
    state=({
        commentPageNum: 1
    })
    render(){
        const { articleDetail,writerSuvrey,likedList,avatarImg,mainComment,mainCommentPageTotal,mainCommentTotal} =this.props;
        return (
            <DetailWrapper>
                <Header>
                    {articleDetail.title}
                </Header>
                <Author>
                    <Link to={'/userhome/'+articleDetail.userId}><Avatar src={articleDetail.avatar_img}></Avatar></Link>
                    <div style={{display: 'inline-block',marginLeft: '8px'}}>
                    <Link to={'/userhome/'+articleDetail.userId} style={{textDecoration: 'none'}}>
                        <span className='author-name'>{articleDetail.nickname}</span>
                    </Link>
                    <FollowButton className='follow-button' id='follow-button' writerId={articleDetail.userId}>关注</FollowButton>
                    <div>
                    <span>{moment(articleDetail.update_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <span>字数 {articleDetail.word_count}</span>
                    <span>评论 {mainCommentTotal}</span>
                    <span>喜欢 {likedList.length}</span>
                    </div>
                    </div>
                </Author>
                <Content dangerouslySetInnerHTML={{__html: articleDetail.content}} />
                {/* <Supprot>
                    <p>小礼物走一走，来简书关注我</p>
                    <div className='support-button'>赞赏支持</div>
                </Supprot> */}
                <ArticleFoot>
                    <svg className='icon' aria-hidden="true">
                        <use xlinkHref='#icon-wenji'></use>
                    </svg>
                    <span className='collection'>{articleDetail.collection_name}</span>
                    <span className='copyright'>©著作权归作者所有</span>
                    <span className='report'>举报文章</span>
                </ArticleFoot>
                <div style={{margin: '20px 0 40px 0'}}>
                    <AuthorCard userId={articleDetail.userId}
                                avatarImg={articleDetail.avatar_img}
                                nickname={articleDetail.nickname}
                                gender={articleDetail.gender}
                                profile={articleDetail.profile}
                                totalWordCount={writerSuvrey.totalWordCount}
                                fansNum={writerSuvrey.fansNum}
                                totalLikeCount={writerSuvrey.totalLikeCount}
                    ></AuthorCard>
                </div>
                <MetaBottom>
                    <LikeButton articleId={this.props.match.params.id}></LikeButton>
                    {/* {console.log(this.props.match)} */}
                    <div className='share'>
                        {/* <div className='share-circle'> 
                            <svg className='icon' aria-hidden="true">
                                <use xlinkHref='#icon-weixin'></use>
                            </svg>
                        </div> */}
                        <a href={'http://service.weibo.com/share/share.php?url=http://192.168.57.1:3000'+this.props.match.url+'&sharesource=weibo&title='+articleDetail.title} target="_blank" rel="noopener noreferrer">
                        <div className='share-circle'> 
                            <svg className='icon' aria-hidden="true">
                                <use xlinkHref='#icon-weibo'></use>
                            </svg>
                        </div>
                        </a>
                        <a href={'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=192.168.57.1:3000'+this.props.match.url+'&sharesource=qzone&title='+articleDetail.title} target="_blank" rel="noopener noreferrer">
                        <div className='share-circle'> 
                            <svg className='icon' aria-hidden="true">
                                <use xlinkHref='#icon-qqkongjian'></use>
                            </svg>
                        </div>
                        </a>
                        {/* <div className='share-circle' id='more-share'> 
                            更多分享
                        </div> */}
                    </div>
                </MetaBottom>
                <div>
                <Avatar src={avatarImg} style={{margin: '0'}}></Avatar>
                <CommentSubmit commentType={1} commentPageNum={this.state.commentPageNum}></CommentSubmit>
                </div>

                <div>
                <div style={{margin:'30px 0 20px 0',fontSize: '17px',fontWeight: '700'}}>评论（{mainCommentTotal}）</div>
                </div>
                {
                    mainComment.valueSeq().map((item)=>{
                        return (
                            <Comment key={item.get('id')} 
                                         commentItem={item} 
                                         articleId={this.props.match.params.id}
                            ></Comment>
                        )
                    })
                }
                <div style={{textAlign:'center'}}> 
                {
                    mainCommentPageTotal <= 1 ? null :
                    <PageHelper pageTotal={mainCommentPageTotal} 
                                getInfo={(pageNum)=>this.getMainCommentByPageNum(pageNum)}
                    ></PageHelper>
                }
                </div>
            </DetailWrapper>
        )
    }

    getMainCommentByPageNum(pageNum){
        this.setState({
            commentPageNum: pageNum
        })
        this.props.getMainComment(pageNum,this.props.match.params.id,this.props.userId);
    }

    componentDidMount(){
        const {userId,getDetail,getMainComment,match} = this.props
        getDetail(match.params.id);
        getMainComment(1,match.params.id,userId);
    }

    componentDidUpdate(prevProps) {
        const {userId,getMainComment,match} = this.props
        if (userId !== prevProps.userId) {
            getMainComment(1,match.params.id,userId);
        }
      }
}

const mapState = (state) => ({
    userId: state.getIn(['login','userId']),
    articleDetail: state.getIn(['detail', 'articleDetail']),
    writerSuvrey: state.getIn(['detail', 'writerSurvey']),
    likedList: state.getIn(['detail','likedList']),
    avatarImg: state.getIn(['login','avatarImg']),
    mainComment: state.getIn(['detail','mainComment']),
    mainCommentPageTotal: state.getIn(['detail','mainCommentPageTotal']),
    mainCommentTotal: state.getIn(['detail','mainCommentTotal']),
});

const mapDispatch = (dispatch) =>({
    getDetail(id) {
        dispatch(actionCreators.getDetail(id));
    },
    getMainComment(pageNum,articleId,userId){
        dispatch(actionCreators.getMainComment(pageNum,articleId,userId));
    }
})

export default connect(mapState, mapDispatch)(withRouter(Detail));