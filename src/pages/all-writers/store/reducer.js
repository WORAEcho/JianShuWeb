import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    writerListWithProfile:[]
});


export default (state =defaultState, action) => {
    switch(action.type){
        case constants.SET_ALL_WRITER_WITH_PROFILE:
            return state.set('writerListWithProfile',action.resJson)
        default:
            return state;
    }
}