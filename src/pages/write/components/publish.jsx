import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { PublishedModal } from './styled';
import { Link } from 'react-router-dom';
import Uploader from '../../../common/uploader/uploader.jsx' 
import Anthology from './anthology'
import axios from 'axios';

class Publish extends PureComponent {

    state = {
    }

    render() {
        const { hideModal,publishingId,publishingtitle } = this.props
        return (
            <PublishedModal>
                <div className='top'>
                    <div className='hide-btn'>
                        <svg className='icon' aria-hidden="true" onClick={()=>hideModal()}>
                            <use xlinkHref='#icon-cha'></use>
                        </svg>
                    </div>
                    <Link to={'/detail/' + publishingId} style={{textDecoration:'none'}}>
                    <span className='title'>{publishingtitle}</span>
                    <div className='published-hint'>
                        <svg className='icon' aria-hidden="true">
                            <use xlinkHref='#icon-gou'></use>
                        </svg>
                        <span>发布成功，点击查看文章</span>
                    </div>
                    </Link>
                </div>

                <div className='bottom'>
                    <div className='bottom-hint'>为文章添加封面，吸引更多读者</div>
                    <Uploader handlePhotoUrl={this.handlePhotoUrl.bind(this)} 
                              myValue={this.state.photoUrl === undefined ? '设置封面' :'点击更换'}>
                    </Uploader>
                    {
                        this.state.photoUrl === undefined ? null :
                        <div className='article-cover'>
                            <img src={this.state.photoUrl} alt=''/>
                        </div>
                    }
                    <div className='bottom-hint'>向专题投稿，让文章被更多人发现</div>
                    <div className='search'>
                        <svg className='icon' aria-hidden="true">
                            <use xlinkHref='#icon-41'></use>
                        </svg>
                        <input placeholder='搜索专题'></input>
                    </div>
    
                    <div className='anthology-container'>
                        <div className='anthology-title'>推荐文集</div>
                        <Anthology></Anthology>
                        <Anthology className='right'></Anthology>
                        <Anthology></Anthology>
                        <Anthology className='right'></Anthology>
                        <Anthology></Anthology>
                        <Anthology className='right'></Anthology>
                        <Anthology></Anthology>
                        <Anthology className='right'></Anthology>
                        <Anthology></Anthology>
                        <Anthology className='right'></Anthology>
                    </div>
                </div>
            </PublishedModal>
        )
    }


    componentDidMount() {

    }

    componentDidUpdate(prevState) {
        if (this.state.photoUrl !== prevState.photoUrl) {
            axios.put('http://localhost:8080/article',{
                'id':this.props.publishingId,
                'coverImg':this.state.photoUrl
            }).then((res)=>{
                console.log(res.data)
            }).catch(()=>{
                alert('设置文章背景失败！');
            })
        }
    }

    handlePhotoUrl(url){
        this.setState({
            photoUrl: url
        })
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
        publishingId: state.getIn(['write', 'publishingId']),
        publishingtitle: state.getIn(['write', 'publishingtitle']),
    }
)

  const mapDispatchToProps = (dispatch) => {
    return {
        hideModal(){
            dispatch(actionCreators.toggleModal(false));
        }
    }
}

  
  export default connect(mapStateToProps,mapDispatchToProps)(Publish);