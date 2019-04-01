import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { HintModalContainer } from './styled';
import { Link } from 'react-router-dom';
import Uploader from '../../../common/uploader/uploader.jsx' 
import Anthology from './anthology'
import axios from 'axios';

class HintModal extends PureComponent {

    state = {
    }

    render() {
        return (
            <HintModalContainer></HintModalContainer>
        )
    }


    componentDidMount() {

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
            dispatch(actionCreators.toggleHintModal(false));
        }
    }
}

  
  export default connect(mapStateToProps,mapDispatchToProps)(HintModal);