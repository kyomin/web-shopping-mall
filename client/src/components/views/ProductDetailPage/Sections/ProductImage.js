import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { BACK_URL } from '../../../../utils/constants';

function ProductImage(props) {
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        if(props.product.images && props.product.images.length > 0){
            const items = [];

            props.product.images.map((item, idx) => {
                items.push({
                    original: `${BACK_URL}/${item}`,
                    thumbnail: `${BACK_URL}/${item}`
                });
            });

            setImages(items);
        }
    }, [props.product]);        // [] 안의 값의 변화가 일어나면 라이프 사이클을 한 번 더 시켜준다는 의미이다.

    return (
        <div>
            <ImageGallery items={images} />
        </div>
    );
}

export default ProductImage