import React, { PureComponent } from 'react';
import { ProfileBox,ProfileContent,ProfileTitle } from './style';
import { HomeRight } from '../../home/components/style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
// import { Redirect } from 'react-router-dom';

class HomeUserRight extends PureComponent {
    render(){
        const { userId,gender,profile,website,email,collectionList,anthologyList } =this.props;
        return (
            <HomeRight>
                <ProfileBox>
                    {
                        profile=== '' || profile === null ?
                        <ProfileTitle>暂无个人介绍</ProfileTitle> :
                        <div>
                            <ProfileTitle>个人介绍</ProfileTitle>
                            <ProfileContent>{profile}</ProfileContent>
                        </div>
                    }
                </ProfileBox>

                <ProfileBox>
                    {
                        website=== '' || website === null ?
                        <ProfileTitle>暂未填写个人主页</ProfileTitle> :
                        <div>
                            <ProfileTitle>个人主页</ProfileTitle>
                            <ProfileContent>{website}</ProfileContent>
                        </div>
                    }
                </ProfileBox>

                <ProfileBox>
                    {
                        email=== '' || email === null ?
                        <ProfileTitle>暂未绑定个人邮箱</ProfileTitle> :
                        <div>
                            <ProfileTitle>个人邮箱</ProfileTitle>
                            <ProfileContent>{email}</ProfileContent>
                        </div>
                    }
                </ProfileBox>
                    {
                        collectionList.size > 0 ?
                        <ProfileBox>
                        <ProfileTitle>
                            {
                                gender === 1 ? '他的文集' :
                                gender === 2 ? '她的文集' :
                                '他/她的文集'
                            }
                        </ProfileTitle>
                        {
                            collectionList.map((item)=>{
                                return  <ProfileContent key={item.get('id')}
                                                        style={{paddingTop: '8px'}}
                                        >
                                            <svg className='icon' aria-hidden="true">
                                                <use xlinkHref='#icon-wenji'></use>
                                            </svg>
                                            {item.get('collectionName')}
                                        </ProfileContent>
                            })
                        }
                        </ProfileBox> : null
                    }
                    {
                        anthologyList.size > 0 ?
                        <ProfileBox>
                        <ProfileTitle>
                            {
                                gender === 1 ? '他创建的专题' :
                                gender === 2 ? '她创建的专题' :
                                '他/她创建的专题'
                            }
                            
                        </ProfileTitle>
                        {
                            anthologyList.map((item)=>{
                                return  <ProfileContent key={item.get('id')}
                                                        style={{paddingTop: '8px'}}
                                        >
                                            <img src={item.get('anthologyAvatar')} alt=''></img>
                                            <span className='anthologyName'>{item.get('anthologyName')}</span>
                                        </ProfileContent>
                            })
                        }
                        </ProfileBox> : null
                    }
            </HomeRight>
        )
    }

    componentDidMount(){
        const { userId,getCollectionList,getAnthologyList } = this.props
        getCollectionList(userId)
        getAnthologyList(userId)
    }
}

 
const mapState = (state) =>({
    userId: state.getIn(['login','userId']),
    profile: state.getIn(['userHome','profile']),
    gender: state.getIn(['userHome','gender']),
    website: state.getIn(['userHome','website']),
    email: state.getIn(['userHome','email']),
    collectionList: state.getIn(['userHome','collectionList']),
    anthologyList: state.getIn(['userHome','anthologyList']),
})

const mapDispatch = (dispatch) =>({
    getCollectionList(userId){
        dispatch(actionCreators.getCollectionList(userId))
    },
    getAnthologyList(userId){
        dispatch(actionCreators.getAnthologyList(userId))
    }
})

export default connect(mapState,mapDispatch)(HomeUserRight);