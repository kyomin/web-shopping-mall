import React, { useEffect, useState } from 'react';
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { auth ,addToCart } from '../../../../actions/user_actions';
import { numberWith3digitCommas, isEmptyObject } from '../../../../utils/functions';

function ProductInfo(props) {
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setProduct(props.product);
    }, [props.product]);

    const clickHandler = async (e) => {
        // 만일 로그인이 안 된 상태에서 장바구니 담기를 시도했다면
        await dispatch(auth())
        .then((res) => {
            if(!res.payload.isAuth) {
                alert('로그인해 주십시오!');
                document.location.href = '/login';
            }
        })

        // 필요한 정보를 User 모델의 cart 필드에 넣어 준다.
        await dispatch(addToCart(product._id));
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
                    <Button size='large' shape='round' type='primary' onClick={clickHandler}>
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