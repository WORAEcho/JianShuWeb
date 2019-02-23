import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { TopicWrapper, TopicItem } from './style';
class Topic extends PureComponent {
    render(){
        const { list } = this.props;
        return (
            <TopicWrapper>
                {
                    list.map((item)=>(
                        <TopicItem key={item.get('id')}>
                        <img 
                            className='topic-pic' 
                            //因为item是个immutable对象
                            //所以拿imgUrl不能直接“.”，要用get方法
                            src={item.get('imgUrl')}
                            alt=''
                        />
                        {item.get('title')}
                        </TopicItem>
                        )
                    )
                }
            </TopicWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home','topicList'])
    // list: state.get('home').get('topicList')
});

export default connect(mapStateToProps, null)(Topic);