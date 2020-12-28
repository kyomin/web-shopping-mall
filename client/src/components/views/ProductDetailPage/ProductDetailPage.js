import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'antd';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function ProductDetailPage(props) {
    const [product, setProduct] = useState({});
    
    const productId = props.match.params.productId;

    useEffect(() => {
        axios.get(`/api/product/detail?id=${productId}&type=single`)
        .then((res) => {
            setProduct(res.data[0]);
        })
        .catch((err) => {
            alert(err);
        });
    }, []);

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{product.title}</h1>
            </div>

            <br />

            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    {/* Product Image */}
                    <ProductImage product={product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* Product Info */}
                    <ProductInfo product={product} />
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetailPage