import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    subscriptionsList: []
});

export default (state =defaultState, action) => {
    switch(action.type){
        case constants.SET_SUBSCRIPTIONS_LIST:
            return state.set('subscriptionsList',action.list);
        default:
            return state;
    }
}