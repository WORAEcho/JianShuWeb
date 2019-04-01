import React, { Component} from 'react';
import plupload from 'plupload';
import uploadDefaultPhoto from '../../statics/logo.png';
import axios from 'axios';

class Uploader extends Component {

    state = {
        filePhoto: uploadDefaultPhoto,
        filename: ''
    }

    render() {
    return (
        <div id="user-photo">{this.props.myValue}</div>
    )
    }

    initSinglePlupload = () => {
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash',
            browse_button : 'user-photo', 
            multi_selection: false,
            url : 'http://jianshu-pic.oss-cn-qingdao.aliyuncs.com',
            filters : {
                max_file_size : '10mb',
                mime_types: [
                    {title : "JPG/PNG文件", extensions : "jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF"}
                ]
            },
            init: {
                FileUploaded: function(up, file, info) {
                    if (info.status === 200)
                    {
                        this.setState({
                            filePhoto: 'http://jianshu-pic.oss-cn-qingdao.aliyuncs.com/images/'+this.state.filename
                        })
                        this.props.handlePhotoUrl(this.state.filePhoto); //给父组件传图片链接
                    }
                }.bind(this),
                Error: function(up, err) {
                    console.log(err)
                }
            }
        });
        return uploader;
    }


    componentDidMount() {
        var uploader = this.initSinglePlupload('');
        uploader.bind('FilesAdded',function(uploader, file) {
            axios.get('http://localhost:8080/getUploadToken').then((res)=>{
                const ret = res.data;
                const filename = 'images/'+file[0].name.split('.')[0]+(new Date()).getTime();
                this.setState({'filename':filename.split('/')[1]})
                const new_multipart_params = {
                    'key' : filename,
                    'policy': ret.policy,
                    'OSSAccessKeyId': ret.accessid, 
                    'success_action_status' : '200',
                    'signature': ret.signature,
                };
                uploader.setOption({
                    'multipart_params': new_multipart_params
                });
                uploader.start();    
            }).catch((e)=>{
                console.log(e);
            })
        }.bind(this))
        uploader.init();
    }
}

export default Uploader
