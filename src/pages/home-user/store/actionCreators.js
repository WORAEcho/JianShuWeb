import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const allProfile = (writerId,followedNum,fansNum,articleNum,likeNum,wordCount,nickname,gender,profile,website,email,qdcodeImg,avatarImg) =>({
    type: constants.SET_ALL_PROFILE,
    writerId,
    followedNum,
    fansNum,
    articleNum,
    likeNum,
    wordCount,
    nickname,
    gender,
    profile,
    website,
    email,
    qdcodeImg,
    avatarImg
})

const setArticleList = (result,pageSum,pageNum) =>({
    type: constants.SET_ARTICLE_LIST,
    result,
    pageSum,
    pageNum
})

const setDynamicList = (result,pageSum,pageNum) =>({
    type: constants.SET_DYNAMIC_LIST,
    result,
    pageSum,
    pageNum
})

export const getProfile = (userId) => {
    return (dispatch) => {
        axios.get(URL+'profile-all?userId='+ userId).then((res) =>{
            const result=res.data;
            const followedNum = fromJS(result.followedNum);
            const fansNum = fromJS(result.fansNum);
            const articleNum = fromJS(result.articleNum);
            const likeNum = fromJS(result.likeNum);
            const wordCount = fromJS(result.wordCount);
            const profileJson= result.profile;
            const writerId = fromJS(profileJson.userId);
            const nickname = fromJS(profileJson.nickname);
            const gender = fromJS(profileJson.gender);
            const profile = fromJS(profileJson.profile);
            const website = fromJS(profileJson.website);
            const email = fromJS(profileJson.email);
            const qdcodeImg = fromJS(profileJson.qdcodeImg);
            const avatarImg= fromJS(profileJson.avatarImg);
            dispatch(allProfile(0,0,'',0,'','','','',''))
            dispatch(allProfile(writerId,followedNum,fansNum,articleNum,likeNum,wordCount,nickname,gender,profile,website,email,qdcodeImg,avatarImg))
        }).catch(()=>{
            dispatch(allProfile(0,0,'未知的用户',0,'','','','','http://pmwmye8w0.bkt.clouddn.com/default-avatar.jpg'))
            console.log('请求用户信息失败')
        });
    }
}

export const getArticleListWithArticleProfile = (userId,pageNum,pageSize) => {
    return (dispatch) => {
        axios.get(URL+'user/'+userId+'/article/published/profile?pageNum='+pageNum+'&pageSize='+ pageSize).then((res) =>{
            const result=res.data.list;
            const pageSum=res.data.pages;
            if(pageNum===1){
                dispatch(setArticleList(fromJS([]),fromJS(''),fromJS(1)))
            }
            dispatch(setArticleList(fromJS(result),fromJS(pageSum),fromJS(pageNum+1)))
        }).catch(()=>{
            console.log('请求用户信息失败')
        });
    }
}

export const addClickEvent = (userId,subscriptionType,subscriptionId) => {
    return (dispatch) => {
        axios.post(URL+'subscription/event?userId='+userId+'&subscriptionType='+subscriptionType+'&subscriptionId='+subscriptionId).then((res) =>{
        }).catch(()=>{
            console.log('添加用户点击事件失败')
        });
    }
}

export const getUserAction = (userId,pageNum,pageSize) => {
    return (dispatch) => {
        axios.get(URL+'user/action?userId='+userId+'&pageNum='+pageNum+'&pageSize='+pageSize).then((res) =>{
            const result=res.data.list;
            const pageSum=res.data.pages;
            console.log(pageNum)
            if(pageNum===1||pageNum===""){
                console.log('reset')
                dispatch(setDynamicList(fromJS([]),fromJS(''),fromJS(1)))
            }
            dispatch(setDynamicList(fromJS(result),fromJS(pageSum),fromJS(pageNum+1)))
        }).catch(()=>{
            console.log('请求用户动态失败')
        });
    }
}
