import axios from 'axios';
import * as constants from './constants';

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

export const getDetail = (articleId) => {
    return (dispatch) =>{
        axios.get(URL+'article/'+articleId+'/published/profile').then((res)=>{
            const result=res.data;
            dispatch(changeDetail(result));
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


