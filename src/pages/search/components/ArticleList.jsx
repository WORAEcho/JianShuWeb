import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { RightContent,NotFoundResourse } from './style';
import { withRouter,Link } from 'react-router-dom';
import { ListItem,ListInfo } from '../../home/components/style';
import { getUrlParam,dateDiff,highlightKeyWord } from '../../../common/function/commonFunction.js'
import { actionCreators } from '../store'
import './ArticleList.css';
import PageHelper from '../../../common/pageHelper/PageHelper.jsx';
import { Avatar } from '../../all-writers/components/style';
import moment from 'moment';
class ArticleList extends PureComponent {
    state=({
        orderType:'normal',
        initActivePageFlag:false
    })
    render(){
        const { list,totalPage,articleTotalNum } = this.props
        return (
                <RightContent>
                    <div style={{paddingBottom: '10px'}}>
                        <span className='orderItem' onClick={()=>this.changeOrderType('normal')}>综合排序 · </span>
                        <span className='orderItem' onClick={()=>this.changeOrderType('time')}>最新发布 · </span>
                        <span className='orderItem' onClick={()=>this.changeOrderType('hot')}>热门文章</span>
                        <span className='totalCount'>{articleTotalNum} 个结果</span>
                    </div>
                    {
                        list.size === 0 ? 
                        <NotFoundResourse>
                        <img className='not-found-img'  
                             src='http://jianshu-pic.oss-cn-qingdao.aliyuncs.com/static/noResourse.png' 
                             alt=''></img>
                        <div className='not-found-hint'>未找到相关内容</div>
                        </NotFoundResourse> 
                        : null
                    }
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
                                <span id='search-article-time' className='article-bottom'>{item.get('update_time')}</span>
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
                                <span className='article-bottom'>{item.get('commentNum')}</span>
                                <svg className='article-bottom icon' aria-hidden="true">
                                    <use xlinkHref="#icon-aixin"></use>
                                </svg>
                                <span className='article-bottom'>{item.get('likeNum')}</span>
                                </ListInfo>
                                </ListItem>
                            );
                        })
                    }

                    <div style={{textAlign:'center',margin:'30px auto'}}> 
                    {
                        totalPage <= 1 ? null :
                        <PageHelper pageTotal={totalPage}
                                    initActivePageFlag={this.state.initActivePageFlag}
                                    getInfo={(pageNum)=>this.props.getArticleList(getUrlParam('fuzzyKey'),this.state.orderType,pageNum)}
                        ></PageHelper>
                    }
                    </div>
                </RightContent>
        )
    }
    changeOrderType(orderType){
        this.setState({
            orderType: orderType,
            initActivePageFlag: true
        })
    }
    componentDidMount(){
        let fuzzyKey = getUrlParam('fuzzyKey');
        let pageNum = getUrlParam('pageNum');
        const {orderType} = this.state
        this.props.getArticleList(fuzzyKey,orderType,pageNum);
    }
    componentDidUpdate(prevprops,prevState) {
        const {orderType} = this.state
        if (orderType !== prevState.orderType) {
            let fuzzyKey = getUrlParam('fuzzyKey');
            let pageNum = getUrlParam('pageNum');
            this.props.getArticleList(fuzzyKey,orderType,pageNum);
        }
      }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['search','articleList']),
        totalPage: state.getIn(['search','articleTotalPage']),
        articleTotalNum: state.getIn(['search','articleTotalNum']),
        login: state.getIn(['login','login']),
        userId: state.getIn(['login','userId'])

        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getArticleList(fuzzyKey,orderType,pageNum){
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
            dispatch(actionCreators.getArticleList(fuzzyKey,orderType,pageNum));
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ArticleList));