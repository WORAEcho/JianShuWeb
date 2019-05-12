import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    login: false,
    register: false,
    //默认是0，用户存在是1，用户不存在是2(正确？)，用户名格式不正确是3
    register_username: 0,
    //默认是0，密码格式正确是2，密码格式不正确是3
    register_password: 0,
    register_re_password: 0,
    //user是指userName
    user: '',
    userId: '',
    avatarImg: 'http://pmwmye8w0.bkt.clouddn.com/default-avatar.jpg',
    loginFail: false,
    registerFail: false
});



export default (state =defaultState, action) => {
    switch(action.type){
        case constants.CHANGE_LOGIN:
            return state.merge({
                'login': action.value,
                'user': action.user
            });
        case constants.LOGOUT:
            return state.merge({
                'login': action.value,
                'user': ''
            });
        case constants.CHANGE_REGISTER:
            return state.set('register',action.value);
        case constants.CHANGE_REGISTER_USERNAME:
            return state.set('register_username',action.value); 
        case constants.CHANGE_REGISTER_PASSWORD:
            return state.set('register_password',action.value); 
        case constants.CHANGE_REGISTER_RE_PASSWORD:
            return state.set('register_re_password',action.value);     
        case constants.SET_USER_INFO:
            return state.merge({
                'avatarImg':action.avatarImg,
                'userId':action.userId
            }); 
        case constants.SET_LOGIN_FAIL:
            return state.set('loginFail',action.state);      
        case constants.SET_REGISTER_FAIL:
            return state.set('registerFail',action.state);     
        default:
            return state;
    }
}