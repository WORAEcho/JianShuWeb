import styled from 'styled-components';

export const UserSettingWrapper = styled.div`
    overflow: hidden;
    width: 960px;
    margin: 0 auto;
`;

export const SettingLeftContainer = styled.div`
    float: left;
    width: 260px;
    padding-top: 30px;
`;

export const SettingRightContainer = styled.div`    
    padding: 10px 0 0 50px;;
    float: left;
    width: 625px;
`;

export const SettingItemUl = styled.ul` 
    margin: 0;
    list-style: none;   
    padding: 0;
`;



export const SettingItemLi = styled.li`    
    box-sizing: border-box;
    height: 52px;
    padding: 10px 10px;
    font-size: 15px;
    cursor: pointer;
    border-radius: 4px;
    .itemDiv{
        line-height: 32px;
        height: 32px;   
        .iconBackground{
            display: inline-block;
            height: 32px;
            weidth: 32px;
            margin-right: 20px;
            background: #a0a0a0;
            border-radius: 5px;
            .icon{
                color: #fff;
                margin: 7px;
                font-size: 18px;
            }
        }
        span{
            vertical-align: top
            font-size: 15px;
        }
    }
    &.active {
        background: #f0f0f0;
    }
    &:hover{
        background: #f0f0f0;
    }
`;

export const SendButton = styled.button` 
    outline:none;
    border: none;
    float: right;
    width: 100px;
    height: 35px
    line-height: 35px
    border-radius: 18px;  
    font-size: 14px;
    color: #fff
    cursor: pointer;
    text-align: center;
    background: #3194d0;
    margin: 2.5px auto;
    &.disabled{
        opacity: 0.5;
    }
`;