import axios from 'axios';
import * as constants from './constants';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";

const allProfile = (writerId,followedNum,fansNum,nickname,gender,profile,website,email,qdcodeImg,avatarImg) =>({
    type: constants.SET_ALL_PROFILE,
    writerId,
    followedNum,
    fansNum,
    nickname,
    gender,
    profile,
    website,
    email,
    qdcodeImg,
    avatarImg
})

export const getProfile = (userId) => {
    return (dispatch) => {
        axios.get(URL+'profile-all?userId='+ userId).then((res) =>{
            const result=res.data;
            const followedNum = fromJS(result.followedNum);
            const fansNum = fromJS(result.fansNum);
            const profileJson= result.profile;
            const writerId = fromJS(profileJson.userId);
            const nickname = fromJS(profileJson.nickname);
            const gender = fromJS(profileJson.gender);
            const profile = fromJS(profileJson.profile);
            const website = fromJS(profileJson.website);
            const email = fromJS(profileJson.email);
            const qdcodeImg = fromJS(profileJson.qdcodeImg);
            const avatarImg= fromJS(profileJson.avatarImg);
            console.log(writerId)
            dispatch(allProfile(writerId,followedNum,fansNum,nickname,gender,profile,website,email,qdcodeImg,avatarImg))
        }).catch(()=>{
            dispatch(allProfile(0,0,'未知的用户',0,'','','','','http://pmwmye8w0.bkt.clouddn.com/default-avatar.jpg'))
            console.log('请求用户信息失败')
        });
    }
}


