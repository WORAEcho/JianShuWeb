import styled from 'styled-components';

export const PageNumItem = styled.div`
    min-width: 30px;
    display: inline-block;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin: 5px;
    font-size: 14px;
    color: #969696!important;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    &.active {
        background-color: #eee;
    }
    &.point {
        border: none;
        margin: 5px 0;
        cursor: default;
    }
    &.pageNumItem:hover {
        background-color: #eee;
    }
    .pageNum {
        padding: 10px;
    }

`;