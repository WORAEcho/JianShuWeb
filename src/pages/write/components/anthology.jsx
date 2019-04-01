import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { AnthologyContainer } from './styled';
// import { Link } from 'react-router-dom';

class Anthology extends PureComponent {

    state = {
    }

    render() {
        return (
            <AnthologyContainer>
                <img src='http://upload.jianshu.io/collections/images/38/android.graphics.Bitmap_f3edcb1.jpeg' alt=''/>
                <div style={{overflow:'hidden',display: 'inline-block'}}>
                <span className='title'>读书</span>
                <div className='desc'>253.7K篇文章，4093.8K人关注</div>
                </div>
                <span className='post'>投稿</span>
            </AnthologyContainer>
        )
    }


    componentDidMount() {

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

  
  export default connect(mapStateToProps,mapDispatchToProps)(Anthology);