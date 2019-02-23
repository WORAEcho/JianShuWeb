import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    writerId: '',
    followedNum: 0,
    fansNuml: 0,
    nickname: '',
    gender: 0,
    profile: '',
    website: '',
    email: '',
    qdcode_img: '',
    avatar_img: 'http://pmwmye8w0.bkt.clouddn.com/default-avatar.jpg'
});


export default (state =defaultState, action) => {
    switch(action.type){
        case constants.SET_ALL_PROFILE:
            return state.merge({
                'writerId': action.writerId,
                'followedNum': action.followedNum,
                'fansNum': action.fansNum,
                'nickname': action.nickname,
                'gender': action.gender,
                'profile': action.profile,
                'website': action.website,
                'email': action.email,
                'qdcodeImg': action.qdcodeImg,
                'avatarImg': action.avatarImg
            })
        default:
            return state;
    }
}