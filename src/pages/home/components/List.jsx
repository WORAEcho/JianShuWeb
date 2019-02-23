import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore,NoMore } from './style';
import { connect } from 'react-redux';
import { actionCreators } from '../store'
import { Link } from 'react-router-dom';

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
                                <ListInfo>
                                    <h3 className='title'>{item.get('title')}</h3>
                                    <p className='desc' 
                                    dangerouslySetInnerHTML = 
                                    {{__html: content.length <= 60 ? content : content.substr(0,60)+'...'}}>
                                    </p>
                                </ListInfo>
                                <img alt='' className='list-pic' src={item.get('imgUrl')} />
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
        console.log(pageNum)
        console.log(pageCount)
        if(pageNum <= pageCount){
            dispatch(actionCreators.getArticleMoreList(pageNum))
        }else{
            alert('已经到底啦！')
        }
    }
})

export default connect(mapState,mapDispatch)(List);