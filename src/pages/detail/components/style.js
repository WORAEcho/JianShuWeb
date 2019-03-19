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

export const LikeButtonContainer = styled.div`
    display: inline-block;
    float: left;
    padding: 15px 0 15px 0;
    font-size: 19px;
    border: 1px solid #EA6F5A;
    border-radius: 40px;
    cursor: pointer;
    .like-btn, .likedNum-btn {
        display: inline;
        position: relative;
        color: #EA6F5A;
        .icon {
            color: #EA6F5A;
            padding: 0 0 0 28px;
            margin: 0;
        }
        span {
            padding: 18px 15px 18px 10px;
        }
        .likeNum {
            padding: 18px;
        }
        .avtive{
            color: white;
        }
    }
    .likedNum-btn {
        border-left: 1px solid rgba(236, 97, 73, 0.4);
    }
    .active {
        border-left: 1px solid white;
    }
    &.active {
        background-color: #EA6F5A;
        color: white;
    }

`;

export const CommentContainer = styled.div`
    .comment-submit {
        margin: 100px 0 0 50px;
    }
    textarea {
        padding: 10px 15px;
        margin: 0;
        width: 100%;
        height: 80px;
        font-size: 13px;
        border: 1px solid #dcdcdc;
        border-radius: 4px;
        background-color: hsla(0,0%,71%,.1);
        resize: none;
        display: inline-block;
        vertical-align: top;
        outline-style: none;
        overflow: auto;
        box-sizing: border-box;
        font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    }
    .comment-function-block{
        box-sizing: border-box;
        height: 50px;
        font-size: 13px;
        color: #969696;
        div {
            display: inline-block;
            margin: 20px 20px;
        }
        .icon {
            display: inline-block;
            font-size: 25px;
            margin: 0;
        }
        .send-button {
            box-sizing: border-box;
            font-weight: 400;
            text-align: center; 
            float: right;
            width: 78px;
            height: 40px;
            padding: 5px 18px;
            margin: 10px 0;
            font-size: 16px;
            border: none;
            cursor: pointer;
            outline: none;
        }
        .cancel-button {
            box-sizing: border-box;
            float: right;
            margin: 18px 25px 0 0;
            font-size: 16px;
            color: #969696;
            cursor: pointer;
        }
    }
`;

export const CommentListContainer = styled.div`
    border-top: 1px solid #f0f0f0;
    padding: 20px 0 10px 0;
    img {
        margin: 0 10px 0 0;
    }
    .nick {
        font-size: 15px;
        color: #333;
        cursor: pointer;
        &.reply {
            color: #3194d0;
            font-size: 14px;
        }
    }
    .desc {
        display: block;
        font-size: 12px;
        color: #969696;
        &.reply {
            float:right;
            margin: 0 10px 0 0;
            display: inline-block;
        }
    }
    .icon {
        font-size: 18px;
        margin: 0 5px 0 0;
        color: #969696;
        cursor: pointer;
        &.reply {
            float:right;
            font-size: 14px;
            margin: 0 2px 0 0;
        }
    }
    .content {
        font-size:  16px;
        margin: 10px 0 15px 0;
        &.reply {
            font-size: 14px;
        }
    }
    .like,.replyy {
        font-size:  14px;
        color: #969696;
        cursor: pointer;
        &.reply {
            margin: 0 10px 0 0;
            float:right;
            font-size: 12px;
        }
    }

    .replyy {
        &.reply {
            margin: 0;
        }
    }

    .report {
        display: none;
        color: #969696;
        font-size: 14px;
        float: right;
        cursor: pointer;
        &.reply {
            margin: 0 10px 0 0;
            font-size: 12px;
        }
        &:hover {
            color: #333;
        }
    }
    .comment-submit {
        margin: 0;
        padding: 10px 0 10px 20px;
        border-left: 2px solid #d9d9d9;
        cursor: pointer;
    }
    &:hover {
        .show {
            display: inline-block;
        }
    }
    .func-block {
        margin: 0 25px 0 0;
        overflow: hidden;
        display: inline-block;
        box-sizing: border-box;
        :hover {
            .icon {
                color: #ea6f5a;
            }
            span {
                color: #333;
            }
        }
        &.reply {
            float: right;
            margin: 0;
        }
    }
`;

export const ReplyListContainer = styled.div`
    border-top: 1px solid #f0f0f0;
    padding: 20px 0 10px 0;
    img {
        margin: 0 10px 0 0;
    }
    .nick {
        font-size: 15px;
        color: #333;
        cursor: pointer;
        &.reply {
            color: #3194d0;
            font-size: 14px;
        }
    }
    .desc {
        display: block;
        font-size: 12px;
        color: #969696;
        &.reply {
            float:right;
            margin: 0 10px 0 0;
            display: inline-block;
        }
    }
    .icon {
        font-size: 18px;
        margin: 0 5px 0 0;
        color: #969696;
        &.reply {
            float:right;
            font-size: 14px;
            margin: 0 2px 0 0;
        }
    }
    .content {
        font-size:  16px;
        margin: 10px 0 15px 0;
        &.reply {
            font-size: 14px;
        }
    }
    .like,.replyy {
        font-size:  14px;
        margin: 0 25px 0 0;
        color: #969696;
        cursor: pointer;
        &.reply {
            margin: 0 10px 0 0;
            float:right;
            font-size: 12px;
        }
    }

    .replyy {
        &.reply {
            margin: 0;
        }
    }

    .report {
        display: none;
        color: #969696;
        font-size: 14px;
        float: right;
        cursor: pointer;
        &.reply {
            margin: 0 10px 0 0;
            font-size: 12px;
        }
    }
    .comment-submit {
        margin: 0;
        padding: 10px 0 10px 20px;
        border-left: 2px solid #d9d9d9;
        cursor: pointer;
    }
    &:hover {
        .showw {
            display: inline-block;
        }
    }
`;



export const MoreReply = styled.div`
    padding: 10px 0 15px 15px;
    font-size: 14px;
    color: #969696;
    span {
        margin: 0 10px 0 0;
        color: #3194d0;
        cursor: pointer;
    }
`;