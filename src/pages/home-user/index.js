import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { HomeWrapper,HomeRight } from '../home/components/style';
import HomeUserLeft from './components/HomeUserLeft'

class UserHome extends PureComponent {
    // gender,profile,website,email,qdcodeImg,

    render(){
        return (
            <HomeWrapper>
                <HomeUserLeft writerIdFromPath={parseInt(this.props.match.params.id)}></HomeUserLeft>
                <HomeRight></HomeRight>
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