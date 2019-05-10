import React, { PureComponent } from 'react';
import { ListContainer,Button,NewCollection,NewCollectionNameInput,UpdateCollectionNameInput,CollectionName } from './styled';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
// import HintModal from '../components/hintModal';
require('./menu.css')
class CollectionList extends PureComponent {

    state = {
        showNewCollection: '',
        showMenu: false,
        ifUpdateCollectionName: false
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
                        <CollectionName className={collectionId === id ? 'item active' : 'item' } key={id} onClick={()=>this.selectCollection(id,collectionId)}>
                        {
                            this.state.ifUpdateCollectionName && collectionId === id  ? 
                            <div>
                                <UpdateCollectionNameInput defaultValue={item.get('collectionName')} ref={(input)=>{this.collectionNameInput=input}}/>
                                <svg className="icon updateCollectionNameButtom"
                                    aria-hidden="true" 
                                    onClick={()=>this.updateCollectionName(id,item.get('collectionName'),this.collectionNameInput.value)}
                                >
                                    <use xlinkHref="#icon-gou"></use>
                                </svg>
                                <svg className="icon updateCollectionNameButtom cancel"
                                    aria-hidden="true" 
                                    onClick={()=>this.toggleUpdateCollectionName(false)}
                                >
                                    <use xlinkHref="#icon-cha"></use>
                                </svg>
                            </div>
                            :
                            <div>
                                <span>{item.get('collectionName')}</span>
                                <svg className={collectionId === id ? this.state.showMenu? 'setting icon active clicked' : 'setting icon active' : 'setting icon hidden' } 
                                    aria-hidden="true" 
                                    onClick={()=>this.toggleMenu('toggle')}
                                >
                                    <use xlinkHref="#icon-Setting"></use>
                                </svg>
                            </div>
                        }

                        {
                            collectionId === id && this.state.showMenu ? 
                            <div id='collection-menu'>
                                <ul id="menu" 
                                    className="contextmenu" 
                                    onMouseOver={()=>this.toggleMenu(true)}
                                    onMouseLeave={()=>this.toggleMenu(false)}
                                >
                                <li onClick={()=>this.toggleUpdateCollectionName(true)}><span>    
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
    selectCollection = (id,collectionId) => {
        //不加判断则更改文集名时点击input会触发此方法，导致失焦
        if(id !== collectionId){
            this.props.setCollectionId(id);
            this.props.getArticleList(id,this.props.myEditor);
        }
    }
    toggleUpdateCollectionName = (state) => {
        this.setState({
            ifUpdateCollectionName: state
        })
    }
    updateCollectionName = (id,beforeCollectionName,updatedCollectionName) => {
        if(beforeCollectionName === updatedCollectionName){
            this.toggleUpdateCollectionName(false)
        }else{
            this.props.updateCollectionName(id,updatedCollectionName)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.collectionId !== prevProps.collectionId || this.props.collectionList !== prevProps.collectionList) {
            this.toggleUpdateCollectionName(false)
        }
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
        },
        updateCollectionName(id,collectionName){
            dispatch(actionCreators.updateCollectionName(id,collectionName));
        }
    }
}

  export default connect(mapStateToProps,mapDispatchToProps)(CollectionList);