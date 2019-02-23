import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommendList: [],
    articlePage: 1,
    showScroll: false,
    writerPageNum: 1,
    writerList: []
});

const changeHomwData = (state, action) => {
    return state.merge({
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
});
}

const addArticleList = (state, action) => {
    return state.merge({
        'articleList': state.get('articleList').concat(action.list),
        'articlePage': action.nextPage
    });
} 

export default (state =defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_HOME_DATA:
            return changeHomwData(state, action);
        case constants.ADD_ARTICLE_LIST:
            return addArticleList(state, action);
        case constants.TOGGLE_SCROLL_TOP:
            return state.set('showScroll',action.show);
        case constants.SET_WRITER_LIST:
            return state.merge({
                'writerPageNum': action.writerPageNum,
                'writerList': action.writerList
            })
        default:
            return state;
    }
}