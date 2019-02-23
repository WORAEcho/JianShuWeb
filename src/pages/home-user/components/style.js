import styled from 'styled-components';

export const Head =styled.div`
    overflow:hidden;
    .button {
        display: inline-block;
        padding: 8px 0;
        width: 90px;
        float: right;
        margin: 23px 0 23px 16px;
    }
    .follow, .chat {
        height: 20px;
        width: 90px;
        line-height: 20px;
    }
    .chat {
        background: #fff;
        color: #42c02e;
        &:hover {
            border: 1px solid #42c02e;
            color: #42c02e!important;
            background-color: rgba(59,194,29,.05);
        }
    }
    }
    .button-unfollowed {
        display: inline-block;
        padding: 8px 0;
        float: right;
        margin: 23px 0 23px 16px;
        height: 20px;
        width: 90px;
        line-height: 20px;
    }
    .button-followed {
        display: inline-block;
        padding: 8px 0;
        float: right;
        margin: 23px 0 23px 16px;
        height: 20px;
        width: 90px;
        line-height: 20px;
        border: 1px solid hsla(0,0%,59%,.6);
        background: none;
        color: #8c8c8c;
        &:hover{
            background: none;        
        }
    }
`;

export const Avatar =styled.div`
    float: left;
    width: 78px;
    height: 78px;
    display: inline-block;
    padding: 0 20px 0 0;
`;

export const UserName =styled.div`
    display: inline-block;
    font-size: 21px;
    font-weight: 700;
    vertical-align: middle;
`;

export const BlockWrapper =styled.div`
    overflow: hidden;   
`;

export const Block =styled.div`
    display: inline-block;
    border-right: 1px solid rgba(128, 128, 128,0.2);
    margin: 0 5px 0 0;
    padding: 0 10px 0 0;
    font-size: 12px;
    cursor: pointer;
    color: rgb(150, 150, 150);
    .icon{
        margin: 0 0 0 2px;
        font-size: 6px;
    }
    &#user-home-block6 {
        border: 0;
    }
`;

export const Num =styled.p`
    margin: 5px 0 0 0;
    font-size: 15px;
    color: #333;
`;

export const TriggerMenu =styled.p`
    display: inline-block;
    padding: 13px 20px;
    color: #969696;
    cursor: pointer;
    span {
        font-size: 15px;
        font-weight: 700;
        // line-height: 25px;
    }
    .icon {
        margin: 0 10px 0 0;
    }
    &:hover {
        color: #646464;
        border-bottom: 2px solid rgb(100, 100, 100);
    }
`;



