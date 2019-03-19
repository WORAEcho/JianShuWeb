import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    userList: [],
    articleList: [],
    totalPage: 0
});

export default (state =defaultState, action) => {
    switch(action.type){
        case constants.SET_ARTICLE_LIST:
            return state.merge({
                'articleList': action.result,
                'totalPage': action.totalPage
            })
        case constants.SET_USER_LIST:
            return state.merge({
                'userList': action.result,
                'totalPage': action.totalPage
            })
        default:
            return state;
    }
}