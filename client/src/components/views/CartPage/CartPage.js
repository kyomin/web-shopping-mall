import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../../../actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
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
                dispatch(getCartItems(cartItems, props.user.userData.cart));
            }
        }

    }, [props.user.userData]);

    if(props.user.cartDetail) {
        return (
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <h1>장바구니</h1>

                <div>
                    <UserCardBlock products={props.user.cartDetail.productInfos} />
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

export default CartPage