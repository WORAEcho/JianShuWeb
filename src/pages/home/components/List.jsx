import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore,NoMore } from './style';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Link } from 'react-router-dom';
import moment from 'moment';

class List extends PureComponent {
    render(){
        const { list,getMoreList,articlePageCount,articlePageNum } =this.props;
        return (
            <div>
                {
                    list.map((item)=>{
                        const content = item.get('pure_content')+"";
                        return (
                            <Link key={item.get('articleId')} to={'/detail/' + item.get('articleId')}>
                                <ListItem>
                                <ListInfo style={item.get('cover_img') === undefined ? {width: '620px'} : {width: '450px'}}>
                                    <h3 className='title'>{item.get('title')}</h3>
                                    <p className='desc' 
                                    dangerouslySetInnerHTML = 
                                    {{__html: content.length <= 100 ? content : content.substr(0,100)+'...'}}>
                                    </p>
                                    <span className='article-bottom'>{item.get('nickname')}</span>
                                    <svg className='article-bottom icon' aria-hidden="true">
                                        <use xlinkHref="#icon-pinglun2"></use>
                                    </svg>
                                    <span className='article-bottom'>{item.get('commentTotal')}</span>
                                    <svg className='article-bottom icon' aria-hidden="true">
                                        <use xlinkHref="#icon-aixin"></use>
                                    </svg>
                                    <span className='article-bottom'>{item.get('likeNum')}</span>
                                    <span className='article-bottom'>{moment(item.get('update_time')).format('YYYY-MM-DD HH:mm:ss')}</span>
                                </ListInfo>
                                {
                                    item.get('cover_img') === undefined ? null :
                                    <img alt='' className='list-pic' src={item.get('cover_img')} />
                                }
                                </ListItem>
                            </Link>
                        );
                    })
                }

                {
                    articlePageCount >= articlePageNum ?
                    <LoadMore onClick={()=>getMoreList(articlePageNum,articlePageCount)}>阅读更多</LoadMore> :
                    <NoMore>已经到底啦！</NoMore>
                }

            </div>
        )
    }
    componentDidMount(){
        this.props.getArticleList();
    }
}

const mapState = (state) =>({
    list: state.getIn(['home','articleList']),
    articlePageCount: state.getIn(['home','articlePageCount']),
    articlePageNum: state.getIn(['home','articlePageNum']),
})

const mapDispatch = (dispatch) =>({
    getArticleList(){
        dispatch(actionCreators.getArticleList(1));
    },
    getMoreList(pageNum,pageCount) {
        if(pageNum <= pageCount){
            dispatch(actionCreators.getArticleMoreList(pageNum))
        }else{
            alert('已经到底啦！')
        }
    }
})

export default connect(mapState,mapDispatch)(List);