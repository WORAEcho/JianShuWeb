import React, { PureComponent } from 'react';
import { DynamicHeaderWrapper } from './style';
import { connect } from 'react-redux';
import moment from 'moment';
import { Avatar } from '../../../common/header/style';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';
class DynamicHeader extends PureComponent {
    render(){
        const { writerId,avatarImg,nickname,DynamicInfo,DynamicTime } =this.props;
        return (
            <DynamicHeaderWrapper>
                <Link  to={'/userhome/'+writerId}><Avatar src={avatarImg} style={{margin:'0',width:'24px',height:'24px'}}></Avatar></Link>
                <Link  to={'/userhome/'+writerId}><span className='dynamic-info' style={{color:'#333'}}>{nickname}</span></Link>
                <span className='dynamic-info'>{DynamicInfo}</span>
                <span className='dynamic-info'>{moment(DynamicTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            </DynamicHeaderWrapper>
        )
    }
}

const mapState = (state) =>({
    writerId: state.getIn(['userHome','writerId']),
})

const mapDispatch = (dispatch) =>({

})

export default connect(mapState,mapDispatch)(DynamicHeader);