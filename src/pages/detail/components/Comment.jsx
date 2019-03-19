
import React, { PureComponent } from 'react';
import { CommentListContainer,MoreReply } from './style'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Avatar } from '../../../common/header/style';
import CommentSubmit from './CommentSubmit.jsx';
import Reply from './Reply.jsx'
import { dateDiff } from '../../../common/function/commonFunction.js'

class Comment extends PureComponent {
    state=({
        type: 0,
        showSubmit: false,
        reply: false
    })

    render(){
        const { userId,replyMap,commentItem,articleId,replyNextPageNumMap,replyTotalPageMap } =this.props;
        const parentId = commentItem.get('id');
        const replylist = replyMap.get(parentId);
        return (
            <CommentListContainer>
                <div style={{margin:'0 0 15px 0'}}>
                <Avatar src={commentItem.get('avatar_img')}></Avatar>
                <span className='nick'>{commentItem.get('nickname')}</span>
                <span className='desc'>{dateDiff(commentItem.get('create_time'))}</span>
                </div>
                <div className='content'>{commentItem.get('content')}</div>
                <div style={{padding: '0 0 10px 0'}}>
                    <div className='func-block' onClick={()=>this.props.addLikeComment(userId,parentId)}>
                        <svg className='icon' aria-hidden="true">     
                            <use xlinkHref='#icon-z-like'></use>
                        </svg>
                        <span className='like' >({commentItem.get('likeTotal')})</span>
                    </div>
                    {
                        commentItem.get('replyCount') === 0 ?
                        null :
                        <div className='func-block'>
                            <svg className='icon' aria-hidden="true">     
                                <use xlinkHref='#icon-pinglun1'></use>
                            </svg>
                            {
                                this.state.reply === true ?
                                <span className='like' onClick={()=>this.toggleReply(false)}>收起回复</span>
                                :
                                <span className='like' onClick={()=>this.showReply(articleId,parentId)}>查看回复({commentItem.get('replyCount')})</span>
                            }
                        </div>
                    }
                    <div className='func-block'>
                        <svg className='icon' aria-hidden="true">     
                            <use xlinkHref='#icon-huida'></use>
                        </svg>
                        <span className='like' onClick={()=>this.toggleSubmit(true)}>回复</span>
                    </div>
                    {
                        userId === commentItem.get('user_id') ?
                        <span className='report show'>删除</span> :
                        <span className='report show'>举报</span>
                    }
                </div>
                {
                    this.state.reply === true ?
                    <div style={{margin: '5px 0 0 0',borderLeft:'2px solid #d9d9d9'}}>
                    {
                        replylist !== undefined ?
                        <div>
                        {
                            replylist.map((item,index)=>{
                                return (
                                    <Reply key={item.get('id')} 
                                        replyItem={item}
                                        last={replylist.size === index + 1 ? true : false}
                                    ></Reply>
                                )
                            })
                        }
                        {
                            replyNextPageNumMap.get(parentId)-1 === replyTotalPageMap.get(parentId) ?
                            <MoreReply>
                                {
                                    replyNextPageNumMap.get(parentId)-1 < 2 ? null :
                                    <span onClick={()=>this.toggleReply(false)}>收起回复</span>
                                }
                                
                            </MoreReply> 
                            :
                            <MoreReply>
                                还有{commentItem.get('replyCount')-(replyNextPageNumMap.get(parentId)-1)*8}条评论，
                                <span onClick={()=>this.moreReply(articleId,parentId)}>展开查看</span>
                                {
                                    replyNextPageNumMap.get(parentId)-1 < 2 ? null :
                                    <span onClick={()=>this.toggleReply(false)}>收起回复</span>
                                }
                            </MoreReply>
                        }
                        </div>
                        :
                        null
                    }
                    </div> :
                    null
                }
                {
                    this.state.showSubmit ? 
                    <CommentSubmit 
                        toggleSubmit={this.toggleSubmit.bind(this)} 
                        commentType={0}
                        parentId={parentId}
                        quotedUserId={commentItem.get('user_id')}
                        toggleReply={this.toggleReply.bind(this)}
                    ></CommentSubmit> :
                    null
                }
            </CommentListContainer>
        )
    }

    componentDidMount(){
        const { myType } = this.props;
        if(myType !== undefined){
            this.replyInit(myType);
        }
    }

    toggleSubmit(state){
        this.setState({
            showSubmit: state
        })
    }

    showReply(articleId,parentId){
        this.props.getReplyMap(articleId,parentId)
        this.toggleReply(true)
    }

    toggleReply(state){
        this.setState({
            reply: state
        })
    }

    replyInit(type){
        this.setState({
            type: type
        })
    }

    moreReply(articleId,parentId){
        const pageNum = this.props.replyNextPageNumMap.get(parentId)
        this.props.moreReply(pageNum,articleId,parentId)
    }
}
const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login']),
    userId: state.getIn(['login','userId']),
    replyMap: state.getIn(['detail','replyMap']),
    replyNextPageNumMap: state.getIn(['detail','replyNextPageNumMap']),
    replyTotalPageMap: state.getIn(['detail','replyTotalPageMap']),
});

const mapDispatch = (dispatch) =>({
    getReplyMap(articleId,parentId){
        dispatch(actionCreators.getReply(articleId,parentId))
    },
    moreReply(pageNum,articleId,parentId){
        dispatch(actionCreators.moreReply(pageNum,articleId,parentId))
    },
    addLikeComment(userId,commentId){
        if(userId !== ''){
            dispatch(actionCreators.addLikeComment(userId,commentId))
        }else{
            this.history.push('/login');
        }
    }
})

export default connect(mapState, mapDispatch)(withRouter(Comment));
