import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from 'axios';
import { actionCreators as loginActionCreators } from '../../../pages/login/store'
const URL = "http://localhost:8080/";


const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data: fromJS(data),
    totalPage: Math.ceil(data.length / 10)
})

export const searchFocus = () =>({
    type: constants.SEARCH_FOCUS
})

export const searchBlur = () =>({
    type: constants.SEARCH_BLUR
})

export const mouseEnter = () =>({
    type: constants.MOUSE_ENTER
})

export const mouseLeave = () =>({
    type: constants.MOUSE_LEAVE
})

export const changePage = (page) =>({
    type: constants.CHANGE_PAGE,
    page
})


export const checkLogin = () =>{
    return (dispatch) => {
        axios.get(URL+'checkLogin',{
            headers: {
                // "Cookie" : localStorage.getItem('token'),
                // "Authorization":"Bearer" + localStorage.getItem('token')
                "Authorization":localStorage.getItem('token')
            }
        }).then((res)=>{
            if(res.data.code === 200 && res.data.username !== null && res.data.username !== undefined){
                dispatch(loginActionCreators.getUserInfo(res.data.username));
            }
        }).catch(()=>{
            alert('检验登录token失败')
        })
    }
}

//redux-thunk使函数能返回一个函数，而不是对象
//获取热门搜索
export const getList = () =>{
    return (dispatch) => {
        axios.get(URL+'hot_search').then((res)=>{
            const result= res.data;
            dispatch(changeList(result));
        }).catch(()=>{
            alert('请求热门搜索失败')
        })
    }
}