import React, { PureComponent } from 'react';
import { AuthorBottom } from './style'
import { withRouter,Link } from 'react-router-dom';
import FollowButton from '../../all-writers/components/FollowButton.jsx';
import { Avatar } from '../../../common/header/style';

class AuthorCard extends PureComponent {

    render(){
        const { userId,avatarImg,nickname,gender,totalWordCount,fansNum,totalLikeCount,profile} =this.props;
        return (
            <AuthorBottom>
                <Link to={'/userhome/'+userId}><Avatar src={avatarImg}></Avatar></Link>
                <div style={{display: 'inline-block',marginLeft: '8px'}}>
                <Link to={'/userhome/'+userId} style={{textDecoration: 'none'}}>
                    <span className='author-name'>{nickname}</span>
                </Link>
                <svg className='icon' aria-hidden="true">
                        <use xlinkHref={gender === 1 ? "#icon-nan" : "#icon-nv"}></use>
                </svg>
                <div>
                    <span>写了 {totalWordCount} 字, </span>
                    <span>被 {fansNum} 人关注, </span>
                    <span>获得了 {totalLikeCount} 个喜欢</span>
                </div>
                </div>
                <FollowButton className='follow-button' id='follow-button' writerId={userId}>关注</FollowButton>
                
                <div className='profile'>
                    <span>{profile}</span>
                </div>
            </AuthorBottom> 
        )
    }
}

export default withRouter(AuthorCard);