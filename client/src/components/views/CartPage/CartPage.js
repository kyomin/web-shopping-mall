import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Empty } from 'antd';
import { getCartItems, removeCartItem } from '../../../actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';
import { numberWith3digitCommas } from '../../../utils/functions';

function CartPage(props) {
    const [totalAmount, setTotalAmount] = useState(0);
    const [showTotal, setShowTotal] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {

        const cartItems = [];
        
        // 리덕스의 User state 안의 cart 필드 안에 상품이 들어있는지 확인
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                });

                // axios 대신에 리덕스 dispatch로 요청을 보낸다.
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                .then((res) => {
                    calculateTotalAmount(res.payload);
                });
            }
        }

    }, [props.user.userData]);

    const calculateTotalAmount = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += (parseInt(item.price, 10) * item.quantity);
        });

        setTotalAmount(total);
        setShowTotal(true);
    }

    const removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        .then((res) => {
            if(res.payload.productInfos.length <= 0) {
                setShowTotal(false);
            }
        });
    }

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>장바구니</h1>

            <div>
                <UserCardBlock 
                    products={props.user.cartDetail && props.user.cartDetail}
                    removeItem={removeFromCart}
                />
            </div>

            {showTotal ? 
                <div style={{ marginTop: '3rem' }}>
                    <h2>총 금액 : {numberWith3digitCommas(totalAmount)}원</h2>
                </div>
                :
                <>
                    <br />
                    <Empty description={false} />
                </>
            }
        </div>
    );
}

export default CartPage