import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const setAllWriterWithProfile = (resJson) => ({
    type: constants.SET_ALL_WRITER_WITH_PROFILE,
    resJson,
})

export const getAllWriterWithProfile = (userId,pageNum) => {
    return (dispatch) => {
        axios.get(URL+'users-profile?userId='+userId+'&role=writer&pageNum='+pageNum+'&pageSize=24').then((res) =>{
            const result=res.data;
            dispatch(setAllWriterWithProfile(fromJS(result)))
        }).catch(()=>{
            console.log('查看全部作家失败')
        });
    }
}