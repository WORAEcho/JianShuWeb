import styled from 'styled-components';

export const HomeWrapper = styled.div`
    overflow: hidden;
    width: 960px;
    margin: 0 auto;
`;

export const HomeLeft = styled.div`
    float: left;
    margin-left: 15px;
    padding-top: 30px;
    width: 625px;
    .banner-img {
        width: 625px;
        height: 270px;
    }
`;

export const HomeRight = styled.div`    
    float: right;
    width: 280px;
`;

export const TopicWrapper =styled.div`
    overflow: hidden;
    padding: 20px 0 10px 0;
    margin-left: -18px;
    border-bottom: 1px solid #dcdcdc;
`;

export const TopicItem = styled.div`
    float: left;
    height: 32px;
    line-height: 32px;
    margin-left: 18px;
    margin-bottom: 18px;
    padding-right: 10px;
    background: #f7f7f7;
    font-size: 14px;
    color: #000;
    border: 1px solid #dcdcdc;
    border-radius: 4px; 
    .topic-pic {
        display: block;
        float: left;
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
`;

export const ListItem = styled.div`
    overflow: hidden;
    border-bottom: 1px solid #f0f0f0;
    .list-pic {
        margin-top: 12.5px;
        display: block;
        width 125px;
        height: 100px;
        float: right;
        border-radius: 10px;
    }
    .article-bottom{
        margin-right: 10px;
        color: #b4b4b4;
        font-size: 12px;
    }
`;

export const ListInfo = styled.div`
    width: 500px;
    float: left;
    margin: 20px 0;
    .title {
        margin: 0 0 4px 0;
        line-height: 27px;
        font-size: 18px;
        font-weight: bold;
        color: #333;
    }
    .desc {
        margin: 0 0 8px 0;
        line-height: 24px;
        font-size: 13px;
        color: #999;
    }
    .icon{
        font-size: 14px;
        margin: 0 3px 0 0;
    }
`;

export const RecommendWrapper =styled.div`
    margin: 30px 0;
    width: 280px;
`;

export const RecommendItem =styled.div`
    width: 280px;
    height: 50px;
    margin-bottom: 5px;
    background: url(${(props)=>props.imgUrl});
    background-size: contain;
`; 

export const WritterWrapper =styled.div`
    width: 278px;
    border-radius: 3px;
    height: 390px;
    text-align: center;
`;

export const LoadMore = styled.div`
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin: 30px 0; 
    background: #a5a5a5;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    cursor: pointer;
`;

export const NoMore = styled.p`
    line-height: 24px;
    font-size: 13px;
    color: #999;
    text-align: center;
`;



export const LoadAll = styled.div`
    float: left;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin: 45px 0; 
    text-align: center;
    color: #787878;
    background-color: #f7f7f7;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;

`;

export const BackTop = styled.div`
    position: fixed;
    right: 100px;
    bottom: 100px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px solid #ccc;
    font-size: 14px;
`;

export const WriterItem = styled.div`
    width: 278px;
    height: 60px;
`;

export const WriterInfo = styled.div`
    display: block;
    float: left;
    width: 278px;
    height: 60px;
    font-size: 14px;
    .avatar_img{
        display: inline;
        margin: 15px 10px 0 0;
        border: 1px solid rgb(221, 221, 221);
        border-radius: 50%;
        float: left;
        width: 50px;
        height: 50px;
    }
    .writer_name{
        display: block;
        padding-top: 20px;
        padding-bottom: 5px;
        width: 128px;
        float: right;
        color: #333;
        font-size: 14px;
        text-align: left;
    }
    .writer_desc{
        display: inline-block;
        width: 208px;
        float: right;
        color: #969696;
        font-size: 12px;
        text-align: left;
    }
`;

export const FollowButtom = styled.div`
    float: right;
    width: 80px;
    height: 30px;
    line-height: 60px;
    color: #42c02e;
    font-size: 13px;
    cursor: pointer;
    text-align: right;
    .icon{
        margin: 0 5px 0 0;
        color: #42c02e;
        font-size: 14px;
    }
    .followed {
        color: #969696;
    }
`;

