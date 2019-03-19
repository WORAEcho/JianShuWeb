import React, { PureComponent } from 'react';
import { DetailWrapper,Header,Content,Author,AuthorBottom,Supprot,ArticleFoot } from './components/style'
import { withRouter,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store'
import FollowButton from '../all-writers/components/FollowButton.jsx';
import LikeButton from './components/LikeButton.jsx';
import moment from 'moment';
import CommentSubmit from './components/CommentSubmit.jsx';
import Comment from './components/Comment.jsx';
import { Avatar } from '../../common/header/style';
import PageHelper from '../../common/pageHelper/PageHelper';

class Detail extends PureComponent {

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
                    <Link to={'/userhome/'+articleDetail.userId} style={{textDecoration: 'none'}}><span className='author-name'>{articleDetail.nickname}</span></Link>
                    <FollowButton className='follow-button' id='follow-button' writerId={articleDetail.userId}>关注</FollowButton>
                    <div>
                    <span>{moment(articleDetail.update_time).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <span>字数 {articleDetail.word_count}</span>
                    <span>阅读 999</span>
                    <span>评论 {mainCommentTotal}</span>
                    <span>喜欢 {likedList.length}</span>
                    </div>
                    </div>
                </Author>
                <Content dangerouslySetInnerHTML={{__html: articleDetail.content}} />
                <Supprot>
                    <p>小礼物走一走，来简书关注我</p>
                    <div className='support-button'>赞赏支持</div>
                    <div>赞赏者</div>
                </Supprot>
                <ArticleFoot>
                    <svg className='icon' aria-hidden="true">
                        <use xlinkHref='#icon-wenji'></use>
                    </svg>
                    <span className='collection'>{articleDetail.collection_name}</span>
                    <span className='copyright'>©著作权归作者所有</span>
                    <span className='report'>举报文章</span>
                </ArticleFoot>

                <AuthorBottom>
                    <Link to={'/userhome/'+articleDetail.userId}><Avatar src={articleDetail.avatar_img}></Avatar></Link>
                    <div style={{display: 'inline-block',marginLeft: '8px'}}>
                    <Link to={'/userhome/'+articleDetail.userId} style={{textDecoration: 'none'}}><span className='author-name'>{articleDetail.nickname}</span></Link>
                    <svg className='icon' aria-hidden="true">
                            <use xlinkHref={articleDetail.gender === 1 ? "#icon-nan" : "#icon-nv"}></use>
                    </svg>
                    <div>
                    <span>写了 {writerSuvrey.totalWordCount} 字, </span>
                    <span>被 {writerSuvrey.fansNum} 人关注, </span>
                    <span>获得了 {writerSuvrey.totalLikeCount} 个喜欢</span>
                    </div>
                    </div>
                    <FollowButton className='follow-button' id='follow-button' writerId={articleDetail.userId}>关注</FollowButton>
                </AuthorBottom>
                <div style={{overflow:'hidden',margin: '20px 0'}}>
                    <LikeButton articleId={this.props.match.params.id}></LikeButton>
                    <div style={{float: 'right'}}>
                        分享
                    </div>
                </div>
                <div>
                <Avatar src={avatarImg} style={{margin: '0'}}></Avatar>
                <CommentSubmit commentType={1}></CommentSubmit>
                </div>

                <div>
                <div style={{margin:'30px 0 20px 0',fontSize: '17px',fontWeight: '700'}}>精彩评论（{mainCommentTotal}）</div>
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
                                getMainCommentByPageNum={(pageNum)=>this.getMainCommentByPageNum(pageNum)}
                    ></PageHelper>
                }
                </div>
            </DetailWrapper>
        )
    }

    getMainCommentByPageNum(pageNum){
        this.props.getMainComment(pageNum,this.props.match.params.id,this.props.userId);
    }

    componentDidMount(){
        const {userId,getDetail,getMainComment,match} = this.props
        getDetail(match.params.id);
        getMainComment(1,match.params.id,userId);
    }

    componentDidUpdate(prevProps) {
        const {userId,getMainComment,match} = this.props
        if (this.props.userId !== prevProps.userId) {
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