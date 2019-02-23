import React, { PureComponent } from 'react';
import { DetailWrapper,Header,Content,Author,AuthorBottom,Supprot,ArticleFoot } from './style'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store'
import { Avatar } from '../all-writers/components/style';
import FollowButton from '../all-writers/components/FollowButton.jsx'
import moment from 'moment'
import { Link } from 'react-router-dom';

class Detail extends PureComponent {
    render(){
    const { articleDetail,writerSuvrey } =this.props;
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
                    <span>评论 99</span>
                    <span>喜欢 9</span>
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
                    <span>获得了 999 个喜欢</span>
                    </div>
                    </div>
                    <FollowButton className='follow-button' id='follow-button' writerId={articleDetail.userId}>关注</FollowButton>
                </AuthorBottom>
                <div>
                    <div>
                        <div>
                            爱心
                        </div>
                        <div>
                            11
                        </div>
                    </div>
                    <div>
                        分享
                    </div>
                </div>
            </DetailWrapper>
        )
    }

    componentDidMount(){
        this.props.getDetail(this.props.match.params.id);
    }
}
const mapState = (state) => ({
    articleDetail: state.getIn(['detail', 'articleDetail']),
    writerSuvrey: state.getIn(['detail', 'writerSurvey']),
});

const mapDispatch = (dispatch) =>({
    getDetail(id) {
        dispatch(actionCreators.getDetail(id));
    }
})

export default connect(mapState, mapDispatch)(withRouter(Detail));