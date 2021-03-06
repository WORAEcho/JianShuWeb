import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    userProfile: {}
});





export default (state =defaultState, action) => {
    switch(action.type){
        case constants.SET_USER_INFO:
            return state.set('userProfile',action.result);
        default:
            return state;
    }
}