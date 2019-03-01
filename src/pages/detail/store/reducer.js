import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    articleDetail: {},
    writerSurvey: {},
    likedList: {}
})

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_DETAIL:
            return state.set('articleDetail',action.detail)
        case constants.SET_SURVEY:
            return state.set('writerSurvey',action.survey)
        case constants.SET_LIKED:
            return state.set('likedList',action.likedList)
        default:
            return state;
    }
}