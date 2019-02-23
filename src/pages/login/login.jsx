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
    RemeberContainer,
    Remeber,
    ForgetPassword,
 } from './components/styled';

class Login extends PureComponent {
    render(){
        const { loginStatus } =this.props;
        if(!loginStatus){
            return (
                <LoginWrapper>
                    <LoginBox>
                        <TitleContainer>
                        <Link to='/login'>
                            <Title className='title active'>登录</Title>
                        </Link>
                        <Title className='point'><b>·</b></Title>
                        <Link to='/register'>
                            <Title className='title' >注册</Title>
                        </Link>
                        </TitleContainer>
                        <InputContainer className='top'>
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref="#icon-yonghuming-copy"></use>
                            </svg>
                        <Input placeholder='账号' ref={(input)=>{this.account = input}}></Input>
                        </InputContainer>
                        <InputContainer className='bottom'>
                            <svg className="icon psw" aria-hidden="true">
                                <use xlinkHref="#icon-ai-password-copy"></use>
                            </svg>
                        <Input placeholder='密码' ref={(input)=>{this.password = input}} type='password' ></Input>
                        </InputContainer>
                        <RemeberContainer>
                            <Remeber type='checkbox' ref={(input)=>{this.checkbox = input}} ></Remeber>
                            <span>记住我</span>
                        </RemeberContainer>
                        <ForgetPassword>
                            忘记密码
                        </ForgetPassword>
                        <Button className='login' onClick={() => this.props.login(this.account,this.password,this.checkbox)}>
                            <span>登录</span>
                        </Button>
                    </LoginBox>
                </LoginWrapper>
            )
        }else {
            return <Redirect to='/' />
        }
    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(['login','login'])
});

const mapDispatch = (dispatch) =>({
    login(accountElem,passwordElem,checkbox){
        dispatch(actionCreators.login(accountElem.value,passwordElem.value,checkbox.checked))
    }
});

export default connect(mapState, mapDispatch)(Login);