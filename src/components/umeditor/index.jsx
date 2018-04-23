import React from 'react';

import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';

class UmEditor extends React.Component {

    constructor(props) {
        super(props);
    }

    handleChange = (content) => {
        this.props.onChange(content);
    }

    handleRawChange = (rawContent) => {
        //this.props.onChange(rawContent);
    }

    render() {

        const editorProps = {
            height: 500,
            contentFormat: 'html',
            initialContent: this.props.initialContent,
            onChange: this.handleChange,
            onRawChange: this.handleRawChange,
            media: {
                uploadFn: (param) => {
                    const serverURL = 'http://upload-server'
                    const xhr = new XMLHttpRequest
                    const fd = new FormData()

                    // libraryId可用于通过mediaLibrary示例来操作对应的媒体内容
                    console.log(param.libraryId)

                    const successFn = (response) => {
                        // 假设服务端直接返回文件上传后的地址
                        // 上传成功后调用param.success并传入上传后的文件地址
                        param.success({
                            url: xhr.responseText
                        })
                    }

                    const progressFn = (event) => {
                        // 上传进度发生变化时调用param.progress
                        param.progress(event.loaded / event.total * 100)
                    }

                    const errorFn = (response) => {
                        // 上传发生错误时调用param.error
                        param.error({
                            msg: 'unable to upload.'
                        })
                    }

                    xhr.upload.addEventListener("progress", progressFn, false)
                    xhr.addEventListener("load", successFn, false)
                    xhr.addEventListener("error", errorFn, false)
                    xhr.addEventListener("abort", errorFn, false)

                    fd.append('file', param.file)
                    xhr.open('POST', serverURL, true)
                    xhr.send(fd)
                }
            }
        };

        return (
            <div>
                <BraftEditor {...editorProps} />
            </div>
        );
    }

}

export default UmEditor;