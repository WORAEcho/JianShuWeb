import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { HomeWrapper } from '../home/components/style';
import HomeUserLeft from './components/HomeUserLeft'
import HomeUserRight from './components/HomeUserRight'
class UserHome extends PureComponent {
    // gender,profile,website,email,qdcodeImg,

    render(){
        return (
            <HomeWrapper>
                <HomeUserLeft writerIdFromPath={parseInt(this.props.match.params.id)}></HomeUserLeft>
                <HomeUserRight userId={parseInt(this.props.match.params.id)}></HomeUserRight>
            </HomeWrapper>
        )
    }
    componentDidMount(){
        let userId =this.props.match.params.id;
        this.props.getProfile(userId);
        this.props.getArticleListWithArticleProfile(userId,1,10);
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