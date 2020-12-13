import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { Typography, Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import { numberWith3digitCommas } from '../../../utils/functions';
import { MORE_BTN_LIMIT } from '../../../utils/constants';

const { Title } = Typography

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [postSize, setPostSize] = useState(8)

    useEffect(() => {
        const requestBody = {
            skip,
            limit: MORE_BTN_LIMIT
        };

        getProducts(requestBody);
    }, []); 

    const getProducts = (requestBody) => {
        axios.post('/api/product/products', requestBody)
        .then((res) => {
            if(res.data.success){
                if(requestBody.loadMore){
                    setProducts([...products, ...res.data.productInfos]);
                } else{
                    setProducts(res.data.productInfos);
                }

                setPostSize(res.data.postSize);
            } else{
                swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
            }
        })
        .catch((err) => {
            console.error(err);
            swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
        });
    }

    const handleMoreBtn = () => {
        const newSkip = skip + MORE_BTN_LIMIT;

        const requestBody = {
            skip: newSkip,
            limit: MORE_BTN_LIMIT,
            loadMore: true
        };

        getProducts(requestBody);
        setSkip(newSkip);           // skip 상태 갱신
    }

    const renderProducts = () => {
        return products.map((product, idx) => {
            return (
                <Col lg={6} md={8} xs={24} key={idx}>
                    <Card cover={ <ImageSlider images={product.images} />} >
                        <Meta 
                            title={product.title}
                            description={`${numberWith3digitCommas(product.price)}원`}
                        />
                    </Card>
                </Col>
            );
        });
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }} >
            <div style={{ textAlign: 'center', marginBottom: '3%' }}>
                <Title level={1}> 전체 상품 <Icon type='rocket' /> </Title>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderProducts()}
            </Row>

            {postSize >= MORE_BTN_LIMIT && 
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                    <Button type="primary" onClick={handleMoreBtn}>더보기</Button>
                </div>
            }
        </div>
    );
}

export default LandingPage