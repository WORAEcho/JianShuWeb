import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const setArticleList = (result,totalPage) => ({
    type: constants.SET_ARTICLE_LIST,
    result,
    totalPage
})

const setUserList = (result,totalPage) => ({
    type: constants.SET_USER_LIST,
    result,
    totalPage
})

const setAnthologyList = (result,totalPage) => ({
    type: constants.SET_ANTHOLOGY_LIST,
    result,
    totalPage
})


export const getArticleList = (fuzzyKey,pageNum) => {
    return (dispatch) => {
        axios.get(URL+'article/published/profile/fuzzy?fuzzyKey='+fuzzyKey+'&pageNum='+pageNum+'&pageSize=10').then((res) =>{
            const result=res.data.list;
            const totalPage=res.data.pages;
            dispatch(setArticleList(fromJS(result),totalPage))
        }).catch(()=>{
            console.log('模糊查询文章列表失败！')
        });
    }
}

export const getUserList = (fuzzyKey,pageNum) => {
    return (dispatch) => {
        axios.get(URL+'writer/survey?fuzzyKey='+fuzzyKey+'&pageNum='+pageNum+'&pageSize=10').then((res) =>{
            const result=res.data.list;
            const totalPage=res.data.pages;
            dispatch(setUserList(fromJS(result),totalPage))
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

