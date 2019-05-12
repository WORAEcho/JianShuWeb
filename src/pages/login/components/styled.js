import styled from 'styled-components';

export const LoginWrapper = styled.div`
    z-index: 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #eee;
`;

export const LoginBox = styled.div`
    width: 400px;
    height: 400px;
    margin: 100px auto;
    padding-top: 20px;
    background: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    border-radius: 4px; 
`;

export const TitleContainer = styled.div`
    overflow: hidden;
    padding: 50px 0 50px 130px;
    margin: 0 auto;
    text-align: center;
`;

export const Title = styled.div`
    display: inline;
    color: #969696;
    line-height: 20px;
    margin: 0 auto;
    font-weight: 400;
    font-size: 18px;
    float: left;
    box-sizing: border-box;
    padding: 10px 10px 10px 10px;
    &.active {
        border-bottom: 2px solid red;
        font-weight: 700;
        color: #ea6f5a;
    }
    
`;

export const InputContainer = styled.div`
    line-height: 30px;
    width: 285px;
    height: 40px;
    margin: 0 auto;
    padding: 4px 10px 4px 0px;
    border: 1px solid #969696;
    &.top{
        border-top-left-radius: 4px; 
        border-top-right-radius: 4px; 
        border-bottom: none;
    }
    &.mid{
        border-bottom: none;
    }
    &.bottom{
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
    .icon {
        display: block;
        float: left
        margin: 9px 5px;
        font-size: 25px;
        color: #969696;
    }
    .psw {
        margin: 9px 6px 10px 8px;
        font-size: 20px;
    }
`;

export const Input = styled.input`
    width: 250px;
    height: 40px;
    float: right;
    color: #777;
    border: none;
    outline: none;
`;

export const RemeberContainer = styled.div`
    float: left;
    width: 70px;
    height: 30px;
    line-height: 30px;
    color: #999;
    margin:15px 0 15px 0;
    padding-left: 50px;
    text-align: center;
    .span {
        display: block;
        text-align: center;
        color: #999;
    }
`;

export const Remeber = styled.input`
    float: left;
    width: 16px;
    height: 16px;
    margin: 7px 0 0 0;
`;

export const ForgetPassword = styled.div`
    float: right;
    width: 65px;
    height: 30px;
    line-height: 30px;
    color: #999;
    margin:15px 0 15px 0;
    padding-right: 50px;
    text-align: center;
`;

export const Button = styled.div`
    width: 300px;
    height: 44px;
    line-height: 44px;
    color: #fff;
    border-radius: 25px;
    margin:20px auto;
    font-size: 18px;
    font-weight: 400px;
    text-align: center;
    clear: both;
    &.login{
        background: #3194d0;
    }
    &.register{
        background: #42c02e;
    }
`;

export const CheckInfo = styled.div`
    position: absolute;
    left: 62%;
    max-width: 350px;
    color: #333;
    background-color: #fff;
    border-radius: 4px;
    border:1px solid #ea6f5a;
    padding: 3px 0 3px 8px;
    margin: 20px auto;
    font-size: 14px;
    font-weight: 400px;
    text-align: center;
    box-sizing: border-box;
    word-wrap: break-word;
    .icon{
        padding: 1px 0;
        font-size: 25px;
        float: left;
    }
    .checkInfoContent {
        margin: 5px 3px;
        display: block;
        padding: 0 0 0 25px;
    }
    &.username{
        top:34%;
    }
    &.password{
        top:43%;
    }
    &.rePassword{
        top:53%;
    }
`;

