import React from 'react';
import { BACK_URL } from '../../../../utils/constants'
import './UserCardBlock.css';

function UserCardBlock(props) {

    const renderProductImage = (images) => {
        if(images.length > 0) {
            const image = images[0];

            return `${BACK_URL}/${image}`;
        }
    }

    const renderItems = () => {
        if(props.products) {
            return props.products.map(product => {
                return (
                    <tr>
                        {/* 상품 이미지 */}
                        <td>
                            <img 
                                style={{ width: '70px' }} 
                                alt='product' 
                                src={renderProductImage(product.images)}
                            />
                        </td>
                        
                        {/* 상품 수량 */}
                        <td>
                            {product.quantity} 개
                        </td>
                        
                        {/* 상품 가격 */}
                        <td>
                            {product.price} 원
                        </td>

                        {/* 삭제 버튼 */}
                        <td>
                            <button>
                                삭제
                            </button>
                        </td>
                    </tr>
                );
            });
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>상품 이미지</th>
                        <th>상품 수량</th>
                        <th>상품 가격</th>
                        <th>상품 삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    );
}

export default UserCardBlock