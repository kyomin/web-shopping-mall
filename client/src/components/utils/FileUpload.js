import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';
import swal from 'sweetalert';
import { BACK_URL } from '../../utils/constants';

function FileUpload(props) {
    const [images, setImages] = useState([]);

    const dropHandler = (files) => {
        let formData = new FormData();
        formData.append('file', files[0]);

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        };

        axios.post('/api/product/image', formData, config)
        .then((res) =>{
            if(res.data.success){
                setImages([...images, res.data.filePath]);
                props.refreshFunction([...images, res.data.filePath]);
            } else {
                swal('', '이미지 파일을 서버에 저장하는데 실패했습니다.', 'error');
            }
        })
        .catch((err) => {
            console.error(err);
        })
    }

    const deleteHandler = (idx) => {
        const newImages = [...images];  // 기존의 이미지 리스트를 복사하고
        newImages.splice(idx, 1);       // 클릭된 특정 인덱스의 원소를 지운다.
        
        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div 
                        style={{
                            width: 300, height: 240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type='plus' style={{ fontSize: '3rem' }} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflow: 'scroll' }}>
                {images.map((image, idx) => {
                    return (
                        <div onClick={() => deleteHandler(idx)} key={idx}>
                            <img 
                                style={{ minWidth: '300px', width: '300px', height: '240px' }}
                                src={`${BACK_URL}/${image}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FileUpload