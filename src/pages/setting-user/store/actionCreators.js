import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const changeHomeData = (result) => ({
    type: constants.CHANGE_HOME_DATA,
    topicList:result.topicList,
    articleList:result.articleList,
    recommendList:result.recommendList
})

const addHomeList =(list, nextPage) => ({
    type: constants.ADD_ARTICLE_LIST,
    list: fromJS(list),
    nextPage 
})

export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) =>{
            const result=res.data.data;
            dispatch(changeHomeData(result));
        }).catch(()=>{
            console.log('请求home.json失败')
        });
    }
}

export const getMoreList = (page) => {
    return (dispatch)=>{
        axios.get('/api/homeList.json?page=' + page).then((res) =>{
            const result=res.data.data;
            dispatch(addHomeList(result, page + 1));
        }).catch(()=>{
            console.log('请求homeList.json失败')
        });
    }
}

export const toggleTopShow = (show) => ({
    type: constants.TOGGLE_SCROLL_TOP,
    show
})

export const getWriters = (writerPageNum) => {
    return (dispatch)=>{
        axios.get(URL+'writers?role=writer&pageNum=' + writerPageNum + '&pageSize=5').then((res) =>{
            const result=res.data;
            // TODO：如果作者数为0，则会无限递归，不能这样写，后台应该要返回应该总页数
            if(result.length === 0 ){
                dispatch(getWriters(1)); 
            }else{
                dispatch(setWriterList(fromJS(result),fromJS(writerPageNum+1)));
            }
        }).catch(()=>{
            console.log('请求作者列表失败')
        });
    }
}

const setWriterList = (writerList,writerPageNum) => ({
    type: constants.SET_WRITER_LIST,
    writerList,
    writerPageNum
})
