import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import axios from 'axios';
import FileUpload from '../../utils/FileUpload';

const { Title } = Typography;
const { TextArea } = Input;
const continents = [
    { key: 1, value: 'Africa' },
    { key: 2, value: 'Europe' },
    { key: 3, value: 'Asia' },
    { key: 4, value: 'North America' },
    { key: 5, value: 'South America' },
    { key: 6, value: 'Australia' },
    { key: 7, value: 'Antarctica' }
];

function UploadProductPage(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [continent, setContinent] = useState(1);
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

    const continentChangeHandler = (e) => {
        setContinent(e.currentTarget.value);
    }

    const updateImages = (newImages) => {
        setImages(newImages);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        /* validation check! */
        if(!title || !description || !price || !continent || !images){
            return alert("모든 값을 채워 넣어주셔야 합니다!");
        }

        /* 채운 값들을 서버에 보낸다. */
        const requestData = {
            // 로그인 된 사람의 ID 정보
            writer: props.user.userData._id,
            title,
            description,
            price,
            continent,
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
              <Title level={2}> 여행 상품 업로드 </Title>
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
              <label>가격($)</label>
              <Input type='number' onChange={priceChangeHandler} value={price} required />

              <br/>
              <br/>
              <select onChange={continentChangeHandler} value={continent}>
                {continents.map((item) => {
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