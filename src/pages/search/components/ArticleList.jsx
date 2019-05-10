import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RightContent } from './style';
import { withRouter,Link } from 'react-router-dom';
import { ListItem,ListInfo } from '../../home/components/style';
import { getUrlParam,dateDiff,highlightKeyWord } from '../../../common/function/commonFunction.js'
import { actionCreators } from '../store'
import './ArticleList.css';
import { Avatar } from '../../all-writers/components/style';
import moment from 'moment';
class ArticleList extends PureComponent {

    render(){
        const { list,totalPage } = this.props
        return (
                <RightContent>
                    <div style={{paddingBottom: '10px'}}>
                        <span className='orderItem'>综合排序 · </span>
                        <span className='orderItem'>最近更新 · </span>
                        <span className='orderItem'>热门专题   |</span>
                        <span className='orderItem'>时间不限</span>
                        <span className='totalCount'>{totalPage} 个结果</span>
                    </div>
                    
                {
                    list.map((item)=>{
                        const content = item.get('pure_content')+"";
                        return (
                            <ListItem  key={item.get('articleId')}>
                            <ListInfo id='search-listInfo'>
                            <div id='search-author'>
                            <Link to={'userhome/'+item.get('userId')}>
                                <Avatar id='search-articlelist-avatar' src={item.get('avatar_img')}></Avatar>
                            </Link>
                            <Link to={'userhome/'+item.get('userId')}>
                                <span id='search-articlelist-username' className='article-bottom'>{item.get('nickname')}</span>
                            </Link>
                            <span id='search-article-time' className='article-bottom'>{dateDiff(moment(item.get('update_time')))}</span>
                            </div>
                            <Link to={'/detail/' + item.get('articleId')}>
                                <h3 id='search-title' 
                                    className='title'
                                    dangerouslySetInnerHTML = {{__html: highlightKeyWord(item.get('title'),getUrlParam('fuzzyKey'))}}
                                ></h3>
                            </Link>
                            <p className='desc' 
                            dangerouslySetInnerHTML = 
                            {{__html: content.length < 400 ? highlightKeyWord(content,getUrlParam('fuzzyKey')) : highlightKeyWord(content,getUrlParam('fuzzyKey')).substr(0,400)+'......'}}>
                            </p>
                            <svg className='article-bottom icon' aria-hidden="true">
                                <use xlinkHref="#icon-pinglun2"></use>
                            </svg>
                            <span className='article-bottom'>99</span>
                            <svg className='article-bottom icon' aria-hidden="true">
                                <use xlinkHref="#icon-aixin"></use>
                            </svg>
                            <span className='article-bottom'>{item.get('likeNum')}</span>
                            </ListInfo>
                            </ListItem>
                        );
                    })
                }

                {/* {
                    articlePageCount >= articlePageNum ?
                    <LoadMore onClick={()=>getMoreList(articlePageNum,articlePageCount)}>阅读更多</LoadMore> :
                    <NoMore>已经到底啦！</NoMore>
                } */}


                </RightContent>
        )
    }

    componentDidMount(){
        let fuzzyKey = getUrlParam('fuzzyKey');
        let pageNum = getUrlParam('pageNum');
        this.props.getArticleList(fuzzyKey,pageNum);
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['search','articleList']),
        totalPage: state.getIn(['search','articleTotalPage']),
        login: state.getIn(['login','login']),
        userId: state.getIn(['login','userId'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList(fuzzyKey,pageNum){
            if(localStorage.getItem('search_history') === null ){
                let searchHistoryArray = [];
                searchHistoryArray.push(fuzzyKey);
                localStorage.setItem('search_history',JSON.stringify(searchHistoryArray));
            }else{
                let searchHistoryArray = JSON.parse(localStorage.getItem('search_history'));
                let index = searchHistoryArray.indexOf(fuzzyKey,0);
                if(index !== -1){
                    searchHistoryArray.splice(index,1);
                    searchHistoryArray.push(fuzzyKey);
                }else{
                    if(searchHistoryArray.length === 5){
                        searchHistoryArray.shift(0,1);
                    }
                    searchHistoryArray.push(fuzzyKey);
                }
                localStorage.setItem('search_history',JSON.stringify(searchHistoryArray));
            }
            dispatch(actionCreators.getArticleList(fuzzyKey,pageNum));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArticleList));