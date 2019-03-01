import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore,NoMore } from '../../home/components/style';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Link } from 'react-router-dom';
import moment from 'moment';

class ArticleList extends PureComponent {
    render(){
        const { getMoreList,articlePageCount,articlePageNum,articleList,pageSum,pageNum,writerId } =this.props;
        return (
            <div>
                {
                    articleList.map((item)=>{
                        const content = item.get('pure_content')+"";
                        return (
                            <Link style={{textDecoration: 'none'}} key={item.get('id')} to={'/detail/' + item.get('id')}>
                                <ListItem>
                                <ListInfo>
                                    <h3 className='title'>{item.get('title')}</h3>
                                    <p className='desc' 
                                    dangerouslySetInnerHTML = 
                                    {{__html: content.length <= 60 ? content : content.substr(0,60)+'...'}}>
                                    </p>
                                    <svg className='article-bottom icon' aria-hidden="true">
                                        <use xlinkHref="#icon-liulanliang"></use>
                                    </svg>
                                    <span className='article-bottom'>999</span>
                                    <svg className='article-bottom icon' aria-hidden="true">
                                        <use xlinkHref="#icon-pinglun2"></use>
                                    </svg>
                                    <span className='article-bottom'>99</span>
                                    <svg className='article-bottom icon' aria-hidden="true">
                                        <use xlinkHref="#icon-aixin"></use>
                                    </svg>
                                    <span className='article-bottom'>{item.get('likeNum')}</span>
                                    <span className='article-bottom'>{moment(item.get('update_time')).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </ListInfo>
                                {/* <img alt='' className='list-pic' src={item.get('imgUrl')} /> */}
                                </ListItem>
                            </Link>
                        );
                    })
                }
                {   articleList.size === 0 ? 
                    <NoMore>该用户暂未发布文章。</NoMore> :
                    pageSum >= pageNum ?
                    <LoadMore onClick={()=>this.getMoreArticleList(writerId,pageNum,10)}>阅读更多</LoadMore> :
                    <NoMore>已经到底啦！</NoMore>
                }

            </div>
        )
    }
    getMoreArticleList(writerId,pageNum,pageSize){
        if(pageNum <= this.props.pageSum){
            this.props.getMoreArticleList(writerId,pageNum,pageSize);
        }else{
            alert('已经到底啦！')
        }
    }
}

const mapState = (state) =>({
    writerId: state.getIn(['userHome','writerId']),
    articlePageCount: state.getIn(['home','articlePageCount']),
    articlePageNum: state.getIn(['home','articlePageNum']),
    articleList: state.getIn(['userHome','articleList']),
    pageSum: state.getIn(['userHome','pageSum']),
    pageNum: state.getIn(['userHome','pageNum'])
})

const mapDispatch = (dispatch) =>({
    getMoreArticleList(writerId,pageNum,pageSize){
        dispatch(actionCreators.getArticleListWithArticleProfile(writerId,pageNum,pageSize));
    },
    getMoreList(pageNum,pageCount) {
        if(pageNum <= pageCount){
            dispatch(actionCreators.getArticleMoreList(pageNum))
        }else{
            alert('已经到底啦！')
        }
    }
})

export default connect(mapState,mapDispatch)(ArticleList);