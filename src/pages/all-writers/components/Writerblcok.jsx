import React, { PureComponent } from 'react';
import { withRouter,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Item,Avatar } from './style';
import FollowButton from './FollowButton.jsx';

class WriterBlock extends PureComponent {
    render(){
        const { profileItem } = this.props;
        const writerId=profileItem.get('userId');
        return (
            <div style={{padding: '0 15px',display:'inline-block',float: 'left',border: '0'}}>
                <Item>
                    <Link to={'userHome/'+writerId}><Avatar src={profileItem.get('avatarImg')} alt=''></Avatar></Link>
                    <Link style={{textDecoration:'none'}} to={'userHome/'+writerId}>
                        <h4 className='writer-name'>{profileItem.get('nickname')}
                        <svg className='icon' aria-hidden="true">
                            <use xlinkHref={profileItem.get('gender') === 1 ? "#icon-nan" : "#icon-nv"}></use>
                        </svg>
                        </h4>
                    </Link>
                    <p>{profileItem.get('profile').length <= 25 ? profileItem.get('profile') : profileItem.get('profile').substr(0,25)+'...'}</p>
                    
                    <FollowButton writerId={writerId}>
                    </FollowButton>

                    <hr></hr>
                    <div className='recent-update'>最近更新</div>
                    <div className='recent-update-content'>
                    <a href='www.baidu.com'>灵感和幸福感爆棚，佛陀竟然不是吃素的？aaaa</a>
                    <a href='www.baidu.com'>从星级酒店升级到了简陋床板，出家不aaaa</a>
                    <a href='www.baidu.com'>物质化世界咱咋能健康，快乐，富足？复a</a>
                    </div>
                </Item> 
            </div>
        )

    }
}


const mapState = (state) => ({
    loginStatus: state.getIn(['login', 'login']),
    userId: state.getIn(['login','userId']),
})

const mapDispatch= (dispatch) => ({

})
export default connect(mapState,mapDispatch)(withRouter(WriterBlock));