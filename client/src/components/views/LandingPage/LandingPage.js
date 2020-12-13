import React, { useEffect, useState } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { Typography, Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import { numberWith3digitCommas } from '../../../utils/functions';

const { Title } = Typography;

function LandingPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        axios.post('/api/product/products')
        .then((res) => {
            if(res.data.success){
                setProducts(res.data.productInfos);
            } else{
                swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
            }
        })
        .catch((err) => {
            console.error(err);
            swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
        });

    }, []);

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
            <div style={{ textAlign: 'center' }}>
                <Title level={2}> All Products <Icon type='rocket' /> </Title>
            </div>

            {/* Filter */}

            {/* Search */}

            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderProducts()}
            </Row>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>더보기</button>
            </div>
        </div>
    );
}

export default LandingPage