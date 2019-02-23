import React, { PureComponent } from 'react';
import { ListContainer,NewArticle,ArticleName } from './styled';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
require('./menu.css')
class ArticleList extends PureComponent {
    state = {
        editorContent: '',
        showMenu: false
      }

    render() {
        const { articleList,collectionId,articleId,title,myEditor,publishedArticleList } =this.props;
      return (
        <ListContainer className='article'>
            <NewArticle onClick={()=>this.newArticle(collectionId)}>            
            <svg className='icon' aria-hidden="true">
                <use xlinkHref="#icon-jiahao-"></use>
            </svg>
            <span id='newArticle'>新建文章</span></NewArticle>
            {
                articleList.reverse().filter((item) => item.get('collectionId') === collectionId)
                    .map((item)=>{
                        let id=item.get('id');
                        const isPublished = publishedArticleList.indexOf(id) !== -1;
                            return (
                                <ArticleName 
                                    className={articleId === id ? 'item active' : 'item'} 
                                    key={id} 
                                    onClick={()=>this.selectArticle(id)}
                                >
                                <svg className={isPublished ? 'icon article published' : 'icon article'} aria-hidden="true">
                                    <use xlinkHref="#icon-wenzhang"></use>
                                </svg>
                                
                                
                                <span className='title'>{articleId === id ? title : item.get('title')}</span>
                                { articleId === id ? <span id='content'>{myEditor.txt.text()}</span> : null }

                                <div>
                                { articleId === id ? <span id='count'>字数:{myEditor.txt.text().length}</span> : null }
                                <svg className={articleId === id ? this.state.showMenu? 'setting icon active clicked' : 'setting icon active' : 'setting icon hidden'}
                                     onClick={()=>this.toggleMenu('toggle')}
                                     aria-hidden="true"
                                >
                                    <use xlinkHref="#icon-Setting"></use>
                                </svg>
                                </div>
                                {
                                articleId === id && this.state.showMenu ? 
                                <div id='article-menu'>
                                    <ul id="menu" 
                                        className="contextmenu"
                                        onMouseOver={()=>this.toggleMenu(true)}
                                        onMouseLeave={()=>this.toggleMenu(false)}
                                    >
                                        
                                    <li onClick={()=>this.publishArticle(id)}><span>
                                    {isPublished ? '已发布' : '发布文章'}    
                                    <svg className="icon" id="publish-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-fabu"></use>
                                    </svg>
                                    </span></li>
                                    <li><span>                
                                    移动文章
                                    <svg className="icon" id="move-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-wenjianjia"></use>
                                    </svg>
                                    </span></li>
                                    <li onClick={()=>this.deleteArticle(id)}><span>                
                                    删除文章
                                    <svg className="icon" id="delete-icon" aria-hidden="true">
                                        <use xlinkHref="#icon-shanchu"></use>
                                    </svg>
                                    </span></li>
                                    </ul>
                                </div> : null
                                }
                                </ArticleName>
                            );
                        })
            }
        </ListContainer>
      );
    }

    toggleMenu(res){
        this.setState({
            showMenu: res === 'toggle' ? this.state.showMenu ? false : true : res
        })
    }
    selectArticle(id){
        this.props.getArticle(id,this.props.myEditor);
    }
    deleteArticle(articleId){
        this.props.deleteArticle(articleId,this.props.collectionId,this.props.myEditor);
    }
    publishArticle(articleId){
        if(this.props.publishedArticleList.indexOf(articleId) === -1){
            this.props.publishArticle(articleId);
        }
    }
    newArticle(collectionId){
        this.props.myEditor.txt.clear();
        this.props.newArticle(collectionId);
    }
}  

const mapStateToProps = (state) => (
    {
        collectionId: state.getIn(['write', 'collectionId']),
        articleId: state.getIn(['write', 'articleId']),
        articleList: state.getIn(['write', 'articleList']),
        content: state.getIn(['write', 'content']),
        title: state.getIn(['write', 'title']),
        myEditor: state.getIn(['write', 'myEditor']),
        user: state.getIn(['login', 'user']),
        publishedArticleList: state.getIn(['write', 'publishedArticleList']),
    }
)

const mapDispatchToProps = (dispatch) => {
    return {
        getArticle(id,editor){
            dispatch(actionCreators.getArticleWithEditor(id,editor));
        },
        newArticle(collectionId){
            dispatch(actionCreators.newArticle(collectionId));
        },
        deleteArticle(articleId,collectionId,editor){
            dispatch(actionCreators.deleteArticle(articleId,collectionId,editor));
        },
        publishArticle(articleId){
            dispatch(actionCreators.publishArticle(articleId));
        }
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(ArticleList);
