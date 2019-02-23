import styled from 'styled-components';

export const Head =styled.div`
    width: 960px;
    height: 100px;
    margin: 30px 0 0 0;
    #writers-banner-img{
        width: 960px;
        height: 100px;
    }
`;

export const Body =styled.div`
    width: 990px;
    margin: 0 -15px 20px -15px;
    text-align: center;
`;

export const Item =styled.div`
    width: 258px;
    float: left;
    font-size: 13px;
    margin: 80px 0 0 0;
    padding: 0 20px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
    text-align: center;
    &:hover {
        box-shadow: 0px 5px 20px rgba(0,0,0,.1);
    }
    .writer-name {
        margin: 10px auto;
        font-size: 21px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #333;
    }
    .icon {
        margin: 0 0 0 10px;
    }
    p {
        display: block;
        margin: 10px auto 10px;
        max-width: 180px;
        min-height: 50px;
        font-size: 13px;
        line-height: 25px;
    }
    hr{
        margin: 15px 0;
        border: 0;
        color: #eee;
        border-top: 1px solid #eaeaea;
    }
    .button-unfollowed {
        width: 75px;
        margin: 0 auto;
    }
    .button-followed {
        width: 75px;
        margin: 0 auto;
        border: 1px solid hsla(0,0%,59%,.6);
        background: none;
        color: #8c8c8c;
        &:hover{
            background: none;        
        }
    }
    .followed {
        background: #fff;
    }
    .recent-update {
        margin: -26px 0 0 0;
        padding: 0 10px 0 0;
        float: left;
        font-size: 12px;
        color: #969696;
        background-color: #f8f8f8;
    }
    .recent-update-content {
        height: 75px;
        margin: 0 0 10px 0;
        text-align: center;
        a {
            width: 99%;
            overflow: hidden;
            display: block;
            line-height: 25px;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #333;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    }
`;

export const Avatar =styled.img`
    width: 78px;
    height: 78px;
    border-radius: 50%;
    margin: -39px 0 10px 0;
`;

export const Followbutton =styled.div`
    height: 30px;
    width: 70px;
    line-height: 30px;
    padding: 4px 12px;
    border: 1px solid rgba(59, 194, 29, 0.7);
    border-radius: 40px;  
    font-size: 14px;
    color: #fff
    cursor: pointer;
    text-align: center;
    background-color: #42c02e;
    .icon {
        margin: 0 5px 0 0;
        font-size: 14px;
    }
    &:hover {
        background-color: #3db922;
    }   
    &.button-unfollowed {
        width: 75px;
        margin: 0 auto;
    }
    &.button-followed {
        width: 75px;
        margin: 0 auto;
        border: 1px solid hsla(0,0%,59%,.6);
        background: none;
        color: #8c8c8c;
        &:hover{
            background: none;        
        }
    }
`;



