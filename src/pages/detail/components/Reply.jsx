
import React, { PureComponent } from 'react';
import { ReplyListContainer } from './style'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { actionCreators } from '../store'
// import { Followbutton } from '../../all-writers/components/style';
import { Avatar } from '../../../common/header/style';
import CommentSubmit from '../components/CommentSubmit.jsx';
import { dateDiff } from '../../../common/function/commonFunction.js'

// import { Link } from 'react-router-dom';

class Reply extends PureComponent {
    state=({
        type: 0,
        showSubmit: false,
        MoreComment: false
    })

    render(){
        const { userId,replyItem } =this.props;
        const style=this.props.last === true ? {borderTop:'none',borderBottom:'none',padding:'10px 0 5px 15px'} : {borderTop:'none',borderBottom:'1px solid #f0f0f0',padding:'10px 0 5px 15px'};

        return (
            <ReplyListContainer style={style}>
                <div style={{margin:'0 0 5px 0'}}>
                <Avatar src={replyItem.get('avatar_img')}></Avatar>
                <div style={{margin:'0 0 0 48px'}}>

                <span className='nick reply'>{replyItem.get('nickname')} ：</span>

                <span className='content reply'>{replyItem.get('content')}</span>
                </div>
                </div>

                <div style={{overflow:'hidden'}}>
                    <div className='func-block reply'>
                        <span className='replyy reply' onClick={()=>this.toggleSubmit(true)}>回复</span>
                        <svg className='icon reply' aria-hidden="true">     
                            <use xlinkHref='#icon-huida'></use>
                        </svg>
                    </div>

                    <div className='func-block reply'>
                    <span className='like reply' >{replyItem.get('like_count')}</span>
                    <svg className='icon reply' aria-hidden="true">     
                        <use xlinkHref='#icon-z-like'></use>
                    </svg>
                    </div>

                    <span className='desc reply'>{dateDiff(replyItem.get('create_time'))}</span>

                    {
                        userId === replyItem.get('user_id') ?
                        <span className='report reply showw'>删除</span> :
                        <span className='report reply showw'>举报</span>
                    }

                </div>
                {
                    this.state.showSubmit ? 
                    <CommentSubmit 
                        toggleSubmit={this.toggleSubmit.bind(this)} 
                        commentType={2}
                        parentId={replyItem.get('id')}
                        quotedUserId={replyItem.get('user_id')}
                        quotedUserNickname={replyItem.get('nickname')}
                    ></CommentSubmit> :
                    null
                }
            </ReplyListContainer>
        )
    }

    componentDidMount(){
        const { myType } = this.props;
        if(myType !== undefined){
            this.moreCommentInit(myType);
        }
    }


    toggleSubmit(state){
        this.setState({
            showSubmit: state
        })
    }

    showMoreComment(){
        this.setState({
            MoreComment: true
        })
    }

    moreCommentInit(type){
        this.setState({
            type: type
        })
    }
}
const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login']),
    userId: state.getIn(['login','userId']),
    avatarImg: state.getIn(['login','avatarImg'])

});

const mapDispatch = (dispatch) =>({
   
})

export default connect(mapState, mapDispatch)(withRouter(Reply));
