import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Topic from './components/Topic.jsx';
// import { actionCreators } from '../store';
import Uploader from '../../../common/uploader/uploader.jsx' 
import { 
    SettingRightContainer,
 } from './style';
import './table.css';

class SettingRightBasic extends PureComponent {
    state={
        photoUrl: this.props.avatarImg
    }
    render(){
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
                            <input className='setting-input' placeholder='请输入昵称'></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            手机
                        </td>
                        <td>
                            <div className='button-in-table'>点击绑定</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            常用编辑器
                        </td>
                        <td>
                            <div className='setting-radio editor'>
                                <input type='radio' value='rich'></input><span>富文本</span>
                            </div>
                            <div className='setting-radio editor'>
                                <input type='radio' value='markdown'></input><span>Markdown</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            语言设置
                        </td>
                        <td>
                            <div className='setting-radio language'>
                                <input type='radio' value='chinese'></input><span>简体中文</span>
                            </div>
                            <div className='setting-radio language'>
                                <input type='radio' value='english'></input><span>英文</span>
                            </div>
                        </td>
                    </tr>
                    <tr id='basic-tr6'>
                        <td>
                            接收谁的简信
                        </td>
                        <td>
                            <div className='setting-radio receive1'>
                                <input type='radio' value='all'></input><span>所有人</span>
                            </div>
                            <div className='setting-radio receive2'>
                                <input type='radio' value='follow'></input><span>我关注的人、我发过简信的人</span>
                            </div>
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
export default connect(mapState,mapDispatch)(SettingRightBasic);