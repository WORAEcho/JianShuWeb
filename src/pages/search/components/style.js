import styled from 'styled-components';

export const RightContent = styled.div`
    overflow: hidden;
    width: 625px;
    margin: 0 auto;
    padding-top: 30px;
    .orderItem {
        color: #969696;
        cursor: pointer;
        font-size: 13px;
        &:hover {
            color: #2f2f2f;
        }
    }
    .totalCount {
        color: #969696;
        font-size: 13px;
        float: right;
    }
    a{
        text-decoration: none;
    }
    .button-unfollowed {
        margin: 16px 0;
        display: inline-block;
        float: right;

    }
    .button-followed {
        margin: 16px 0;
        display: inline-block;
        float: right;
    }
`;