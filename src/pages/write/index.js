import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../home/components/PlayImage.css'
import Editor from './components/editor';
import CollectionList from './components/collectionList';
import ArticleList from './components/articleList';
import { WriterWrapper } from './components/styled';
import { actionCreators } from './store';

class Write extends PureComponent {
    render(){
        const { loginStatus } =this.props;
        if(loginStatus){
            return (
                <WriterWrapper>
                    <CollectionList>CollectionList</CollectionList>
                    <ArticleList>ArticleList</ArticleList>
                    <Editor id="editor1" content="<p>在react中使用wangEditor</p>"/>
                </WriterWrapper>
            )
        }else {
            return <Redirect to='/login' />
        }

    }
    // componentDidMount(){
    //     console.log(this.props.myEditor)
    //     this.props.getWriteData(this.props.myEditor);
    // }
    componentDidUpdate(){
        const { getWriteData,getPublishedArticleIdList,user,userId,myEditor } = this.props;
        getWriteData(user,myEditor);
        getPublishedArticleIdList(userId);
    }
}

const mapStateToProps = (state) => ({
    loginStatus: state.getIn(['login', 'login']),
    userId: state.getIn(['login', 'userId']),
    myEditor: state.getIn(['write', 'myEditor']),
    user: state.getIn(['login', 'user'])
})


const mapDispatchToProps = (dispatch) => {
    return {
        getWriteData(user,editor){
            dispatch(actionCreators.getWriteData(user,editor));
        },
        getPublishedArticleIdList(userId){
            dispatch(actionCreators.publishedArticleIdList(userId));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Write);