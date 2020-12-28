import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;
const classifications = [
    { key: 1, value: '패션의류ㆍ잡화ㆍ뷰티' },
    { key: 2, value: '식품ㆍ생필품' },
    { key: 3, value: '컴퓨터ㆍ디지털ㆍ가전' },
    { key: 4, value: '스포츠ㆍ건강ㆍ렌탈' },
    { key: 5, value: '자동차ㆍ공구' },
    { key: 6, value: '여행ㆍ도서ㆍ티켓ㆍe쿠폰' },
    { key: 7, value: '홈데코ㆍ문구ㆍ취미ㆍ반려' }
];

function UploadProductPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [classification, setClassification] = useState(1);
    const [images, setImages] = useState([]);

    const titleChangeHandler = (e) => {
        setTitle(e.currentTarget.value);
    }

    const descriptionChangeHandler = (e) => {
        setDescription(e.currentTarget.value);
    }

    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value);
    }

    const classificationChangeHandler = (e) => {
        setClassification(e.currentTarget.value);
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        /* validation check! */
        if(!title || !description || !price || !classification || !images.length){
            alert('모든 값을 채워 넣어주셔야 합니다!');
            return;
        }

        /* 채운 값들을 서버에 보낸다. */
        const requestData = {
            // 로그인 된 사람의 ID 정보
            writer: props.user.userData._id,
            title,
            description,
            price: price,
            classification,
            images
        };
        
        axios.post("/api/product", requestData)
        .then((res) => {
            if(res.data.success){
                alert('상품 업로드에 성공했습니다.');
                props.history.push('/');
            } else {
                alert('상품 업로드에 실패했습니다.');
            }
        })
        .catch((err) => {
            console.error(err);
            alert('상품 업로드에 실패했습니다.');
        });
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Title level={1}> 상품 업로드 </Title>
          </div>

          <Form onSubmit={submitHandler}>

              {/* DropZone */}
              <FileUpload refreshFunction={updateImages}/>

              <br/>
              <br/>
              <label>이름</label>
              <Input onChange={titleChangeHandler} value={title} required />
              
              <br/>
              <br/>
              <label>설명</label>
              <TextArea onChange={descriptionChangeHandler} value={description} required />
              
              <br/>
              <br/>
              <label>가격(원)</label>
              <Input type='number' onChange={priceChangeHandler} value={price} required />

              <br/>
              <br/>
              <label>분류</label>
              <br/>
              <select onChange={classificationChangeHandler} value={classification}>
                {classifications.map((item) => {
                    return <option key={item.key} value={item.key}>{item.value}</option>
                })}
              </select>

              <br/>
              <br/>
              <Button htmlType='submit'>
                  확인
              </Button>

          </Form>
        </div>
    );
}

export default UploadProductPage