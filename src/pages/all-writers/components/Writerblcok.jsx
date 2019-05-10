import React, { PureComponent } from 'react';
import { withRouter,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Item,Avatar } from './style';
import FollowButton from './FollowButton.jsx';

class WriterBlock extends PureComponent {
    render(){
        const { profileItem } = this.props;
        const proflie = profileItem.get('profile')
        const articles = profileItem.get('articles')
        const writerId=proflie.get('userId');
        return (
            <div style={{padding: '0 15px',display:'inline-block',float: 'left',border: '0'}}>
                <Item>
                    <Link to={'userhome/'+writerId}><Avatar src={proflie.get('avatarImg')} alt=''></Avatar></Link>
                    <Link style={{textDecoration:'none'}} to={'userhome/'+writerId}>
                        <h4 className='writer-name'>{proflie.get('nickname')}
                        <svg className='icon' aria-hidden="true">
                            <use xlinkHref={proflie.get('gender') === 1 ? "#icon-nan" : "#icon-nv"}></use>
                        </svg>
                        </h4>
                    </Link>
                    <p>{proflie.get('profile').length <= 25 ? proflie.get('profile') : proflie.get('profile').substr(0,25)+'...'}</p>
                    
                    <FollowButton writerId={writerId}>
                    </FollowButton>

                    <hr></hr>
                    <div className='recent-update'>最近更新</div>
                    <div className='recent-update-content'>
                    {
                        articles.map((item)=>{
                            return item === null ? null :
                            <Link key={item.get('id')} to={'/detail/' + item.get('id')}>
                                {item.get('title')}
                            </Link>
                        })
                    }

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