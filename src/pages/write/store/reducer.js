import * as constants from './constants'
import { fromJS } from 'immutable';

const defaultState = fromJS({
    collectionList: [],
    articleList: [],
    collectionId: '',
    articleId: '',
    title: '',
    content: '',
    myEditor: '',
    ifSaved: false,
    hideEditor: false,
    publishedArticleList: []
});

const changePublishedArticleList=(state,action)=>{
    if(action.operation === 'add'){
        return state.set('publishedArticleList',state.get('publishedArticleList').push(action.articleId));
    }
}

export default (state =defaultState, action) => {
    switch(action.type){
        case constants.CLEAR_STORE:
            return state=defaultState;
        case constants.CHANGE_COLLECTION_LIST:
            return state.set('collectionList',action.collectionList);
        case constants.CHANGE_ARTICLE_LIST:
            return state.set('articleList',action.articleList);
        case constants.CHANGE_ARTICLE_ID:
            return state.set('articleId',action.id);
        case constants.CHANGE_COLLECTION_ID:
            return state.set('collectionId',action.id);
        case constants.CHANGE_CONTENT: console.log('im changeed: '+action.content)
            return state.set('content',action.content);
        case constants.CHANGE_ARTICLE:
            return state.merge({
                articleId: action.id,
                title: action.title,
                content: action.content
            })      
        case constants.SET_EDITOR:
            return state.set('myEditor',action.editor);   
        case constants.IFSAVED:
            return state.set('ifSaved',action.res);
        case constants.HIDE_EDITOR: 
            return state.set('hideEditor',action.res);
        case constants.SET_PUBLISHED_ARTICLE_LIST:
            return state.set('publishedArticleList',action.list);
        case constants.CHANGE_PUBLISHED_ARTICLE_LIST:
            return changePublishedArticleList(state,action);
        default:
            return state;
    }
}