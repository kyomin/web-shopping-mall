import React from 'react';
import { Carousel } from 'antd';
import { BACK_URL } from '../../utils/constants';

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, idx) => {
                    return (
                        <div key={idx}>
                            <img 
                                style={{ width: '100%', height: '300px' }}
                                src={`${BACK_URL}/${image}`}
                                alt={'상품 이미지'}
                            />
                        </div>
                    );
                })}
            </Carousel>
        </div>
    )
}

export default ImageSlider