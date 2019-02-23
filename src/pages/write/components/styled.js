import styled from 'styled-components';

export const WriterWrapper = styled.div`
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: #fff;
    font-weight: 500;

`;

export const ListContainer = styled.div`
    float: left;
    width: calc((100% - 950px)/2);
    height: 100%;
    background: #404040;
    &.collection{
        width: calc((100% - 950px)/2 - 50px);
    }
    &.article{
        color: #595959;
        width: calc((100% - 950px)/2 + 50px);
        background: #fff;
        overflow-y: scroll;
    }
`;

export const Button = styled.button`
    width: 75%;
    height: 40px;
    margin: 30px 12.5%;
    color: #ec7259;
    background: #404040;
    border: 1px solid rgba(236,114,89,.8);
    border-radius: 20px;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    &#submit{
        display: inline-block;
        width: 20%;
        height: 30px;
        color: #42c02e;
        border-color: #42c02e;
        margin: 0 0 15px 20px;
        border-radius: 15px;
    }
    &#cancel{
        display: inline;
        width: 20%;
        height: 30px;
        color: #999;
        margin: 0;
        border-color: #42c02e;
        border: 0;
    }
`;

export const NewCollection = styled.div`
    width: 40%;
    height: 20px;
    color: #f2f2f2;
    font-size: 15px;
    padding-left: 20px;
    margin: 0 0 15px 0;
    cursor: pointer;
    .icon{
        margin: 0 5px 0 0;
        font-size: 18px;
    }
    .span{
        display: block;
        height: 40px;
    }
`;

export const NewCollectionNameInput = styled.input`
    width: 75%;
    height: 30px;
    margin: 0 20px 10px 20px;
    color: #ccc;
    background-color: #595959;
    border: 1px solid #333;
    padding: 4px 6px;
    font-size: 14px;
`;

export const CollectionName = styled.div`
    width: calc(100% - 44px);
    height: 50px;
    font-size: 15px;
    color: #f2f2f2;
    background-color: #404040;
    padding: 0 22px;
    line-height: 50px;
    cursor: pointer;
    &.active {
        background-color: #666;
        width: calc(100% - 44px - 3px);
        border-left: 3px solid #ec7259;   
    }
    .span{
        overflow: hidden;
        display: block;
        height: 40px;
    }
    .icon{
        margin: 14px auto;
        float: right;
        font-size: 18px;
        cursor: pointer;
        &.hidden{
            display: none;
        }
        &.clicked{
            color: #ec7259;
        }
        &:hover {
            color: #ec7259;
        }
    }
    &:hover{
        background-color: #666;
    }
    
`;
export const NewArticle = styled.div`
    height: 70px;
    padding-left: 30px;
    cursor: pointer;
    .icon{
        float: left;
        margin: 20px auto;
        font-size: 25px;
    }
    #newArticle{
        height: 70px;
        line-height: 70px;
    }
`;

export const ArticleName = styled.div`
    border-top: 1px solid #d9d9d9;
    height: 90px;
    padding: 10px 10px 10px 15px;
    cursor: pointer;
    .icon {
        &.article,.published {
            display: block;
            padding: 20px 15px;
            float: left;
            font-size:30px;
        }
        &.active {
            margin: 10px 0 0 0;
            float: right;
            display: block;
            font-size:22px;
        }
        &.clicked {
            color: #ec7259;
        }
        &.hidden {
            display: none;
        }
        &.save {
            margin: 3px 10px 0 0;
            font-size: 18px;
        }
        &.article {
            color: #595959;
        }
        &.save:hover {
            color: #ec7259;
        }
        &.setting:hover {
            color: #ec7259;
        }
        &.published {
            margin: 10px 0;
            color: #ec7259;
        }
    }
    &.active{
        padding: 10px 10px;
        background-color: #e6e6e6;
        border-left: 5px solid #ec7259;
    }
    .title{
        color: #333;
        width: 60%;
        display: block;
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;    
        font-size: 18px;
    }
    #content{
        width: 60%;
        display:block;
        overflow: hidden;
        white-space:nowrap; 
        text-overflow: ellipsis;
        height: 30px;
        line-height: 30px;
        font-size: 13px;
    }
    #count{
        display: block;
        margin: 20px 0 0 0;
        float: left;
        font-size: 10px;
        line-height: 16px;
        color: #595959;
    }   
    &:hover{
        background-color: #e6e6e6;
    }

`;

export const EditorContainer = styled.div`
    float: right;
    width: 950px;
    height: 100%;
`;

export const EditorTitle = styled.div`
    width: 950px;
    height: 80px;
    float: right;
`;

export const TitleInput = styled.input`
    width: 80%;
    display: inline;
    float: left;
    height: 80px;
    box-sizing: border-box;
    padding: 10px 20px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 80px;
    color: #595959;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    
`;

export const SaveButton = styled.div`
    width: 160px;
    height: 40px;
    display: block;
    float: right;
    cursor: pointer;
    .icon{
        float: left;
        margin: 10px 5px;
        &.autoSave{
            color: #ec7259;
        }
        &.saved{
            color: #ec7259;
        }
    }
    span {
        margin-top: 10px;
        display:block;
        float: left;
        font-size: 16px;
        &#ifSave{
            color: #ec7259;
        }
    }
    &:hover {
        color: #ec7259;
    }
`;


export const Toolbar = styled.div`
    width: 950px;
    float: right;
    background: #d9d9d9;
    border-bottom: 1px solid #ccc;
`;

export const Text = styled.div`
    width: 950px;
    height: calc(100%  - 30.8px - 1px - 80px);
    textAlign: left;
    float: right;
`;


