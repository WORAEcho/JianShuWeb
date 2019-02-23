import React, { PureComponent } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { 
    LoginWrapper,
    LoginBox,
    TitleContainer,
    Title,
    InputContainer,
    Input,
    Button,
    CheckInfo,
 } from './components/styled';



class Register extends PureComponent {
    render(){
        const { registerStatus,usernameStatus,passwordStatus,rePasswordStatus } =this.props;
        if(!registerStatus){
        return (
            <LoginWrapper>
                <LoginBox>
                    <TitleContainer>
                    <Link to='/login'>
                        <Title className='title' >登录</Title>
                    </Link>
                    <Title className='point'><b>·</b></Title>
                    <Link to='/register'>
                        <Title className='title active' >注册</Title>
                    </Link>
                    </TitleContainer>
                    <InputContainer className='top'>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-yonghuming-copy"></use>
                        </svg>
                    <Input placeholder='账号' onFocus={()=>this.props.resetState("username")} onBlur={()=>this.props.checkUsername(this.account)} ref={(input)=>{this.account = input}}></Input>
                    </InputContainer>
                    { (usernameStatus === 0 || usernameStatus === 2) ? null : ( usernameStatus === 1 ? 
                        <CheckInfo className="username">
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-jingshi-copy"></use>
                            </svg>
                            <span className="checkInfoContent">该用户名已被使用，换一个吧。</span>
                        </CheckInfo> : 
                        <CheckInfo className="username">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-jingshi-copy"></use>
                        </svg>
                        <span className="checkInfoContent">用户名格式不正确，需要4-16个字符,只能包含字母、数字、下划线、减号。</span>
                        </CheckInfo>
                        )
                    }
                    <InputContainer className='mid'>
                        <svg className="icon psw" aria-hidden="true">
                            <use xlinkHref="#icon-ai-password-copy"></use>
                        </svg>
                    <Input placeholder='密码' onFocus={()=>this.props.resetState("password")} onBlur={()=>this.props.checkPassword(this.password)} ref={(input)=>{this.password = input}} type='password' ></Input>
                    </InputContainer>
                    { (passwordStatus === 0 || passwordStatus ===2) ? null :
                        <CheckInfo className="password">
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-jingshi-copy"></use>
                        </svg>
                        <span className="checkInfoContent">密码格式不正确，需要6-18个字符，必须包含字母和数字和特殊符号。</span>
                        </CheckInfo>
                    }
                    <InputContainer className='bottom'>
                        <svg className="icon psw" aria-hidden="true">
                            <use xlinkHref="#icon-ai-password-copy"></use>
                        </svg>
                    <Input placeholder='确认密码' onFocus={()=>this.props.resetState("rePassword")} onBlur={()=>this.props.checkRePassword(this.rePassword,this.password)} ref={(input)=>{this.rePassword = input}} type='password' ></Input>
                    </InputContainer>
                    { (rePasswordStatus === 0 || rePasswordStatus ===2) ? null :
                        <CheckInfo className="rePassword"> 
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-jingshi-copy"></use>
                        </svg>
                        <span className="checkInfoContent">两次密码不一致，请重新输入。</span>
                        </CheckInfo>
                    }
                    <Button className='register' onClick={() => this.props.register(this.account,this.password)}>
                        <span>注册</span>
                    </Button>
                </LoginBox>
            </LoginWrapper>
        )
        }else {
            return <Redirect to='/login' />
        }

    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(['login','login']),
    registerStatus: state.getIn(['login','register']),
    usernameStatus: state.getIn(['login','register_username']),
    passwordStatus: state.getIn(['login','register_password']),
    rePasswordStatus: state.getIn(['login','register_re_password'])
});

const mapDispatch = (dispatch) =>({
    register(accountElem,passwordElem){
        dispatch(actionCreators.register(accountElem.value,passwordElem.value))
    },
    checkUsername(accountElem){
        const account = accountElem.value;
        const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        if(account !== null && account !== ""){
            if(uPattern.test(account)){
                dispatch(actionCreators.checkUsername(account));
            }else{
                //匹配失败
                dispatch(actionCreators.changeUsername(3));
            };
        }
    },
    checkPassword(passwordElem){
        const password = passwordElem.value;
        const uPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.]).{6,18}$/;
        if(password !== null && password !== ""){
            if(uPattern.test(password)){
                dispatch(actionCreators.changePassword(2));
            }else{
                dispatch(actionCreators.changePassword(3));
            };
        }
    },
    checkRePassword(rePasswordElem,passwordElem){
        const password = passwordElem.value;
        const rePassword = rePasswordElem.value;
        if(rePassword === password){
            dispatch(actionCreators.changeRePassword(2));
        }else{
            dispatch(actionCreators.changeRePassword(3));
        };
    },
    resetState(data){
        dispatch(actionCreators.resetState(data))
    },
});

export default connect(mapState, mapDispatch)(Register);