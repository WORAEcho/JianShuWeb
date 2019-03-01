import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const changeHomeData = (result) => ({
    type: constants.CHANGE_HOME_DATA,
    topicList:result.topicList,
    recommendList:result.recommendList
})

const changeRecommendArticleWithProfile = (list,pageCount,pageNum) => ({
    type: constants.CHANGE_RECOMMEND_ARTICLE_WITH_PROFILE,
    list,
    pageCount,
    pageNum
})

const addRecommendArticleWithProfile =(list,pageCount,pageNum) => ({
    type: constants.ADD_RECOMMEND_ARTICLE_WITH_PROFILE,
    list,
    pageCount,
    pageNum
})

export const getHomeInfo = (userId) => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) =>{
            const result=res.data.data;
            dispatch(changeHomeData(result));
        }).catch(()=>{
            console.log('请求home.json失败')
        });
    }
}

export const initFollwedList = (userId) =>{
    return (dispatch) => {
        axios.get(URL+'follower?userId='+userId).then((res)=>{
            dispatch(changeFollowedList(fromJS(res.data),fromJS('init')));
        }).catch(e=>{
            console.log(e)
        });
    }
}

export const getArticleList = (pageNum) => {
    return (dispatch) => {
        axios.get(URL+'article/published/profile?pageNum='+ pageNum +'&pageSize=5').then((res)=>{
            dispatch(changeRecommendArticleWithProfile(fromJS(res.data.list),fromJS(res.data.pages),fromJS(pageNum+1)));
        }).catch((e)=>{
            console.log(e);
            console.log('请求推荐文章失败！')
        })
    }
}

export const getArticleMoreList = (pageNum) => {
    return (dispatch)=>{
        axios.get(URL+'article/published/profile?pageNum='+ pageNum +'&pageSize=5').then((res) =>{
            const result=res.data.list;
            dispatch(addRecommendArticleWithProfile(fromJS(result),fromJS(res.data.pages),fromJS(pageNum + 1)));
        }).catch(()=>{
            console.log('请求更多推荐文章失败！')
        });
    }
}

export const toggleTopShow = (show) => ({
    type: constants.TOGGLE_SCROLL_TOP,
    show
})

export const getWriters = (userId,writerPageNum) => {
    return (dispatch)=>{
        axios.get(URL+'writers?userId='+userId+'&unFollowed=true&pageNum=' + writerPageNum + '&pageSize=5').then((res) =>{
            const result=res.data;
            console.log(result)
            // TODO：如果作者数为0，则会无限递归，不能这样写，后台应该要返回应该总页数
            if(result.length === 0 ){
                dispatch(getWriters(userId,1)); 
            }else{
                dispatch(setWriterList(fromJS(result),fromJS(writerPageNum+1)));
            }
        }).catch(()=>{
            console.log('请求作者列表失败')
        });
    }
}

export const follow = (userId,followUserId) => {
    return (dispatch)=>{
        axios.post(URL+'follower',{
            'userId':userId,
            'followUserId':followUserId
        }).then((res) =>{
            dispatch(changeFollowedList(fromJS(followUserId),fromJS(true)));
        }).catch((e)=>{
            console.log(e)
            console.log('关注失败')
        });
    }
}

export const unfollow = (userId,followUserId) => {
    return (dispatch)=>{
        axios.delete(URL+'follower?userId='+userId+'&followUserId='+followUserId).then((res) =>{
            dispatch(changeFollowedList(fromJS(followUserId),fromJS(false)));
        }).catch((e)=>{
            console.log(e)
            console.log('取消关注失败')
        });
    }
}

export const changeFollowedList=(followUserId,state)=>({
    type: constants.CHANGE_FOLLOWED_LIST,
    followUserId,
    state
})

const setWriterList = (writerList,writerPageNum) => ({
    type: constants.SET_WRITER_LIST,
    writerList,
    writerPageNum
})
