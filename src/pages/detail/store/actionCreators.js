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