import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as writeReducer } from '../pages/write/store';
import { reducer as userHomeReducer } from '../pages/home-user/store';
import { reducer as userSettingReducer } from '../pages/setting-user/store';
import { reducer as allWriterReducer } from '../pages/all-writers/store';
import { reducer as searchReducer } from '../pages/search/store';
import { reducer as subscriptionsReducer } from '../pages/subscriptions/store';

const reducer = combineReducers({
    header: headerReducer,
    home: homeReducer,
    detail: detailReducer,
    login: loginReducer,
    write: writeReducer,
    userHome: userHomeReducer,
    userSetting: userSettingReducer,
    allWriter: allWriterReducer,
    search: searchReducer,
    subscriptions:subscriptionsReducer
});

export default reducer;