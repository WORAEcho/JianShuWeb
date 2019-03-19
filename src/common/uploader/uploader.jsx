import React, { Component} from 'react';
import plupload from 'plupload';
import uploadDefaultPhoto from '../../statics/logo.png';
import axios from 'axios';

class Uploader extends Component {

    state = {
        filePhoto: uploadDefaultPhoto
    }

    render() {
    return (
        // <div>
        //     <div style={{border: '1px solid red'}}>
        //         <img style={{width: '200px',height: '200px'}} src={this.state.filePhoto} />
        //     </div>
            <div id="user-photo">{this.props.myValue}</div>
        // </div>
    )
    }

    initSinglePlupload = () => {
        var uploader = new plupload.Uploader({ //创建一个plupload
            runtimes : 'html5, flash',
            browse_button: 'user-photo',       // 上传按钮 引发上传事件的按钮的id
            url: "http://up-z2.qiniup.com/",   //远程上传地址 后台地址(七牛)
            filters : {
            max_file_size : '10mb', //最大上传文件大小（格式100b, 10kb, 10mb, 1gb）
            mime_types: [
                {title : "JPG/PNG文件", extensions : "jpg,jpeg,JPG,JPEG,png,PNG,gif,GIF"}
            ]
            },
            multi_selection: false,   //true多文件上传, false 单文件上传
            multipart_params : {
            key: '',
            token: ''
            },
            multipart: true, //为true时将以multipart/form-data的形式来上传文件
            resize: {
            width: 1600,
            height: 1600
            },
            init: {
                // FilesAdded  文件上传前触发
                FileUploaded: function (up, file, result) { //文件上传成功的时候触发
                    this.setState({
                        filePhoto: 'http://pmwmye8w0.bkt.clouddn.com/'+JSON.parse(result.response).key
                    })
                    //给父组件传图片链接
                    this.props.handlePhotoUrl(this.state.filePhoto);
                }.bind(this),
                Error: function (up, err) { 
                    //上传出错的时候触发
                    console.log(up);
                    console.log(err);
                }
            }
        });
        return uploader

    }


    componentDidMount() {
        var uploader = this.initSinglePlupload('');
        uploader.bind('FilesAdded',function(uploader, file) {
            axios.get('http://localhost:8080/getUploadToken',{
            }).then((res)=>{
                uploader.setOption('multipart_params', {
                    key: res.data.key,
                    token: res.data.token
                });
                uploader.start();
            }).catch((e)=>{
                console.log(e);
            })
        }
        )
        uploader.init();
    }
}

export default Uploader
