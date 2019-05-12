
import React, { PureComponent } from 'react';
import { PageNumItem } from './style'

class PageHelper extends PureComponent {
    state=({
        pageTotal:0,
        pageArr:[],
        activePage:1
    })

    render(){
        const {pageTotal,activePage,pageArr} = this.state
        return (
            pageTotal <= 1 ? null :
            <div>
            {
                activePage === 1 ? null :
                <PageNumItem className='pageNumItem' onClick={()=>this.changePage(activePage-1)}>
                    <span className='pageNum'>{'上一页'}</span>
                </PageNumItem>
            }
            {
                pageArr.map((item,index)=>{
                    return (
                        item === '...' ? <PageNumItem key={index} className='point'>{item}</PageNumItem> :
                        <PageNumItem key={index} className={activePage === item ? ' pageNumItem active':'pageNumItem'} 
                                     onClick={()=>this.changePage(item)}
                        >
                            <span className='pageNum'>{item}</span>
                        </PageNumItem>
                    )
                })
            }
            {
                activePage === pageTotal ? null :
                <PageNumItem className='pageNumItem' onClick={()=>this.changePage(activePage+1)}>
                    <span className='pageNum'>{'下一页'}</span>
                </PageNumItem>
            }
            </div>
        )
    }
    changePage(item){
        if(item>=1 && item <=this.state.pageTotal){
            this.changePageHelperBar(item)
            this.setState({
                activePage:item
            })
            this.props.getInfo(item);
        }
    }
    
    changePageHelperBar(item){
        const {pageTotal} = this.state
        let pageArr = [];
        if(item >= 6 && item <=pageTotal-5){
            pageArr.push(1);
            pageArr.push('...');
            pageArr.push(item-2);
            pageArr.push(item-1);
            pageArr.push(item);
            pageArr.push(item+1);
            pageArr.push(item+2);
            pageArr.push('...');
            pageArr.push(pageTotal);
            this.setState({
                'pageArr':pageArr
            })
        }else if(item < 6){
            this.initPageHelperBar()
        }else{
            pageArr.push(1);
            pageArr.push('...');
            pageArr.push(pageTotal-6);
            pageArr.push(pageTotal-5);
            pageArr.push(pageTotal-4);
            pageArr.push(pageTotal-3);
            pageArr.push(pageTotal-2);
            pageArr.push(pageTotal-1);
            pageArr.push(pageTotal);
            this.setState({
                'pageArr':pageArr
            })
        }
    }
    initPageHelperBar(){
        const {pageTotal} = this.props;

        let pageArr = [];
        if(pageTotal<=10){
            for(let i=1;i<=pageTotal;i++){
                pageArr.push(i);
            }
        }else{
            for(let i=1;i<=7;i++){
                pageArr.push(i);
            }
            pageArr.push('...');
            pageArr.push(pageTotal)
        }
        this.setState({
            'pageTotal':pageTotal,
            'pageArr':pageArr
        })
    }

    componentDidMount(){

        this.initPageHelperBar()
    }
    componentDidUpdate(prevProps){
        if(this.props.initActivePageFlag === true){
            console.log("init")
            this.setState({
                activePage: 1
            })
        }
    }

}

export default PageHelper;
