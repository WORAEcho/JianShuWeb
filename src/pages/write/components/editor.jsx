import React, { PureComponent } from 'react';
import E from 'wangeditor'
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { EditorContainer,EditorTitle,Toolbar,Text,TitleInput,SaveButton } from './styled';

class Editor extends PureComponent {

  state = {
    autoSave: false,
  }

    render() {
      const { setArticle,saveArticle,articleId,content,title,ifSaved,hideEditor,myEditor} = this.props;
      return (
        <EditorContainer>
          <EditorTitle>
            <TitleInput ref={(input)=>{this.title = input}}
                        value={hideEditor? '该文集内暂无文章，请点击左侧 新建文章按钮' : title } 
                        onChange={()=>setArticle(articleId,this.title.value,content,this.state.autoSave,myEditor.txt.text())}
                        placeholder='请输入标题...'
            >
            </TitleInput>
          { hideEditor ? null :
            <div>
            <SaveButton onClick={()=>this.autoSave(articleId,this.title.value,content,myEditor.txt.text())}>
              <svg className={this.state.autoSave ? 'save icon autoSave':'save icon'}  aria-hidden="true">
                  <use xlinkHref="#icon-baocun"></use>
              </svg>
              {
                this.state.autoSave ? <span id='ifSave'>{ifSaved ? '已自动保存。':'保存中...'}</span> : <span>自动保存:关</span>
              }
            </SaveButton>
            {
              this.state.autoSave ? null :
                <SaveButton onClick={()=>saveArticle(articleId,this.title.value,content,myEditor.txt.text())}>
                  <svg className={ifSaved ? 'save icon saved' : 'save icon'} aria-hidden="true">
                      <use xlinkHref="#icon-baocun"></use>
                  </svg>
                  <span id={ifSaved ? 'ifSave' : ''}>{ifSaved ? '已保存。':'请手动保存。'}</span>
                </SaveButton>
            }
            </div>
          }
          </EditorTitle>
          <Toolbar ref="toolbarElem" />
          <Text ref="textElem"></Text>
        </EditorContainer>
      );
    }
    autoSave(id,title,content,pureContent){
      this.setState({
        autoSave: (this.state.autoSave ? false: true)
      })
      this.props.saveArticle(id,title,content,pureContent)
    }
    
    componentDidMount() {
      const elem1 = this.refs.toolbarElem;
      const elem2 = this.refs.textElem;
      const editor = new E(elem1,elem2);
      // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
      editor.customConfig.onchange = html => {
        const {setArticle,articleId,title,setIfSaved} = this.props;
        setArticle(articleId,title,html,this.state.autoSave,editor.txt.text());
        setIfSaved(false);
      }
      editor.create();
      this.props.setEditor(editor)
    }
  }

  const mapStateToProps = (state) => (
    {
        articleId: state.getIn(['write', 'articleId']),
        title: state.getIn(['write', 'title']),
        content: state.getIn(['write', 'content']),
        myEditor: state.getIn(['write', 'myEditor']),
        ifSaved: state.getIn(['write', 'ifSaved']),
        hideEditor: state.getIn(['write', 'hideEditor']),
    }
)

  const mapDispatchToProps = (dispatch) => {
    return {
        setEditor(editor){
          dispatch(actionCreators.setEditor(editor));
        },
        selectArticleId(id){
          dispatch(actionCreators.setArticleId(id));
        },
        //set是页面实时刷新
        setArticle(id,title,content,autoSave,pureContent){
          if(autoSave){
            dispatch(actionCreators.saveArticle(id,title,content,pureContent));
            dispatch(actionCreators.setArticle(id,title,content));
          }else{
            dispatch(actionCreators.setArticle(id,title,content));
          }
        },
        //save是保存到数据库
        saveArticle(id,title,content,pureContent){
            dispatch(actionCreators.saveArticle(id,title,content,pureContent));
        },
        setIfSaved(res){
          dispatch(actionCreators.ifSaved(res));
        }
    }
}

  
  export default connect(mapStateToProps,mapDispatchToProps)(Editor);