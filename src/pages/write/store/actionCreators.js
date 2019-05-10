import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const URL = "http://localhost:8080/";


export const clearStore = () => ({
    type: constants.CLEAR_STORE
})

export const setEditor = (editor) => ({
    type: constants.SET_EDITOR,
    editor
})

const changeCollectionList = (collectionList) => ({
    type: constants.CHANGE_COLLECTION_LIST,
    collectionList
})

const changeCollectionName = (id,collectionName) => ({
    type: constants.CHANGE_COLLECTION_NAME,
    id,
    collectionName
})
const changeArticleList = (articleList) => ({
    type: constants.CHANGE_ARTICLE_LIST,
    articleList
})

const changeContent = (content) => ({
    type: constants.CHANGE_CONTENT,
    content
})

const initPublishedArticleList = (list) => ({
    type: constants.SET_PUBLISHED_ARTICLE_LIST,
    list
})

const changePublishedArticleList = (articleId,operation) => ({
    type: constants.CHANGE_PUBLISHED_ARTICLE_LIST,
    articleId,
    operation
})

const setPublishingArticleInfo = (id,title) => ({
    type: constants.SET_PUBLISHING_ARTICLE_INFO,
    id,
    title
})


export const toggleModal = (status) => ({
    type: constants.TOGGLE_MODAL,
    status
})

export const setCollectionId = (id) => ({
    type: constants.CHANGE_COLLECTION_ID,
    id
})

export const setArticleId = (id) => ({
    type: constants.CHANGE_ARTICLE_ID,
    id
})

export const setContent = (firstArticleId) =>{
    return (dispatch) => {
         dispatch(changeContent(firstArticleId));
    }
}

export const newArticle = (collectionId) =>{
    return (dispatch) => {
    axios.post(URL+'new_article',{
        'collectionId':collectionId
    }).then((res)=>{
        // dispatch(setArticleId(res.data));
        dispatch(getArticleList(collectionId));
    }).catch(()=>{
        alert('新建文章失败！');
    })
}
}

export const getCollectionList = (user,editor) => {
    return (dispatch) => {
        axios.get(URL+'collection?user='+user).then((res)=>{
            const collectionArray = res.data.reverse();
            const firstCollectionId = collectionArray[0].id;
            dispatch(changeCollectionList(fromJS(collectionArray)));
            dispatch(setCollectionId(fromJS(firstCollectionId)));
            dispatch(getArticleList(firstCollectionId,editor));
        }).catch(()=>{
            console.log('请求文集列表失败！')
        })
    }
}

export const newCollection = (user,collectionName,editor) => {
    return (dispatch) => {
        axios.post(URL+'collection',{
            'user': user,
            'collectionName': collectionName
        }).then((res)=>{
            if(res.data === 1){
                dispatch(getCollectionList(user,editor))
            }else{
                alert('创建文集失败！')
            }
        }).catch((e)=>{
            console.log(e)
            alert('创建文集失败！')
        })
    }
}

export const updateCollectionName = (id,collectionName) => {
    return (dispatch) => {
        axios.put(URL+'collection?id='+id+'&collectionName='+collectionName).then((res)=>{
            if(res.data === 1){
                dispatch(changeCollectionName(id,collectionName))
            }else{
                alert('更新文集名失败！')
            }
        }).catch((e)=>{
            console.log(e)
            alert('更新文集名失败')
        })
    }
}

export const getArticleList = (collectionId,editor) => {
    return (dispatch) => {
        axios.get(URL+'article?collectionId='+collectionId).then((res)=>{
            const articleArray = res.data;
            if(articleArray.length === 0){
                dispatch(hideEditor(true));
                dispatch(changeArticleList(fromJS(articleArray)));
                editor.txt.html('');
                dispatch(setArticle(fromJS(''),fromJS(''),fromJS('')));
            }else{
                dispatch(hideEditor(false));
                const firstArticleId = articleArray[articleArray.length-1].id;
                dispatch(changeArticleList(fromJS(articleArray)));
                dispatch(getArticleWithEditor(fromJS(firstArticleId),editor));
            }
        }).catch((e)=>{
            console.log(e)
            console.log('请求文章列表失败或编辑器未加载！')
        })
    }
}

