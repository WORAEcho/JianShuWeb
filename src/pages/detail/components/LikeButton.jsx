import React, { PureComponent } from 'react';
import { LikeButtonContainer} from './style'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from '../store'

class LikeButton extends PureComponent {
    render(){
        const { loginStatus,likedList,userId,articleId } =this.props;
        const ifLiked = likedList.filter(item=>item.userId===userId).length > 0 ? true : false;
        return (
            <LikeButtonContainer className={ ifLiked ? 'like active' : 'like' }>
                <div className='like-btn'
                    onClick={()=>this.toggleLike(loginStatus,articleId,userId,ifLiked)}
                >
                    <svg className='icon' aria-hidden="true">
                        <use xlinkHref={ ifLiked ? '#icon-icon-test' : '#icon-icon-test-copy' }></use>
                    </svg>
                    <span className={ ifLiked ? 'like avtive' : 'like'}>喜欢</span>
                </div>
                <div className={ ifLiked ? 'likedNum-btn active' : 'likedNum-btn'}>
                    <span className={ ifLiked ? 'likeNum avtive' : 'likeNum'}>{likedList.length}</span>
                </div>
            </LikeButtonContainer>
                
        )
    }
    toggleLike(loginStatus,articleId,userId,ifLiked){
        if(loginStatus){
            this.props.toggleLike(articleId,userId,ifLiked);
        }else{
            this.props.history.push('/login');
        }
    }

    componentDidMount(){
        this.props.getLiked(this.props.articleId);
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
    getLiked(articleId) {
        dispatch(actionCreators.getLiked(articleId));
    },
    toggleLike(articleId,userId,ifLiked){
        dispatch(actionCreators.toggleLike(articleId,userId,ifLiked));
    }
})

export default connect(mapState, mapDispatch)(withRouter(LikeButton));