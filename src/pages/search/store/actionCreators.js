import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const setArticleList = (result,totalPage,articleTotalNum) => ({
    type: constants.SET_ARTICLE_LIST,
    result,
    totalPage,
    articleTotalNum

})

const setUserList = (result,totalPage,userTotalNum) => ({
    type: constants.SET_USER_LIST,
    result,
    totalPage,
    userTotalNum
})

const setAnthologyList = (result,totalPage) => ({
    type: constants.SET_ANTHOLOGY_LIST,
    result,
    totalPage
})


export const getArticleList = (fuzzyKey,orderType,pageNum) => {
    return (dispatch) => {
        axios.get(URL+'article/published/profile/fuzzy?fuzzyKey='+fuzzyKey+'&orderParam='+orderType+'&pageNum='+pageNum+'&pageSize=10').then((res) =>{
            const result=res.data.list;
            const totalPage=res.data.pages;
            const articleTotalNum=res.data.total;
            dispatch(setArticleList(fromJS(result),totalPage,articleTotalNum))
        }).catch(()=>{
            console.log('模糊查询文章列表失败！')
        });
    }
}

export const getUserList = (fuzzyKey,orderType,pageNum) => {
    return (dispatch) => {
        axios.get(URL+'writer/survey?fuzzyKey='+fuzzyKey+'&orderType='+orderType+'&pageNum='+pageNum+'&pageSize=10').then((res) =>{
            const result=res.data.list;
            const totalPage=res.data.pages;
            const userTotalNum=res.data.total;
            dispatch(setUserList(fromJS(result),totalPage,userTotalNum))
        }).catch(()=>{
            console.log('模糊查询用户列表失败！')
        });
    }
}
export const getAnthologyList = (fuzzyKey,pageNum) => {
    return (dispatch) => {
        axios.get(URL+'anthology/fuzzy?key='+fuzzyKey+'&pageNum='+pageNum).then((res) =>{
            const result=res.data.list;
            const totalPage=res.data.pages;
            dispatch(setAnthologyList(fromJS(result),totalPage))
        }).catch(()=>{
            console.log('模糊查询专题列表失败！')
        });
    }
}