export const getArticleWithEditor = (articleId,editor) => {
    return (dispatch) => {
        axios.get(URL+'article_content?articleId='+articleId).then((res)=>{
            if(editor !== undefined){
                if(res.data.content === null || res.data.content === "" || res.data.content === undefined){
                    editor.txt.html('');
                }else{
                    editor.txt.html(res.data.content);
                }
            }else{
                console.log('no editor')
            }
            dispatch(setArticle(fromJS(articleId),fromJS(res.data.title),fromJS(res.data.content)));
        })
        .catch((e)=>{
            console.log(e)
            console.log('请求文章失败！')
        })
    }
}

export const getArticle = (articleId) => {
    return (dispatch) => {
        axios.get(URL+'article_content?articleId='+articleId).then((res)=>{
            dispatch(setArticle(articleId,fromJS(res.data.title),fromJS(res.data.content)));
        }).catch(()=>{
            console.log('请求文章失败！')
        })
    }
}

export const saveArticle = (id,title,content,pureContent) => {
    return (dispatch) => {
        axios.put(URL+'article',{
            'id': id,
            'title': title,
            'content': content,
            'pureContent': pureContent,
            'wordCount': pureContent.length
        }).then((res)=>{
            if(res.data === 1){
                dispatch(ifSaved(true));
            }else{
                dispatch(ifSaved(false));
            }
        }).catch(()=>{
            dispatch(ifSaved(false));
        })
    }
}

export const publishArticle = (id,title,userId) => {
    return (dispatch) => {
        axios.put(URL+'article/published?articleId='+id+'&userId='+userId).then((res)=>{
            if(res.data === 1){
                dispatch(setPublishingArticleInfo(id,title))
                dispatch(changePublishedArticleList(fromJS(id),fromJS('add')))
            }else{
                console.log('修改发布列表失败')
            }
        }).catch((e)=>{
            console.log(e)
            console.log('发布失败')
        })
    }
}

export const disPublishArticle = (id) => {
    return (dispatch) => {
        axios.put(URL+'article/dispublish?articleId='+id).then((res)=>{
            if(res.data === 1){
                dispatch(changePublishedArticleList(fromJS(id),fromJS('subtract')))
            }else{
                console.log('修改发布列表失败')
            }
        }).catch((e)=>{
            console.log(e)
            console.log('取消发布失败')
        })
    }
}

export const publishedArticleIdList = (userId) => {
    return (dispatch) => {
        axios.get(URL+'article/published/id?userId='+userId).then((res)=>{
            dispatch(initPublishedArticleList(fromJS(res.data)))
        }).catch(()=>{
            console.log('修改发布列表失败')
        })
    }
}

export const deleteArticle = (articleId,collectionId,editor) => {
    return (dispatch) => {
        axios.delete(URL+'article?articleId='+articleId).then((res)=>{
            if(res.data === 1){
                dispatch(getArticleList(collectionId,editor));
            }else{
                alert('删除失败！')
            }
        }).catch((e)=>{
            console.log(e)
            alert('删除失败！')
        })
    }
}

export const getAnthlogyList = (pageNum,pageSize) => {
    return (dispatch) => {
        axios.get(URL+'anthology?pageNum='+pageNum+'&pageSize='+pageSize).then((res)=>{
            dispatch(setAnthlogyList(res.data.list))
        }).catch((e)=>{
            console.log(e)
            alert('请求专题失败！')
        })
    }
}

export const postArticle = (publishingId) => {
    return (dispatch) => {
        axios.post(URL+'article/post?publishingId='+publishingId).then((res)=>{
            if(res.data === 1){
                alert('投稿成功！')
            }else{
                alert('投稿失败！')
            }
        }).catch((e)=>{
            console.log(e)
            alert('投稿失败！')
        })
    }
}

export const setAnthlogyList = (res) => ({
    type: constants.SET_ANTHLOGYLIST,
    res
})

export const ifSaved = (res) => ({
    type: constants.IFSAVED,
    res
})

export const setArticle = (id,title,content) => ({
    type: constants.CHANGE_ARTICLE,
    id,
    title,
    content
})

export const hideEditor = (res) => ({
    type: constants.HIDE_EDITOR,
    res
})

export const getWriteData = (user,editor) =>{
    return (dispatch) => {
        dispatch(getCollectionList(user,editor));
    }
}

