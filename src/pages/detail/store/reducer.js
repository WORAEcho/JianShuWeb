import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    articleDetail: {},
    writerSurvey: {},
    likedList: {},
    mainComment: {},
    mainCommentTotal: 0,
    mainCommentPageTotal: 0,
    replyMap: {},
    replyNextPageNumMap: {},
    replyTotalPageMap: {}
})

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_DETAIL:
            return state.set('articleDetail',action.detail)
        case constants.SET_SURVEY:
            return state.set('writerSurvey',action.survey)
        case constants.SET_LIKED:
            return state.set('likedList',action.likedList)
        case constants.SET_MAIN_COMMENT:
            return state.merge({
                'mainComment':action.result,
                'mainCommentPageTotal':action.pageTotal,
                'mainCommentTotal':action.mainCommentTotal
            })
        case constants.SET_REPLY_MAP:
            return state.merge({
                'replyMap':state.get('replyMap').set(action.commentId,action.result),
                'replyNextPageNumMap':state.get('replyNextPageNumMap').set(action.commentId,2),
                'replyTotalPageMap':state.get('replyTotalPageMap').set(action.commentId,action.totalPage)
            })
        case constants.ADD_REPLY_MAP:
            return state.merge({
                'replyMap':state.get('replyMap').set(action.commentId,state.get('replyMap').get(action.commentId).concat(action.result)),
                'replyNextPageNumMap':state.get('replyNextPageNumMap').set(action.commentId,state.get('replyNextPageNumMap').get(action.commentId)+1)
            })
        default:
            return state;
    }
}