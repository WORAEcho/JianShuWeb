import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
// import Topic from './components/Topic.jsx';
// import { actionCreators } from '../store';
import { SettingRightContainer,SendButton } from './style';
import './mailModal.css';
import { InputContainer,Input } from '../../login/components/styled'
import { actionCreators } from '../store';
import { addCookie,editCookie,getCookieValue } from '../../../common/function/cookieFunction.js'

class SettingRightProfile extends PureComponent {
    state={
        photoUrl: this.props.avatarImg,
        emailModal: false,
        mailState: 0,
        mailCaptchaBtnText: '发送验证码',
        phoneCaptchaBtnText: '发送验证码',
        phoneModal: false,
        phoneState: 0,
        radioValue: parseInt(this.props.userProfile.gender)
    }
    
    render(){
        const modalStyle = {
            content: {
                position:'absolute',
                top: '0',
                left: '0',
                bottom: '0',
                right: '0',
                width: '400px',
                height: '300px',
                margin: 'auto',
                zIndex: '99',
                padding: '0'
            }
        }
        const { userId,userProfile,updateProfile } = this.props
        return (
            <SettingRightContainer>
                <ReactModal
                    isOpen = {this.state.emailModal}
                    style={modalStyle}
                    ariaHideApp={false}
                >
                    <header className='bind-mail-header'>
                        <div className='bind-mail-title'>绑定邮箱</div>
                    </header>
                    <div className='bind-mail-close' onClick={()=>this.toggleEmailModal(false)}>x</div>
                    <div className='bind-mail-content'>
                        <InputContainer style={{width:'350px'}} className='top'>
                            <svg className="icon psw" aria-hidden="true">
                                <use xlinkHref="#icon-youjian"></use>
                            </svg>
                            <Input style={{width:'310px',fontSize:'15px'}} 
                                   placeholder='请输入您的常用邮箱' 
                                   ref={(input)=>{this.mail = input}}
                                   onBlur={()=>this.checkMail(this.mail.value)}
                            ></Input>
                        </InputContainer>
                        <InputContainer style={{width:'350px'}} className='bottom'>
                            <svg className="icon psw" aria-hidden="true">
                                <use xlinkHref="#icon-yanzhengma"></use>
                            </svg>
                            {
                                this.state.mailCaptchaBtnText === '发送验证码' ? 
                                <SendButton onClick={()=>this.sendVcode(userId,this.mail.value,'mailCountdown')}>{this.state.mailCaptchaBtnText}</SendButton> :
                                <SendButton onClick={()=>this.sendVcode(userId,this.mail.value,'mailCountdown')} disabled={true} className='disabled'>{this.state.mailCaptchaBtnText}</SendButton>
                            }
                            <Input style={{width:'210px',fontSize:'15px'}} placeholder='验证码' ref={(input)=>{this.mailVcode = input}}></Input>
                        </InputContainer>
                        <SendButton style={{width:'360px',height:'40px',margin: '20px 0',lineHeight:'40px',fontSize:'19px'}}
                                    onClick={()=>this.props.checkMailVcode(userId,this.mail.value,this.mailVcode.value)}
                        >确认</SendButton>
                        {   this.state.mailState === 2 ?
                            <div style={{height:'30px',color:'red',textAlign:'center',fontSize:'13px'}}>
                                邮箱格式错误
                            </div> : null
                        }
                    </div>
                </ReactModal>
                <ReactModal
                    isOpen = {this.state.phoneModal}
                    style={modalStyle}
                    ariaHideApp={false}
                >
                    <header className='bind-mail-header'>
                        <div className='bind-mail-title'>绑定手机</div>
                    </header>
                    <div className='bind-mail-close' onClick={()=>this.togglePhoneModal(false)}>x</div>
                    <div className='bind-mail-content'>
                        <InputContainer style={{width:'350px'}} className='top'>
                            <svg className="icon psw" aria-hidden="true">
                                <use xlinkHref="#icon-tel"></use>
                            </svg>
                            <Input style={{width:'310px',fontSize:'15px'}} 
                                   placeholder='手机号' 
                                   ref={(input)=>{this.phone = input}}
                                   onBlur={()=>this.checkPhone(this.phone.value)}
                            ></Input>
                        </InputContainer>
                        <InputContainer style={{width:'350px'}} className='bottom'>
                            <svg className="icon psw" aria-hidden="true">
                                <use xlinkHref="#icon-yanzhengma"></use>
                            </svg>
                            {
                                this.state.phoneCaptchaBtnText === '发送验证码' ? 
                                <SendButton onClick={()=>this.sendVcode(userId,this.phone.value,'phoneCountdown')}>{this.state.phoneCaptchaBtnText}</SendButton> :
                                <SendButton onClick={()=>this.sendVcode(userId,this.phone.value,'phoneCountdown')} disabled={true} className='disabled'>{this.state.phoneCaptchaBtnText}</SendButton>
                            }
                            <Input style={{width:'210px',fontSize:'15px'}} placeholder='短信验证码' ref={(input)=>{this.phoneVcode = input}}></Input>
                        </InputContainer>
                        <SendButton style={{width:'360px',height:'40px',margin: '20px 0',lineHeight:'40px',fontSize:'19px'}}
                                    onClick={()=>this.props.checkPhoneVcode(userId,this.phone.value,this.phoneVcode.value)}
                        >确认</SendButton>
                        {   this.state.phoneState === 2 ?
                            <div style={{height:'30px',color:'red',textAlign:'center',fontSize:'13px'}}>
                                手机格式错误
                            </div> : null
                        }
                    </div>
                </ReactModal>
                <table>
                    <tbody>
                    <tr id='profile-tr1'>
                        <td className='profile-td-left'>
                            性别
                        </td>
                        <td>
                            <div className='setting-radio sex'>
                                <input  name='sex' 
                                        type='radio' 
                                        value='1'
                                        checked={this.state.radioValue === 1} 
                                        onChange={this.handleRadioChange.bind(this)}>
                                </input>
                                <span>男</span>
                            </div>
                            <div className='setting-radio sex'>
                                <input  name='sex' 
                                        type='radio' 
                                        value='2'
                                        checked={this.state.radioValue === 2}
                                        onChange={this.handleRadioChange.bind(this)}>
                                </input>
                                <span>女</span>
                            </div>
                            <div className='setting-radio sex'>
                                <input  name='sex' 
                                        type='radio' 
                                        value='3'
                                        checked={this.state.radioValue === 3}
                                        onChange={this.handleRadioChange.bind(this)}>
                                </input>
                                <span>保密</span>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            个人简介
                        </td>
                        <td>
                            <textarea defaultValue={userProfile.profile} 
                                        placeholder='填写您的个人简介'
                                        ref={(textarea)=>{this.profile = textarea}}
                                        ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            个人网站
                        </td>
                        <td>
                            <input  className='setting-input' 
                                    id='website-input' 
                                    defaultValue={userProfile.website} 
                                    ref={(input)=>{this.website = input}}
                                    placeholder='http:// 您的网址'></input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            电子邮件
                        </td>
                        <td>
                            {
                                userProfile.email === null || userProfile.phone === undefined ? 
                                <div className='button-in-table' style={{display:'inline-block'}} onClick={()=>this.toggleEmailModal(true)}>点击绑定</div>
                                :
                                <span>{userProfile.email}</span>
                            }
                        </td>
                    </tr>
                    <tr id='profile-tr6'>
                        <td>
                            手机
                        </td>
                        <td>
                            {
                                userProfile.phone === null || userProfile.phone === undefined ?
                                <div className='button-in-table' onClick={()=>this.togglePhoneModal(true)}>点击绑定</div>
                                :
                                <span>{userProfile.phone}</span>
                            }
                        </td>
                    </tr>
                    {/* <tr id='profile-tr6'>
                        <td>
                            社交帐号
                        </td>
                        <td>
                            <input className='setting-input' id='social-account-input' placeholder='您的社交账号'></input>
                        </td>
                    </tr> */}
                    </tbody>
                </table>
                <div className='button-in-table submit'
                     onClick={()=>updateProfile(userId,this.state.radioValue,this.profile.value,this.website.value)}
                >保存</div>
            </SettingRightContainer>
        )
    }
    handleRadioChange(e){
        this.setState({
            radioValue:parseInt(e.target.value)
            }
        )
    }
    handlePhotoUrl(url){
        this.setState({
            photoUrl: url
        })
    }
    toggleEmailModal(state){
        this.setState({
            emailModal: state,
            mailState: 0
        })
    }
    togglePhoneModal(state){
        this.setState({
            phoneModal: state,
            phoneState: 0
        })
    }
    checkMail(mail){
        const uPattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if(mail !== null && mail !== ""){
            if(uPattern.test(mail)){
                this.setState({
                    mailState:1
                })
            }else{
                this.setState({
                    mailState:2
                })
            };
        }
    }
    checkPhone(phone){
        const uPattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        if(phone !== null && phone !== ""){
            if(uPattern.test(phone)){
                this.setState({
                    phoneState:1
                })
            }else{
                this.setState({
                    phoneState:2
                })
            };
        }
    }
    setTime(key){
        let countdown = 60;
        // @ts-ignore
        countdown = getCookieValue(key);
        const timer = setInterval(() => {
            if (countdown <= 0) {
                clearInterval(timer);
                if(key=== 'phoneCountdown'){
                    this.setState({
                        phoneCaptchaBtnText:'发送验证码'
                    })
                }else if(key === 'mailCountdown'){
                    this.setState({
                        mailCaptchaBtnText:'发送验证码'
                    })
                }
            } else {
                if(key=== 'phoneCountdown'){
                    this.setState({
                        phoneCaptchaBtnText:`重新获取,${countdown}s`
                    })
                }else if(key === 'mailCountdown'){
                    this.setState({
                        mailCaptchaBtnText:`重新获取,${countdown}s`
                    })
                }
                countdown--;
            }
            editCookie(key, countdown, countdown + 1);
        }, 1000);
    }
    sendVcode(userId,value,key){
        if((key === 'mailCountdown' && this.state.mailState === 1)||(key === 'phoneCountdown' && this.state.phoneState === 1)){
            addCookie(key, 60, 60);
            const countdown = getCookieValue(key) ? getCookieValue(key) : 0; // 获取cookie值
            if (countdown !== undefined && countdown > 0) {
                this.setTime(key); // 开始倒计时
            }
            if(key === 'mailCountdown'){
                this.props.sendMailVcode(userId,value)
            }else if(key === 'phoneCountdown'){
                this.props.sendPhoneVcode(userId,value)
            }
        }else{
            if(key === 'mailCountdown'){
                this.setState({
                    mailState : 2
                })
            }else if(key === 'phoneCountdown'){
                this.setState({
                    PhoneState : 2
                })
            }
        }
    }
    componentDidMount(){
        const mailCountdown = getCookieValue('mailCountdown') ? getCookieValue('mailCountdown') : 0; // 获取cookie值
        if (mailCountdown !== undefined && mailCountdown > 0) {
            this.setTime('mailCountdown'); // 开始倒计时
        }
        const phoneCountdown = getCookieValue('phoneCountdown') ? getCookieValue('phoneCountdown') : 0; // 获取cookie值
        if (phoneCountdown !== undefined && phoneCountdown > 0) {
            this.setTime('phoneCountdown'); // 开始倒计时
        }
    }
    componentWillUnmount(){

    }
}



const mapState = (state) => ({
    userId: state.getIn(['login','userId']),
    avatarImg: state.getIn(['login','avatarImg']),
    userProfile:state.getIn(['userSetting','userProfile'])
})

const mapDispatch= (dispatch) => ({
    sendMailVcode(userId,mail){
        dispatch(actionCreators.sendMailVcode(userId,mail))
    },
    sendPhoneVcode(userId,phone){
        dispatch(actionCreators.sendPhoneVcode(userId,phone))
    },
    checkMailVcode(userId,mail,vcode){
        dispatch(actionCreators.checkMailVcode(userId,mail,vcode))
    },
    checkPhoneVcode(userId,phone,vcode){
        dispatch(actionCreators.checkPhoneVcode(userId,phone,vcode))
    },
    updateProfile(userId,gender,profile,website){
        profile = profile === '' ? null : profile
        website = website === '' ? null : website
        dispatch(actionCreators.updateProfile(userId,gender,profile,website))
    }
})
export default connect(mapState,mapDispatch)(SettingRightProfile);