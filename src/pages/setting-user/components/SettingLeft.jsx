import React, { PureComponent } from 'react';
import { 
    SettingLeftContainer,
    SettingItemUl,
    SettingItemLi,
 } from './style';
 
class SettingLeft extends PureComponent {

    render(){
        return (
                <SettingLeftContainer>
                    <SettingItemUl>
                        <SettingItemLi onClick={()=>this.switchItem(1)}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-item"></use>
                                    </svg>
                                </div>
                                <span>基础设置</span>
                            </div>
                        </SettingItemLi>
                        <SettingItemLi onClick={()=>this.switchItem(2)}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-tubiao06"></use>
                                    </svg>
                                </div>
                                <span>个人资料</span>
                            </div>
                        </SettingItemLi>
                        <SettingItemLi onClick={()=>this.switchItem(3)}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-qian"></use>
                                    </svg>
                                </div>
                                <span>赞赏设置</span>
                            </div>     
                        </SettingItemLi>
                        <SettingItemLi onClick={()=>this.switchItem(4)}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-Setting"></use>
                                    </svg>
                                </div>
                                <span>账号管理</span>
                            </div>
                        </SettingItemLi>
                        <SettingItemLi onClick={()=>this.switchItem(5)}>
                            <div className='itemDiv'>  
                                <div className='iconBackground'>                        
                                    <svg className='icon' aria-hidden="true">
                                        <use xlinkHref="#icon-heimingdan"></use>
                                    </svg>
                                </div>
                                <span>黑名单</span>
                            </div>
                        </SettingItemLi>
                    </SettingItemUl>
                </SettingLeftContainer>
        )
    }
    switchItem(index){
        this.props.switchItem(index)
    }

    
}

export default SettingLeft;