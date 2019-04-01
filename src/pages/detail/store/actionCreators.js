import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const changeDetail = (detail) => ({
    type: constants.CHANGE_DETAIL,
    detail
})

const setWriterSurvey = (survey) => ({
    type: constants.SET_SURVEY,
    survey
})

const setLiked = (likedList) => ({
    type: constants.SET_LIKED,
    likedList
})

const setMainComment = (result,pageTotal,mainCommentTotal) => ({
    type: constants.SET_MAIN_COMMENT,
    result,
    pageTotal,
    mainCommentTotal
})

const setReplyMap = (commentId,result,totalPage) => ({
    type: constants.SET_REPLY_MAP,
    commentId,
    result,
    totalPage
})

const addReplyMap = (commentId,result) => ({
    type: constants.ADD_REPLY_MAP,
    commentId,
    result
})

const changeMainComment = (parentId) => ({
    type: constants.CHANGE_MAIN_COMMENT,
    parentId
})

export const getDetail = (articleId) => {
    return (dispatch) =>{
        axios.get(URL+'article/'+articleId+'/published/profile').then((res)=>{
            const result=res.data;
            dispatch(changeDetail(result));
            console.log(res)
            axios.get(URL+'writer/'+result.userId+'/survey').then((res)=>{
                const survey=res.data;
                dispatch(setWriterSurvey(survey));
            }).catch(()=>{
                alert('请求作者概况失败')
            })
        }).catch(()=>{
            alert('请求detail失败')
        })       
    }
}

export const getLiked = (articleId) => {
    return (dispatch) =>{
        axios.get(URL+'article/like?articleId='+articleId).then((res)=>{
            const result=res.data;
            dispatch(setLiked(result));
        }).catch(()=>{
            alert('请求喜欢列表失败')
        })       
    }
}

export const toggleLike = (articleId,userId,ifLiked) => {
    return (dispatch) =>{
        if(ifLiked){
            axios.delete(URL+'article/like?articleId='+articleId+'&userId='+userId).then((res)=>{
                const result=res.data;
                if(result === 1){
                    dispatch(getLiked(articleId))
                }else{
                    alert('取消喜欢失败！')
                }
            }).catch(()=>{
                alert('取消喜欢失败！')
            })     
        }else{
            axios.post(URL+'article/like',{
                'articleId': articleId,
                'userId': userId 
            }).then((res)=>{
                const result=res.data;
                if(result === 1){
                    dispatch(getLiked(articleId))
                }else{
                    alert('喜欢失败！')
                }
            }).catch(()=>{
                alert('喜欢失败！')
            })     
        }     
    }
}

export const submitComment = (articleId,userId,content) => {
    return (dispatch) =>{
        axios.post(URL+'article/comment',{
            'parentId':0,
            'articleId':articleId,
            'userId':userId,
            'content':content,
            'mainComment':1
        }).then((res)=>{
            const result=res.data;
            if(result === 1){
                dispatch(getMainComment(1,articleId,userId))
            }
        }).catch(()=>{
            alert('添加评论失败')
        })       
    }
}

export const submitReply = (commentId,parentId,articleId,userId,content,quotedUserId) => {
    return (dispatch) =>{
        axios.post(URL+'article/comment',{
            'parentId':parentId,
            'articleId':articleId,
            'userId':userId,
            'content':content,
            'mainComment':0,
            'quotedUserId':quotedUserId
        }).then((res)=>{
            if(res.data === 1){
                dispatch(getReply(articleId,commentId,userId))
                dispatch(changeMainComment(parentId))
            }
        }).catch(()=>{
            alert('添加回复失败')
        })       
    }
}

export const getMainComment = (pageNum,articleId,userId) => {
    return (dispatch) =>{
        axios.get(URL+'article/comment?pageNum='+pageNum+'&articleId='+articleId+'&userId='+userId).then((res)=>{
            const result=res.data;
            dispatch(setMainComment(fromJS(result.list),result.pages,result.total))
        }).catch(()=>{
            alert('请求评论失败')
        })       
    }
}

export const getReply = (articleId,parentId,userId) => {
    const getReplyURL = URL+'article/reply?pageNum=1&articleId='+articleId+'&parentId='+parentId
    return (dispatch) =>{
        axios.get(userId === '' ? getReplyURL : getReplyURL+'&userId='+userId).then((res)=>{
            const result=res.data;
            if(result.total > 0){
                dispatch(setReplyMap(parentId,fromJS(result.list),result.pages))
            }
        }).catch(()=>{
            alert('请求回复失败')
        })       
    }
}

export const moreReply = (pageNum,articleId,parentId,userId) => {
    const moreReplyURL = URL+'article/reply?pageNum='+pageNum+'&articleId='+articleId+'&parentId='+parentId

    return (dispatch) =>{
        axios.get(userId === '' ? moreReplyURL : moreReplyURL+'&userId='+userId).then((res)=>{
            const result=res.data;
            dispatch(addReplyMap(parentId,fromJS(result.list)))
        }).catch(()=>{
            alert('请求回复失败')
        })       
    }
}

//toggleLikeComment被comment调用时，参数为commentId;被reply调用时，参数为replyId(原commentId),commentId(parentId)
export const addLikeComment = (userId,commentId,isReply,parentId) => {
    return (dispatch) =>{
        axios.post(URL+'article/comment/like',{
            'userId':userId,
            'commentId':commentId
        }).then((res)=>{
            const result=res.data;
            result !== 0 ?
            dispatch(isReply ? addLikeReplyAction(userId,commentId,result,parentId) : addLikeCommentAction(userId,commentId,result)) :
            alert('喜欢评论失败')
        }).catch((e)=>{
            console.log(e)
            alert('喜欢评论失败')
        })       
    }
}


export const deleteLikeComment = (userId,commentId,likedId,isReply,parentId) => {
    return (dispatch) =>{
        axios.delete(URL+'article/comment/like?likedId='+likedId).then((res)=>{
            res.data !== 0 ?
            dispatch(isReply ? deleteLikeReplyAction(userId,commentId,parentId) : deleteLikeCommentAction(userId,commentId)) :
            alert('删除评论失败')
        }).catch((e)=>{
            console.log(e)
            alert('删除评论失败')
        })       
    }
}

const addLikeCommentAction = (userId,commentId,likedId) => ({
    type: constants.ADD_LIKE_COMMENT,
    userId,
    commentId,
    likedId
})

const deleteLikeCommentAction = (userId,commentId) => ({
    type: constants.DELETE_LIKE_COMMENT,
    userId,
    commentId
})

const addLikeReplyAction = (userId,commentId,likedId,parentId) => ({
    type: constants.ADD_LIKE_REPLY,
    userId,
    commentId,
    likedId,
    parentId
})

const deleteLikeReplyAction = (userId,commentId,parentId) => ({
    type: constants.DELETE_LIKE_REPLY,
    userId,
    commentId,
    parentId
})