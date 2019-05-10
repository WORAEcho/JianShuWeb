import axios from 'axios';
import { fromJS } from 'immutable';
import * as constants from './constants';
import { actionCreators as loginActionCreator } from '../../login/store';
const URL = "http://localhost:8080/";


const setUserInfo = (result) => ({
    type: constants.SET_USER_INFO,
    result
})

export const getUserInfo = (userId) => {
    return (dispatch)=>{
        axios.get(URL+'profile?userId='+userId).then((res) =>{
            const result=res.data;
            console.log(result)
            dispatch(setUserInfo(result))
        }).catch((e)=>{
            console.log(e)
            console.log('查找个人信息失败')
        });
    }
}

export const updateBasic = (userId,avatarImg,nickname) => {
    return (dispatch)=>{
        axios.put(URL+'profile',{
            'userId': userId,
            'avatarImg':avatarImg,
            'nickname': nickname
        }).then((res) =>{
            const result=res.data;
           if(result === 1){
               dispatch(loginActionCreator.setUserAvatarImg(fromJS(userId),fromJS(avatarImg)));
               alert('保存成功')
           }else{
               alert('保存失败')
           }
        }).catch((e)=>{
            console.log(e)
            console.log('更新基础信息失败')
        });
    }
}

export const updateProfile = (userId,gender,profile,website) => {
    return (dispatch)=>{
        axios.put(URL+'profile',{
            'userId': userId,
            'gender': gender,
            'profile': profile,
            'website': website
        }).then((res) =>{
            const result=res.data;
            console.log(userId)
            console.log(gender)
            console.log(website)
            console.log(profile)
            console.log(result)
           if(result === 1){
               dispatch(getUserInfo(userId));
               alert('保存成功')
           }else{
               alert('保存失败')
           }
        })
        // .catch((e)=>{
        //     console.log(e)
        //     console.log('更新简介信息失败')
        // });
    }
}

export const sendMailVcode = (userId,mail) => {
    return ()=>{
        axios.post(URL+'email?userId='+userId+'&emailAddress='+mail).then((res) =>{
            const result=res.data;
           if(result === -1){
               alert('服务器错误，请稍后再试。')
           }else if(result === 0){
               alert('您已绑定邮箱，请勿重复绑定。')
           }else{
                alert('发送成功，请打开QQ邮箱查收邮件。')
           }
        }).catch(()=>{
            console.log('服务器错误，请稍后再试。')
        });
    }
}

export const sendPhoneVcode = (userId,phone) => {
    return ()=>{
        axios.post(URL+'phone?userId='+userId+'&phone='+phone).then((res) =>{
            const result=res.data;
           if(result === -1){
               alert('服务器错误，请稍后再试。')
           }else if(result === 0){
               alert('您已绑定手机，请勿重复绑定。')
           }else{
                alert('发送成功，请查收短信。')
           }
        }).catch(()=>{
            console.log('服务器错误，请稍后再试。')
        });
    }
}

export const checkMailVcode = (userId,mail,vcode) => {
    return ()=>{
        axios.post(URL+'email/vcode?userId='+userId+'&emailAddress='+mail+'&vcode='+vcode).then((res) =>{
            const result=res.data;
            if(result === 0){
                alert('验证码无效或已过期，请重新发送验证码。')
            }else {
                alert('绑定邮箱成功')
            }
        }).catch(()=>{
            console.log('服务器错误，请稍后再试。')
        });
    }
}


export const checkPhoneVcode = (userId,phone,vcode) => {
    return ()=>{
        axios.post(URL+'phone/vcode?userId='+userId+'&phone='+phone+'&vcode='+vcode).then((res) =>{
            const result=res.data;
            if(result === 0){
                alert('验证码无效或已过期，请重新发送验证码。')
            }else {
                alert('绑定手机成功')
            }
        }).catch(()=>{
            console.log('服务器错误，请稍后再试。')
        });
    }
}