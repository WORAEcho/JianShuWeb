import React, { PureComponent } from 'react';
import { ListContainer,Button,NewCollection,NewCollectionNameInput,CollectionName } from './styled';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
import HintModal from '../components/hintModal';
require('./menu.css')
class CollectionList extends PureComponent {

    state = {
        showNewCollection: '',
        showMenu: false
      }

    render() {
        const { clearStore,collectionList,collectionId,user } = this.props;
      return (
        <ListContainer className='collection'>
            <Link to='/'><Button onClick={clearStore}>返回首页</Button></Link>
            <NewCollection onClick={this.toggleNewCollection.bind(this)}>
                <span>
                <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icon-jiahao-copy"></use>
                </svg>
                新建文集
                </span>
            </NewCollection>
            {
                this.state.showNewCollection ? 
                (<div>
                    <NewCollectionNameInput ref={(input)=>{this.collectionName = input}} placeholder='请输入文集名...'/>
                    <Button id='submit' onClick={()=>this.submit(user,this.collectionName.value)}>提交</Button>
                    <Button id='cancel' onClick={this.cancel.bind(this)}>取消</Button>
                </div>) : null
            }
            {
                collectionList.map((item)=>{
                    let id=item.get('id');
                    return (
                        <CollectionName className={collectionId === id ? 'item active' : 'item' } key={id} onClick={()=>this.selectCollection(id)}>
                        <span >{item.get('collectionName')}</span>
                        <svg className={collectionId === id ? this.state.showMenu? 'setting icon active clicked' : 'setting icon active' : 'setting icon hidden' } 
                             aria-hidden="true" 
                             onClick={()=>this.toggleMenu('toggle')}
                        >
                            <use xlinkHref="#icon-Setting"></use>
                        </svg>
                        {
                            collectionId === id && this.state.showMenu ? 
                            <div id='collection-menu'>
                                <ul id="menu" 
                                    className="contextmenu" 
                                    onMouseOver={()=>this.toggleMenu(true)}
                                    onMouseLeave={()=>this.toggleMenu(false)}
                                >
                                <li><span>    
                                修改文集            
                                <svg className="icon" id="update-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-xiugai"></use>
                                </svg>
                                </span></li>
                                <li><span>                
                                删除文集
                                <svg className="icon" id="delete-icon" aria-hidden="true">
                                    <use xlinkHref="#icon-shanchu"></use>
                                </svg>
                                </span></li>
                                </ul>
                            </div> : null
                        }
                        </CollectionName>
                    );
                })
            }
            <HintModal>aaa</HintModal>
        </ListContainer>
      );
    }

    toggleMenu(res){
        this.setState({
            showMenu: res === 'toggle' ? this.state.showMenu ? false : true : res
        })
    }
    toggleNewCollection(){
        this.setState({
            showNewCollection: true
        })
    }

    submit(user,collectionName){
        this.props.newCollection(user,collectionName,this.props.myEditor);
        this.setState({
            showNewCollection: false
        })
    }
    cancel(){
        this.setState({
            showNewCollection: false,
        })
    }
    selectCollection = (id) => {
        this.props.setCollectionId(id);
        this.props.getArticleList(id,this.props.myEditor);
    }

}

const mapStateToProps = (state) => (
    {
        collectionId: state.getIn(['write', 'collectionId']),
        collectionList: state.getIn(['write', 'collectionList']),
        articleList: state.getIn(['write', 'articleList']),
        articleId: state.getIn(['write', 'articleId']),
        myEditor: state.getIn(['write', 'myEditor']),
        user: state.getIn(['login', 'user'])
    }
)

const mapDispatchToProps = (dispatch) => {
    return {
        clearStore(){
            dispatch(actionCreators.clearStore());
        },
        setCollectionId(id){
            dispatch(actionCreators.setCollectionId(id));
        },
        getArticleList(id,myEditor){
            dispatch(actionCreators.getArticleList(id,myEditor));
        },
        newCollection(user,collectionId,editor){
            dispatch(actionCreators.newCollection(user,collectionId,editor));
        }
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(CollectionList);