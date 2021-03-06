import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Topic from './components/Topic.jsx';
// import { actionCreators } from '../store';
import Uploader from '../../../common/uploader/uploader.jsx' 
import { actionCreators } from '../store';
import { 
    SettingRightContainer,
 } from './style';
import './table.css';

class SettingRightBasic extends PureComponent {
    state={
        photoUrl: this.props.avatarImg
    }
    render(){
        const { userId,updateBasic,userProfile } = this.props
        return (
            <SettingRightContainer>
                <table id='basic-table'>
                    <tbody>
                    <tr id='basic-tr1'>
                        <td className='basic-td-left'>
                            <div>
                                <img className='avatar-img' src={this.state.photoUrl} alt='fail'/>
                            </div>
                        </td>
                        <td className='basic-td-right'>
                            <Uploader handlePhotoUrl={this.handlePhotoUrl.bind(this)} myValue='更改头像'></Uploader>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            昵称
                        </td>
                        <td>
                            <input  className='setting-input' 
                                    placeholder='请输入昵称' 
                                    defaultValue={userProfile.nickname} 
                                    ref={(input)=>{this.nickname = input}}></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            常用编辑器
                        </td>
                        <td>
                            <div className='setting-radio editor'>
                                <input name='editor' type='radio' value='rich'></input><span>富文本</span>
                            </div>
                            <div className='setting-radio editor'>
                                <input name='editor' type='radio' value='markdown'></input><span>Markdown</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            语言设置
                        </td>
                        <td>
                            <div className='setting-radio language'>
                                <input name='language' type='radio' value='chinese'></input><span>简体中文</span>
                            </div>
                            <div className='setting-radio language'>
                                <input name='language' type='radio' value='english'></input><span>英文</span>
                            </div>
                        </td>
                    </tr>
                    <tr id='basic-tr6'>
                        <td>
                            接收谁的简信
                        </td>
                        <td>
                            <div className='setting-radio receive1'>
                                <input name='receive' type='radio' value='all'></input><span>所有人</span>
                            </div>
                            <div className='setting-radio receive2'>
                                <input name='receive' type='radio' value='follow'></input><span>我关注的人、我发过简信的人</span>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className='button-in-table submit' onClick={()=>updateBasic(userId,this.state.photoUrl,this.nickname.value)}>保存</div>
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
    userId: state.getIn(['login','userId']),
    userProfile:state.getIn(['userSetting','userProfile'])
})

const mapDispatch= (dispatch) => ({
    updateBasic(userId,avatarImg,nickname){
        avatarImg = avatarImg === '' ? null : avatarImg
        nickname = nickname === '' ? null : nickname
        dispatch(actionCreators.updateBasic(userId,avatarImg,nickname));
    }
    
})
export default connect(mapState,mapDispatch)(SettingRightBasic);