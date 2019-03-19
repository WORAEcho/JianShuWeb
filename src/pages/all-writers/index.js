import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import Topic from './components/Topic.jsx';
import { actionCreators } from './store';
import { HomeWrapper } from '../home/components/style';
import WriterBlock from './components/Writerblcok.jsx';
import { Head,Body } from './components/style';
// import { format } from 'url';
// import { stat } from 'fs';
 
class AllWriters extends PureComponent {
    // gender,profile,website,email,qdcodeImg,
    render(){
        const { writerListWithProfile } = this.props;
        return (
            <HomeWrapper>
            <Head>
                <img id='writers-banner-img' src='http://pmwmye8w0.bkt.clouddn.com/recommend-author.png' alt=''></img>
            </Head>
            <Body>
                {
                    writerListWithProfile === undefined  ? null :
                        writerListWithProfile.map(item=>{
                            return (<WriterBlock profileItem={item} key={item.get('userId')}></WriterBlock>)
                        })
                }
            </Body>
            </HomeWrapper>
        )
    }
    componentDidMount(){
        this.props.getAllWriterWithProfile(1,1);
    }
}


const mapState = (state) => ({
    writerListWithProfile: state.getIn(['allWriter','writerListWithProfile']),

})

const mapDispatch= (dispatch) => ({
    getAllWriterWithProfile(userId,pageNum){
        dispatch(actionCreators.getAllWriterWithProfile(userId,pageNum))
    }
})
export default connect(mapState,mapDispatch)(AllWriters);