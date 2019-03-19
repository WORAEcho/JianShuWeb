import React, { Component} from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { actionCreators }  from './store';
import { Link } from 'react-router-dom';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    SearchWrapper,
    NavSearch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoItem,
    SearchInfoList,
    Addition,
    Button,
    Avatar
} from './style';
import SearchHistory from './components/SearchHistory.jsx';


class Header extends Component {
    
    state = {
        showMenu: false,
      }

    getListArea(){
        const { totalPage, mouseIn,focused, list, page, handleMouseEnter, handleMouseLeave, handleChangePage} = this.props;
        const jsList = list.toJS();
        const pageList = [];
        if(jsList.length){
            for (let i = (page-1) * 10; i < page * 10; i++) {
                pageList.push(
                    <Link key={jsList[i]} target="_blank" to={'search?fuzzyKey='+jsList[i]+'&pageNum=1'}>
                    <SearchInfoItem>{jsList[i]}</SearchInfoItem>
                    </Link>
                )
            }
        }

        if(focused || mouseIn){
            return (
            <SearchInfo 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch onClick={()=>handleChangePage(page, totalPage, this.spinIcon)}>
                        <i ref={(icon) =>{this.spinIcon =icon}} className="iconfont spin">&#xe851;</i>
                        换一批
                    </SearchInfoSwitch>
                </SearchInfoTitle>
                <SearchInfoList className='hot-search'>
                    {pageList}
                </SearchInfoList>
                <SearchHistory></SearchHistory>
            </SearchInfo>
            )
        }else{
            return null;
        }
    }

    render(){
        const { list,focused,handleInputBlur,handleInputFocus,login,avatarImg,userId} = this.props
        return (
            <HeaderWrapper>
                <Link to='/'><Logo /></Link>
                <Nav>
                
                    <Link to='/'>
                    <NavItem className='left active'>
                        <span className="iconfont">&#xe61f;</span>
                        首页
                    </NavItem>
                    </Link>
                    <NavItem className='left'>
                        <span className="iconfont">&#xe641;</span>
                        下载App
                    </NavItem>
                    
                    {
                        login ?  null :
                        <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
                    }
                    
                    <NavItem className='right'>
                    <i className="iconfont">&#xe636;</i>
                    </NavItem>

                    <SearchWrapper>
                        <CSSTransition
                            in={focused}
                            timeout={400}
                            classNames="slide"
                        >
                        <NavSearch
                            className={focused ? 'focused': ''}
                            onFocus={() => handleInputFocus(list)}
                            onBlur={handleInputBlur}
                            ref={(input)=>{this.fuzzyKey = input}}
                        >
                        </NavSearch>
                        </CSSTransition>
                        {
                            this.fuzzyKey === undefined || this.fuzzyKey.value === '' ?
                            <span className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
                                &#xe62b;
                            </span> :
                            <Link target="_blank" 
                                  to={'search?fuzzyKey='+this.fuzzyKey.value+'&pageNum=1'} 
                            >
                            <span className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>
                                &#xe62b;
                            </span>
                            </Link>
                        }
                    {this.getListArea()}    
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to='/write'>
                    <Button className='writting'>
                    <span className="iconfont">&#xe615;</span>
                    写文章
                    </Button>
                    </Link>
                    {
                        login ? 
                        <NavItem  className='avatar'
                                  onMouseOver={()=>this.toggleMenu(true,1)}
                                  onMouseLeave={()=>this.toggleMenu(false,2)}
                        >
                        <Avatar src={avatarImg} alt='fail'></Avatar>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref="#icon-up"></use>
                        </svg>
                        </NavItem>
                        :
                        <Link to='/register'><Button className='reg'>注册</Button></Link>
                    }
                </Addition>
                {
                    this.state.showMenu ? 
                    <div id='home-menu'>
                        <ul id="menu" 
                            className="contextmenu homecontextmenu" 
                            onMouseEnter={()=>this.toggleMenu(true)}
                            onMouseLeave={()=>this.toggleMenu(false)}
                        >
                        <Link to={'/userhome/'+userId}><li><span>    
                        我的主页
                        <svg className="icon" id="home-icon" aria-hidden="true">
                            <use xlinkHref="#icon-tubiao211"></use>
                        </svg>
                        </span></li></Link>
                        <li><span>                
                        收藏的文章
                        <svg className="icon" id="collect-icon" aria-hidden="true">
                            <use xlinkHref="#icon-shuqian"></use>
                        </svg>
                        </span></li>
                        <li><span>                
                        喜欢的文章
                        <svg className="icon" id="like-icon" aria-hidden="true">
                            <use xlinkHref="#icon-xihuan"></use>
                        </svg>
                        </span></li>
                        <Link to='/usersetting'><li><span>                
                        设置
                        <svg className="icon" id="setting-icon" aria-hidden="true">
                            <use xlinkHref="#icon-Setting"></use>
                        </svg>
                        </span></li></Link>
                        <Link to='/'><li onClick={()=>this.logOutWithtoggleMenu()}><span>                
                        退出
                        <svg className="icon" id="logout-icon" aria-hidden="true">
                            <use xlinkHref="#icon-tuichu"></use>
                        </svg>
                        </span></li></Link>
                        </ul>
                    </div> : null
                }
            </HeaderWrapper>
        )
    }
    componentWillMount(){
        this.props.checkLogin();
    }

    //TODO 这方法太不优雅了... 
    logOutWithtoggleMenu(){
        this.toggleMenu(false);
        this.props.logout();    
    }
    toggleMenu(res){
        this.setState({
            showMenu: res
        })
    }
}

const mapStateToProps = (state) => {
    return {
        focused: state.getIn(['header', 'focused']),
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        totalPage: state.getIn(['header','totalPage']),
        mouseIn: state.getIn(['header','mouseIn']),
        login: state.getIn(['login','login']),
        avatarImg: state.getIn(['login','avatarImg']),
        userId: state.getIn(['login','userId'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleInputFocus(list){
            (list.size === 0) && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
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
                dispatch(actionCreators.changePage(page + 1));
            }else{
                dispatch(actionCreators.changePage(1));
            }
        },
        checkLogin(){
            dispatch(actionCreators.checkLogin());
        },
        logout(){
            localStorage.removeItem('token');
            window.location.reload()
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);