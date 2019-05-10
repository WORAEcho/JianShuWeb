import axios from 'axios';
import * as constants from './constants';
// import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const setSubscriptionsList = (list) => ({
    type: constants.SET_SUBSCRIPTIONS_LIST,
    list
})

export const getSubscriptionsList = (id) => {
    return (dispatch) => {
        axios.get(URL+'follower/avatar?userId='+id).then((res) =>{
            const result=res.data;
            dispatch(setSubscriptionsList(result))
        }).catch(()=>{
            console.log('请求关注列表')
        });
    }
}



