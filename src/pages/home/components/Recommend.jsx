import React, { PureComponent } from 'react';
import { RecommendWrapper, RecommendItem } from './style'
import { connect } from 'react-redux';

class Recommend extends PureComponent {
    render(){
        const { imgUrlList } = this.props;
        return (
            <RecommendWrapper >
                {imgUrlList.map((item)=>{
                    return (
                        <RecommendItem 
                            key={item.get('id')} 
                            imgUrl={item.get('imgUrl')}
                        />
                    )
                })}
            </RecommendWrapper>
        )
    }
}

const mapState = (state)=> ({
    imgUrlList: state.getIn(['home','recommendList'])
})
export default connect(mapState, null)(Recommend);