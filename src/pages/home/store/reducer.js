import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePageNum: 0,
    showScroll: false,
    writerPageNum: 1,
    writerList: [],
    followedWriterList: [],
    articlePageCount: '',
});

const changeHomwData = (state, action) => {
    return state.merge({
        topicList: fromJS(action.topicList),
        recommendList: fromJS(action.recommendList)
});
}

const addArticleList = (state, action) => {
    return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePageCount': action.pageCount,
        'articlePageNum': action.pageNum
    });
} 

const changFollowList = (state, action) => {
    if(action.state === true){
        return state.set('followedWriterList',state.get('followedWriterList').push(action.followUserId))
    }else if(action.state === false){
        let array = state.get('followedWriterList');
        return state.set('followedWriterList',array.remove(array.indexOf(action.followUserId)))
    }else{
        return state.set('followedWriterList',action.followUserId)
    }
}
export default (state =defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_HOME_DATA:
            return changeHomwData(state, action);
        case constants.ADD_RECOMMEND_ARTICLE_WITH_PROFILE:
            return addArticleList(state, action);
        case constants.TOGGLE_SCROLL_TOP:
            return state.set('showScroll',action.show);
        case constants.SET_WRITER_LIST:
            return state.merge({
                'writerPageNum': action.writerPageNum,
                'writerList': action.writerList
            })
        case constants.CHANGE_FOLLOWED_LIST:
            return changFollowList(state,action);
        case constants.CHANGE_RECOMMEND_ARTICLE_WITH_PROFILE:
            return state.merge({
                'articleList': action.list,
                'articlePageCount': action.pageCount,
                'articlePageNum': action.pageNum
            });
        default:
            return state;
    }
}