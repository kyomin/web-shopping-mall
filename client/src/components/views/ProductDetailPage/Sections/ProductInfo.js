import React, { useEffect, useState } from 'react';
import { Descriptions, Button } from 'antd';
import { numberWith3digitCommas, isEmptyObject } from '../../../../utils/functions';

function ProductInfo(props) {
    const [product, setProduct] = useState({});

    useEffect(() => {
        setProduct(props.product);
    }, [props.product]);

    const addToCart = (e) => {
        
    }

    if(!isEmptyObject(product)) {
        return (
            <div>
                <Descriptions title="상품 상세" bordered>
                    <Descriptions.Item label="Price">{numberWith3digitCommas(product.price)}원</Descriptions.Item>
                    <Descriptions.Item label="Sold">{product.sold}</Descriptions.Item>
                    <Descriptions.Item label="View">{product.views}</Descriptions.Item>
                    <Descriptions.Item label="Description">{product.description}</Descriptions.Item>    
                </Descriptions>

                <br />
                <br />
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button size='large' shape='round' type='primary' onClick={addToCart}>
                        장바구니 담기
                    </Button>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                loading...
            </div>
        );
    }
}

export default ProductInfo