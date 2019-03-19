import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';
import { actionCreators as homeActionCreator } from '../../home/store';
// import { setCookie } from '../../../common/function/commonFunction';

const URL = "http://localhost:8080/";

const changeLogin = (account) =>({
    type: constants.CHANGE_LOGIN,
    value: true,
    user: account
});

const changeRegister = () =>({
    type: constants.CHANGE_REGISTER,
    value: true
});

export const setUserAvatarImg = (userId,avatarImg) =>({
    type: constants.SET_USER_INFO,
    userId,
    avatarImg
});

export const changeUsername = (data) =>({
    type: constants.CHANGE_REGISTER_USERNAME,
    value: data
});

export const logout = () => ({
    type: constants.LOGOUT,
    value: false
});

export const changePassword = (data) =>({
    type: constants.CHANGE_REGISTER_PASSWORD,
    value: data
});

export const changeRePassword = (data) =>({
    type: constants.CHANGE_REGISTER_RE_PASSWORD,
    value: data
});

export const resetState = (data) =>{
    switch(data){
        case "username": return changeUsername(0);
        case "password": return changePassword(0);
        case "rePassword": return changeRePassword(0);
        default :break;
    }
}


export const login = (account, password,checked) => {
    return (dispatch) => {
        axios.post(URL+'login',{
            username: account,
            password: password,
            checked: checked
        }).then((res) => {
            if(res.data.code === 200){
                localStorage.setItem('token', res.data.token)
                dispatch(getUserInfo(account));
            }else{
                alert('登陆失败！')
            }
            // switch(res.data){
            //     case 1: dispatch(getUserInfo(account));break;
            //     case 2: alert('用户名不存在，请先注册。');break;
            //     case 3: alert('密码错误，请重试。');break;
            //     default: alert('登录失败');
            // }
        }).catch(()=>{
            console.log('登录失败')
        });
    }
};

export const getUserInfo = (account) => {
    return (dispatch) => {
        axios.get(URL+'user-info?userName='+account).then((res) => {
            const user=res.data;
            dispatch(changeLogin(account));
            dispatch(setUserAvatarImg(fromJS(user.id),fromJS(user.avatarImg)));
            dispatch(homeActionCreator.getWriters(fromJS(user.id),fromJS(1)));
            dispatch(homeActionCreator.initFollwedList(fromJS(user.id)));
        }).catch(()=>{
            console.log('请求用户信息失败')
        });
    }
};


export const register = (account, password) => {
    return (dispatch) => {
        axios.post(URL+'register',{
            "username":account,
            "password":password
        }).then((res) => {
            if(res.data === 1){
                alert("注册成功！")
                dispatch(changeRegister());
            }else{
                alert('注册失败')
            }
        }).catch((e)=>{
            console.log(e)
            alert('注册失败')
        });
    }
};

export const checkUsername = (account) => {
    return (dispatch) => {
        axios.get(URL+'username/'+account).then((res)=>{
            dispatch(changeUsername(res.data));
        }).catch((e)=>{
            console.log(e);
        });
    }
};




