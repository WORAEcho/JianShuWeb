import React, { PureComponent } from 'react';
import { CommentContainer } from './style'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Followbutton } from '../../all-writers/components/style';
// import { Link } from 'react-router-dom';

class CommentSubmit extends PureComponent {
    state=({
        sendState: false
    })

    //type: 1代表评论，0代表回复评论，2代表回复回复
    render(){
        
        const { userId,articleDetail,commentType } =this.props;
        const articleId = articleDetail.articleId;
        return (
            <CommentContainer>
            <div className='comment-submit'  
                 style={commentType === 2 ? {borderLeft:'none',paddingLeft:'0'} : null}
            >
            <textarea placeholder='写下你的评论...'
                      onFocus={()=>this.toggeleSend(true)}
                      onKeyDown={(e)=>this.checkSend(e,commentType,articleId,userId,this.content.value)}
                      ref={(textarea)=>{this.content = textarea}}
                      defaultValue={commentType === 2 ? '@'+this.props.quotedUserNickname+' ': ''}
            >
            </textarea>
            {
                this.state.sendState ?
                <div className='comment-function-block'>
                    <svg className='icon' aria-hidden="true">     
                        <use xlinkHref='#icon-haopingxiaolian-xianxing'></use>
                    </svg>
                    <div>Ctrl+Enter 发表</div>
                    <Followbutton className='send-button' 
                                  onClick={()=>this.submitComment(commentType,articleId,userId,this.content.value)}
                    >
                        发送
                    </Followbutton>
                    <div className='cancel-button' onClick={()=>this.toggeleSend(false)}>取消</div>
                </div> :
                null
            }
            </div>
            </CommentContainer>
        )
    }
    componentDidMount(){
        if(this.props.toggleSubmit !== undefined){
            this.toggeleSend(true)
        }
    }
    toggeleSend(state){
        this.setState({
            sendState: state
        })
        if(state === false && this.props.toggleSubmit !== undefined){
            this.props.toggleSubmit(false)
        }
    }
    submitComment(commentType,articleId,userId,content){
        const {commentId,parentId,quotedUserId,submitComment,submitReply,toggleReply,commentPageNum} = this.props
        if(toggleReply !== undefined){
            toggleReply(true)
        }
        if(content === ''){
            alert('回复内容不能为空');
        }else{
            if(commentType === 1){
                submitComment(articleId,userId,content,commentPageNum)
            }else{
                submitReply(commentId,parentId,articleId,userId,content,quotedUserId)
            }
            this.toggeleSend(false);
        }
    }
    checkSend(e,commentType,articleId,userId,content){
        let code = e.charCode || e.keyCode
        if(e.ctrlKey && code === 13){
            this.submitComment(commentType,articleId,userId,content)
        }
    }
}
const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login']),
    userId: state.getIn(['login','userId']),
    articleDetail: state.getIn(['detail', 'articleDetail']),
    writerSuvrey: state.getIn(['detail', 'writerSurvey']),
    likedList: state.getIn(['detail','likedList']),
});

const mapDispatch = (dispatch) =>({
    submitComment(articleId,userId,content,commentPageNum){
        dispatch(actionCreators.submitComment(articleId,userId,content,commentPageNum))
    },
    submitReply(commentId,parentId,articleId,userId,content,quotedUserId){
        dispatch(actionCreators.submitReply(commentId,parentId,articleId,userId,content,quotedUserId))
    }
})

export default connect(mapState, mapDispatch)(withRouter(CommentSubmit));
