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

const toggleLikeComment = (state,action,type) => {
    const list = state.get('mainComment').toJS();
    list.map(e => {
        if(e.id === action.commentId){
            if(type === 'add'){
                e["liked"] = 1
                e["likeTotal"] = e["likeTotal"] + 1
                e["likedId"] = action.likedId
            }else{
                e["liked"] = 0
                e["likeTotal"] = e["likeTotal"] - 1
                e["likedId"] = 0
            }
        }
        return e
    })
    //TODO:这样写很不好
    return fromJS(list);
}

const toggleLikeReply = (state,action,type) => {
    const map = state.get('replyMap')
    const list = state.get('replyMap').get(action.parentId)
    const index = list.indexOf(list.find((e) => e.get('id') === action.commentId))

    return type === 'add' ? 
           map.updateIn([action.parentId,index,'liked'],()=>1)
           .updateIn([action.parentId,index,'likeTotal'],v=>v+1)
           .updateIn([action.parentId,index,'likedId'],()=>action.likedId) :
           map.updateIn([action.parentId,index,'liked'],()=>0)
           .updateIn([action.parentId,index,'likeTotal'],v=>v-1)
           .updateIn([action.parentId,index,'likedId'],()=>0)  
}

const changeMainComment = (state,action) => {
    const list = state.get('mainComment');
    const index = list.indexOf(list.find((e) => e.get('id') === action.parentId))
    return list.updateIn([index,'replyCount'],v=>v+1)
}

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
        case constants.ADD_LIKE_COMMENT:
            return state.set('mainComment',toggleLikeComment(state,action,'add'))
        case constants.DELETE_LIKE_COMMENT:
            return state.set('mainComment',toggleLikeComment(state,action,'delete'))
        case constants.ADD_LIKE_REPLY:
            return state.set('replyMap',toggleLikeReply(state,action,'add'))
        case constants.DELETE_LIKE_REPLY:
            return state.set('replyMap',toggleLikeReply(state,action,'delete'))
        case constants.CHANGE_MAIN_COMMENT:
            return state.set('mainComment',changeMainComment(state,action))
        default:
            return state;
    }
}