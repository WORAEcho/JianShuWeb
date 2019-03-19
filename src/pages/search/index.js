import React, { PureComponent } from 'react';
import SearchLeft from './components/SearchLeft.jsx';
import ArticleList from './components/ArticleList.jsx';
import UserList from './components/UserList.jsx';
import { 
    UserSettingWrapper,
 } from '../setting-user/components/style';
 
class Search extends PureComponent {
    state={
        itemIndex: 1
    }
    render(){
        const itemIndex = this.state.itemIndex;
        return (
            <UserSettingWrapper>
                <SearchLeft switchItem={this.switchItem.bind(this)}></SearchLeft>
                {
                    itemIndex === 2 ? 
                    <UserList></UserList> :
                    // itemIndex === 3 ?
                    // <SettingRightProfile></SettingRightProfile> :
                    <ArticleList></ArticleList>
                }
                
            </UserSettingWrapper>
        )
    }
    switchItem(index){
        this.setState({
            itemIndex: index
        })
    }
    componentDidMount(){
    }
}


export default Search;