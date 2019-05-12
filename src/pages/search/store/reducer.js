import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    userList: [],
    articleList: [],
    anthologyList: [],
    articleTotalPage: 0,
    userTotalPage: 0,
    anthologyTotalPage: 0,
    articleTotalNum: 0,
    userTotalNum: 0
});

export default (state =defaultState, action) => {
    switch(action.type){
        case constants.SET_ARTICLE_LIST:
            return state.merge({
                'articleList': action.result,
                'articleTotalPage': action.totalPage,
                'articleTotalNum': action.articleTotalNum
            })
        case constants.SET_USER_LIST:
            return state.merge({
                'userList': action.result,
                'userTotalPage': action.totalPage,
                'userTotalNum': action.userTotalNum
            })
        case constants.SET_ANTHOLOGY_LIST:
            return state.merge({
                'anthologyList': action.result,
                'anthologyTotalPage': action.totalPage
            })
        default:
            return state;
    }
}