import styled from 'styled-components';
import logoPic from '../../statics/logo.png'

export const HeaderWrapper = styled.div`
    z-index: 1;
    height:56px;
    border-bottom: 1px solid #f0f0f0;
    padding-top: 0;
`;
export const Logo =styled.div`
    position: absolute;
    top: 0;
    left: 40px;
    dispaly: block;
    width: 100px;
    height: 56px;
    background: url(${logoPic});
    //把图像图像扩展至最大尺寸，以使其宽度和高度完全适应内容区域。
    background-size: contain;
`;

export const Nav = styled.div`
    width: 960px;
    height: 100%;
    box-sizing: border-box;
    margin: 0 auto;
`;

export const NavItem = styled.div`
    line-height: 56px;
    padding: 0 15px;
    font-size: 17px;
    color: #333;
    cursor: pointer;
    .iconfont {
        display: block;
        float: left
        margin-right: 2px;
        font-size: 25px;
    }
    &.left{
        float: left;
    }
    &.right{
        float: right;
        color: #969696;
    }
    &.active{
        color: #ea6f5a;
    }
    &.avatar{
        float: right;
        margin-right: 10px
        padding: 0 15px;
    }
    .icon{
        display: block;
        margin: 20px auto;
        color: #969696;
        font-size: 17px;
    }
    &:hover {
        background: #f5f5f5;
    }
`;

export const SearchWrapper= styled.div`
    position: relative;
    float: left;
    .zoom {
        position: absolute;
        right: 5px;
        bottom: 5px;
        width: 30px;
        line-height:30px;
        border-radius:15px;
        text-align: center;
        &.focused {
            background: #777;
            color: #fff;
        }
    }
    .search-history-title{
        display: none;
    }
`;

export const NavSearch =styled.input.attrs({
    placeholder: '搜索'
})`
    width: 250px;
    height: 38px;
    padding: 0 30px 0 20px;
    margin-top: 9px;
    margin-left: 20px;
    box-sizing: border-box;
    border: none;
    outline: none;
    border-radius: 19px;
    background: #eee;
    font-size: 14px;
    color: #666;
    &::placeholder{
        color: #999;
    }
    &.focused {
        width: 350px;
    }
    &.slide-enter {
        transition: all .4s ease-out;
    }

    &.slide-enter-avtive {
        width: 350px;
    }

    &.slide-exit {
        transition: all .4s ease-out;
    }

    &.slide-exit-active {
        width: 250px;
    }
`;

export const SearchInfo = styled.div`
    z-index: 1;
    position: absolute;
    left: 20px;
    top: 56px;
    width: 220px;
    padding: 0 20px;
    box-shadow: 0 0 8px rgba(0, 0, 0, .2);
    background: #fff;
    border-radius: 4px;
    .search-history-wrapper {
        padding-top: 5px;
        border-top: 1px solid #f0f0f0;
    }
`;

export const SearchInfoTitle = styled.div`
    margin-top: 20px
    margin-bottom: 15px;
    line-height: 20px;
    font-size: 14px;
    color: #969696;
`;

export const SearchInfoSwitch = styled.span`
    float: right;
    font-size: 13px;
    cursor: pointer;
    .spin {
        display: block;
        float: left
        font-size: 13px;
        margin-right: 2px;
        transition: transform .4s ease-in;
        transform-orgin: center center;
    }
    &:hover {
        color: #2f2f2f;
    }
`;

export const SearchInfoList =styled.div`
    overflow: hidden;
    &.search-history {
        margin: 0 -15px;
        &:last-child {
            margin-bottom: 5px;
        }
    }
`;

export const SearchHistoryList =styled.div`
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    height: 40px;
    line-height: 20px;
    padding: 10px 15px;
    font-size: 14px;
    color: #333;
    box-sizing: border-box;
    &:hover {
        background-color: #f0f0f0;
        border-radius: 4px;
        .hidden {
            display: block;
        }
    }
    .icon {
        float: left;
        margin: 0 10px 0 0;
        font-size: 18px;
        color: #787878;
    }
    .hidden {
        display: none;
        float: right;
        color: #a0a0a0;
        margin: 0;
        &:hover {
            color: #2f2f2f;
        }
    }
`;

export const SearchInfoItem = styled.div`
    display:block;
    float: left;
    line-height: 20px;
    padding: 0 5px;
    margin-right: 10px;
    margin-bottom: 15px;
    font-size: 12px;
    border: 1px solid #ddd;
    color: #787878;
    border-radius 3px;
    cursor: pointer;
    &:hover {
        color: #333;
        border-color: #b4b4b4;
    }
`;


export const Addition = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 30px;
    height: 56px;
    .iconfont {
        display: block;
        float: left
        margin-right: 2px;
        font-size: 20px;
    }
`;

export const Button =styled.div`
    float: right;
    margin-top: 9px;
    margin-right: 20px;
    padding: 0 20px
    line-height:38px;
    border-radius: 19px;
    border: 1px solid #ec6149;
    font-size: 14px;
    &.reg{
        text-align: center;
        width: 40px;
        color: #ec6149;
    }
    &.writting{
        color: #fff;
        background: #ec6149;
    }
`;

export const Avatar =styled.img`
    display: block;
    border-radius: 50%;
    float: left;
    width: 38px;
    height: 38px;
    line-height:38px;
    margin-top: 9px;
    margin-right: 10px;
    cursor: pointer;
`;