import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
    writerId: '',
    followedNum: 0,
    fansNuml: 0,
    articleNum: 0,
    likeNum: 0,
    wordCount: 0,
    nickname: '',
    gender: 0,
    profile: '',
    website: '',
    email: '',
    qdcode_img: '',
    avatar_img: 'http://pmwmye8w0.bkt.clouddn.com/default-avatar.jpg',
    articleList: [],
    pageSum: '',
    pageNum: 1,
    dynamicList: [],
    collectionList: [],
    anthologyList: []
});

const changeArticleList=(state,action)=>{
    const pageSum = action.pageSum; 
    const pageNum = action.pageNum; 
    if(pageNum === 1){
        return state.merge({
            'articleList':action.result,
            'pageSum':pageSum,
            'pageNum':pageNum
        })
    }else{
        return state.merge({
            'articleList':state.get('articleList').concat(action.result),
            'pageSum':pageSum,
            'pageNum':pageNum
        })
    }
}

const changeDynamicList=(state,action)=>{
    const pageSum = action.pageSum; 
    const pageNum = action.pageNum; 
    if(pageNum === 1){
        return state.merge({
            'dynamicList':action.result,
            'pageSum':pageSum,
            'pageNum':pageNum
        })
    }else{
        return state.merge({
            'dynamicList':state.get('dynamicList').concat(action.result),
            'pageSum':pageSum,
            'pageNum':pageNum
        })
    }
}

export default (state =defaultState, action) => {
    switch(action.type){
        case constants.SET_ALL_PROFILE:
            return state.merge({
                'writerId': action.writerId,
                'followedNum': action.followedNum,
                'fansNum': action.fansNum,
                'articleNum': action.articleNum,
                'likeNum': action.likeNum,
                'wordCount': action.wordCount,
                'nickname': action.nickname,
                'gender': action.gender,
                'profile': action.profile,
                'website': action.website,
                'email': action.email,
                'qdcodeImg': action.qdcodeImg,
                'avatarImg': action.avatarImg
            })
        case constants.SET_ARTICLE_LIST:
            return changeArticleList(state,action)
        case constants.SET_DYNAMIC_LIST:
            return changeDynamicList(state,action)
        case constants.SET_COLLECTION_LIST:
            return state.set('collectionList',action.result)
        case constants.SET_ANTHOLOGY_LIST:
            return state.set('anthologyList',action.result)
        default:
            return state;
    }
}