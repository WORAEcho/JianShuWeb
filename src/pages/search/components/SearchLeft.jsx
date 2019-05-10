import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    SettingLeftContainer,
    SettingItemUl,
    SettingItemLi,
 } from '../../setting-user/components/style';
 import {SearchInfo,SearchInfoTitle,SearchInfoList,SearchInfoSwitch,SearchInfoItem} from '../../../common/header/style';
 import { actionCreators as headerActionCreators } from '../../../common/header/store';
 import './SearchLeft.css';
 import SearchHistory from '../../../common/header/components/SearchHistory.jsx'
 
class SearchLeft extends PureComponent {
    state=({
        selected: 1
    })
    render(){
        const { totalPage, list, page, handleChangePage} = this.props;
        const jsList = list.toJS();
        const pageList = [];
        if(jsList.length){
            for (let i = (page-1) * 10; i < page * 10; i++) {
                pageList.push(
                    <Link key={jsList[i]} target="_blank" to={'/search?fuzzyKey='+jsList[i]+'&pageNum=1'}>
                        <SearchInfoItem>{jsList[i]}</SearchInfoItem>
                    </Link>
                )
            }
        }
        return (
                <SettingLeftContainer>
                    <SettingItemUl>
                        <SettingItemLi onClick={()=>this.switchItem(1)} className={this.state.selected === 1 ? 'active' : ''}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-wenzhang1"></use>
                                    </svg>
                                </div>
                                <span>文章</span>
                            </div>
                        </SettingItemLi>
                        <SettingItemLi onClick={()=>this.switchItem(2)} className={this.state.selected === 2 ? 'active' : ''}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-tubiao211"></use>
                                    </svg>
                                </div>
                                <span>用户</span>
                            </div>
                        </SettingItemLi>
                        <SettingItemLi onClick={()=>this.switchItem(3)} className={this.state.selected === 3 ? 'active' : ''}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-yingyongzhongxin"></use>
                                    </svg>
                                </div>
                                <span>专题</span>
                            </div>     
                        </SettingItemLi>
                    </SettingItemUl>

                    <SearchInfo id='searchInfo' style={{zIndex:'0'}}>
                        <SearchInfoTitle>
                            热门搜索
                            <SearchInfoSwitch onClick={()=>handleChangePage(page, totalPage, this.spinIcon)}>
                                <i ref={(icon) =>{this.spinIcon =icon}} className="iconfont spin">&#xe851;</i>
                                换一批
                            </SearchInfoSwitch>
                        </SearchInfoTitle>
                        <SearchInfoList style={{paddingBottom: '10px'}}>
                            {pageList}
                        </SearchInfoList>
                        <SearchHistory></SearchHistory>
                    </SearchInfo>


                </SettingLeftContainer>
        )
    }
    switchItem(index){
        this.props.switchItem(index)
        this.setState({
            selected: index
        })
    }

    componentDidMount(){
        this.props.handleInputFocus(this.props.list);
    }

    
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        totalPage: state.getIn(['header','totalPage']),
        login: state.getIn(['login','login']),
        userId: state.getIn(['login','userId'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list){
            (list.size === 0) && dispatch(headerActionCreators.getList());
        },
        handleChangePage(page, totalPage, spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
            if(originAngle){
                originAngle = parseInt(originAngle ,10);
            }else{
                originAngle = 0;
            }
            spin.style.transform = 'rotate('+(originAngle + 360)+'deg)'
            if(page < totalPage){
                dispatch(headerActionCreators.changePage(page + 1));
            }else{
                dispatch(headerActionCreators.changePage(1));
            }
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchLeft);