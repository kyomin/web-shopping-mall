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

        alert('장바구니에 상품이 담겼습니다.');
    }

    if(!isEmptyObject(product)) {
        return (
            <div>
                <Descriptions title="상품 상세" bordered>
                    <Descriptions.Item label="가격">{numberWith3digitCommas(product.price)}원</Descriptions.Item>
                    <Descriptions.Item label="판매량">{product.sold}</Descriptions.Item>
                    <Descriptions.Item label="조회수">{product.views}</Descriptions.Item>
                    <Descriptions.Item label="상품 설명">{product.description}</Descriptions.Item>
                    <Descriptions.Item label="판매자">{product.writer.name}</Descriptions.Item>    
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