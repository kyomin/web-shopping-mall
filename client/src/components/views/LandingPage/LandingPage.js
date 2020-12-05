import React, { useEffect } from 'react'
import axios from 'axios';
import swal from 'sweetalert';

function LandingPage() {

    useEffect(() => {

        axios.post('/api/product/products')
        .then((res) => {
            if(res.data.success){
                console.log("landing data : ", res.data);
            } else{
                swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
            }
        })
        .catch((err) => {
            console.error(err);
            swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
        })

    }, []);

    return (
        <div>
            Landing Page
        </div>
    );
}

export default LandingPage