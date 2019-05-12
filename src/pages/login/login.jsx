import React, { PureComponent } from 'react';
import { Redirect,Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import HintInfoBox from '../../common/hintInfoBox/HintInfoBox.jsx';
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
    state=({
        emptyValue: false
    })
    render(){
        const { loginStatus,loginFail } =this.props;
        const { emptyValue } = this.state
        if(!loginStatus){
            return (
                <LoginWrapper>
                    {
                        loginFail ? <HintInfoBox value={'账号不存在或密码错误，请重试'}></HintInfoBox> : null
                    }
                    {
                        emptyValue ? <HintInfoBox value={'账号或密码不能为空'}></HintInfoBox> : null
                    }
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
                        <Input  placeholder='账号' 
                                ref={(input)=>{this.account = input}} 
                                onFocus={()=>this.setEmptyValue(false)}
                        ></Input>
                        </InputContainer>
                        <InputContainer className='bottom'>
                            <svg className="icon psw" aria-hidden="true">
                                <use xlinkHref="#icon-ai-password-copy"></use>
                            </svg>
                        <Input  placeholder='密码' 
                                ref={(input)=>{this.password = input}} 
                                type='password' 
                                onFocus={()=>this.setEmptyValue(false)}
                        ></Input>
                        </InputContainer>
                        <RemeberContainer>
                            <Remeber type='checkbox' ref={(input)=>{this.checkbox = input}} ></Remeber>
                            <span>记住我</span>
                        </RemeberContainer>
                        <ForgetPassword>
                            忘记密码
                        </ForgetPassword>
                        <Button className='login' onClick={() => this.login(this.account,this.password,this.checkbox)}>
                            <span>登录</span>
                        </Button>
                    </LoginBox>
                </LoginWrapper>
            )
        }else {
            return <Redirect to='/' />
        }
    }

    setEmptyValue(state){
        this.setState({
            emptyValue: state
        })
    }
    login(accountElem,passwordElem,checkbox){
        const account = accountElem.value
        const password = passwordElem.value
        if(account === '' || password === ''){
            this.setEmptyValue(true)
        }else{
            this.setEmptyValue(false)
            this.props.login(account,password,checkbox.checked)
        }
    }
}


const mapState = (state) => ({
    loginStatus: state.getIn(['login','login']),
    loginFail: state.getIn(['login','loginFail'])
    
});

const mapDispatch = (dispatch) =>({
    login(account,password,checkbox){
        dispatch(actionCreators.login(account,password,checkbox))
    }
});

export default connect(mapState, mapDispatch)(Login);