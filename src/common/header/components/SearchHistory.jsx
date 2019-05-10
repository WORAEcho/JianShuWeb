import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import {
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchHistoryList,
    SearchInfoList,
} from '../style'

class SearchHistory extends Component {

    state=({
        refresh: 0
    })
    
    getListArea(){
        const historyList = this.getHistory();
        const historyItemList = [];
        if(historyList != null && historyList.length){
            for (let i = 0; i < historyList.length ; i++) {
                historyItemList.push(
                    <div key={historyList[i]}>
                    <SearchInfoList className='search-history'>
                        <Link target="_blank" 
                              to={'/search?fuzzyKey='+historyList[i]+'&pageNum=1'} 
                              style={{textDecoration: 'none'}}
                        >
                            <SearchHistoryList>
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#icon-lishi"></use>
                                </svg>
                                {historyList[i]}
                                <svg className="icon hidden" 
                                        aria-hidden="true"
                                        onClick={(e)=>this.clearHistoryItem(e,historyList.length-1-i)}
                                >
                                    <use xlinkHref="#icon-cuo"></use>
                                </svg>
                            </SearchHistoryList>
                        </Link> 
                    </SearchInfoList>
                    </div>
                )
            }
            return (
                <div className='search-history-wrapper'>
                    <SearchInfoTitle className='search-history-title'>
                    最近搜索
                    <SearchInfoSwitch onClick={()=>this.handleClearHistorySearch()}>
                        清空
                    </SearchInfoSwitch>
                    </SearchInfoTitle>
                    {historyItemList}
                </div>
            )
        }else{
            return null
        }
    }

    render(){
        return (
            <div>
                {this.getListArea()}
            </div>
        )
    }

    getHistory(){
        let historySearchList = JSON.parse(localStorage.getItem('search_history'));
        if(historySearchList !== null && historySearchList !== undefined){
            return historySearchList.reverse();
        }
    }

    handleClearHistorySearch(){
        localStorage.clear('search_history')
        this.setState({
            refresh:1
        })
    }


    clearHistoryItem(e,index){
        e.preventDefault();
        let list = JSON.parse(localStorage.getItem('search_history'));
        list.splice(index,1)
        localStorage.setItem('search_history',JSON.stringify(list));

        this.setState({
            refresh:1
        })
    }
}

export default SearchHistory;