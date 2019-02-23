import styled from 'styled-components';

export const DetailWrapper = styled.div`
    overflow: hidden;
    width: 620px;
    margin: 0 auto;
    padding-bottom: 100px;
`;

export const Header = styled.div`
    margin: 50px 0 0 0;
    line-height: 44px;
    font-size: 34px;
    color: #333;
    font-weight: bold;
`;
export const Author = styled.div`
    margin: 30px 0 40px 0;
    img {
        float: left;
        margin: 0;
        width: 48px;
        height: 48px;
    }
    .author-name {
        color: #2f2f2f;
        font-size: 16px;
        cursor: pointer;
    }
    .button-unfollowed,.button-followed {
        .icon{
            margin: 0 3px 1px 0;
            font-size: 12px;
        }
        display: inline;
        padding: 3px 8px;
        font-size: 12px;
    }
    span {
        color: #969696;
        font-size: 12px;
        padding-right: 10px; 
    }
`;

export const AuthorBottom = styled.div`
    padding: 20px;
    background-color: hsla(0,0%,71%,.1);
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    margin: 20px 0 40px 0;
    .icon {
    font-size: 15px;

        margin: 0;
    }
    img {
        float: left;
        margin: 0;
        width: 48px;
        height: 48px;
    }
    .author-name {
        color: #2f2f2f;
        font-size: 16px;
        cursor: pointer;
        padding-right: 5px;
    }
    .button-unfollowed,.button-followed {
        float: right;
        display: inline-block;

    }
    span {
        color: #969696;
        font-size: 12px;
        padding-right: 10px; 
    }
`;


export const Content = styled.div`
    color: #2f2f2f;
    img {
        width: 100%;
    }
    p {
        margin: 25px 0;
        font-size: 16px;
        line-height: 30px;
    }
    b {
        font-weight: bold;
    }
`;

export const Supprot = styled.div`
    text-align: center;
    p{
        padding: 0 30px;
        margin: 20px 0;
        min-height: 24px;
        font-size: 17px;
        font-weight: 700;
        color: #969696;
    }
    .support-button{
        display: inline-block;
        width: 64px;
        margin-bottom: 20px;
        padding: 8px 25px;
        font-size: 16px;
        color: #fff;
        background-color: #ea6f5a;
        border-radius: 20px;
        cursor: pointer;
    }
`;
export const ArticleFoot = styled.div`
    height: 24px;
    padding: 40px 0 0 0;
    font-size: 12px;
    color: #c8c8c8;
    .icon {
        font-size: 15px;
        float: left;
        margin: 0 5px 0 0;
    }
    .collection {
        float:left;
    }
    .copyright {
        float:right;
    }
    .report {
        float:right;
        padding-right: 20px;
    }
`;
