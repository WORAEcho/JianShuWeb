import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Topic from './components/Topic.jsx';
// import { actionCreators } from '../store';
import Uploader from '../../../common/uploader/uploader.jsx' 
import { 
    SettingRightContainer,
 } from './style';

class SettingRightProfile extends PureComponent {
    state={
        photoUrl: this.props.avatarImg
    }
    render(){
        return (
            <SettingRightContainer>
                <table>
                    <tbody>
                    <tr id='profile-tr1'>
                        <td className='profile-td-left'>
                            性别
                        </td>
                        <td>
                            <div className='setting-radio sex'>
                                <input type='radio' value='male'></input><span>男</span>
                            </div>
                            <div className='setting-radio sex'>
                                <input type='radio' value='female'></input><span>女</span>
                            </div>
                            <div className='setting-radio sex'>
                                <input type='radio' value='secrecy'></input><span>保密</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            个人简介
                        </td>
                        <td>
                            <textarea placeholder='填写您的个人简介'></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            个人网站
                        </td>
                        <td>
                            <input className='setting-input' id='website-input' placeholder='http://您的网址'></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            电子邮件
                        </td>
                        <td>
                            <div className='button-in-table'>点击绑定</div>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            微信二维码
                        </td>
                        <td>
                            <Uploader handlePhotoUrl={this.handlePhotoUrl.bind(this)} myValue='更换图片'></Uploader>
                        </td>
                    </tr>
                    <tr id='profile-tr6'>
                        <td>
                            社交帐号
                        </td>
                        <td>

                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className='button-in-table submit'>保存</div>
            </SettingRightContainer>
        )
    }
    handlePhotoUrl(url){
        this.setState({
            photoUrl: url
        })
    }
}



const mapState = (state) => ({
    avatarImg: state.getIn(['login','avatarImg']),
})

const mapDispatch= (dispatch) => ({
    
})
export default connect(mapState,mapDispatch)(SettingRightProfile);