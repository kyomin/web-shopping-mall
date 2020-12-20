import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { Typography, Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import Classifications from './Sections/Classifications';
import Price from './Sections/Price';
import SearchFeature from './Sections/SearchFeature';
import { numberWith3digitCommas } from '../../../utils/functions';
import { classifications, price, more_btn_limit } from './Sections/Datas';

const { Title } = Typography

function LandingPage() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [postSize, setPostSize] = useState(8);
    const [filters, setFilters] = useState({
        classifications: [],
        price: []
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const requestBody = {
            skip,
            limit: more_btn_limit
        };

        getProducts(requestBody);
    }, []); 

    const getProducts = (requestBody) => {
        axios.post('/api/product/products', requestBody)
        .then((res) => {
            if(res.data.success){
                if(requestBody.loadMore){
                    setProducts([...products, ...res.data.productInfos]);
                } else{
                    setProducts(res.data.productInfos);
                }

                setPostSize(res.data.postSize);
            } else{
                swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
            }
        })
        .catch((err) => {
            console.error(err);
            swal('', '상품 정보들을 가져오는데 실패 했습니다.', 'error');
        });
    }

    const handleMoreBtn = () => {
        const newSkip = skip + more_btn_limit;

        const requestBody = {
            skip: newSkip,
            limit: more_btn_limit,
            loadMore: true
        };

        getProducts(requestBody);
        setSkip(newSkip);           // skip 상태 갱신
    }

    const renderProducts = () => {
        return products.map((product, idx) => {
            return (
                <Col lg={6} md={8} xs={24} key={idx}>
                    <Card cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images} /></a>} >
                        <Meta 
                            title={product.title}
                            description={`${numberWith3digitCommas(product.price)}원`}
                        />
                    </Card>
                </Col>
            );
        });
    }

    const showFilteredResults = (filter) => {
        const requestBody = {
            skip: 0,
            limit: more_btn_limit,
            filter
        };

        getProducts(requestBody);
        setSkip(0);
    }

    const handlePrice = (value) => {
        const data = price;
        let arr = [];

        for(let key in data) {
            if(data[key].id === parseInt(value, 10)){
                arr = data[key].array;
            }
        }
        
        return arr;
    }

    const handleFilters = (filter, category) => {
        const newFilters = { ...filters };
        newFilters[category] = filter;

        if(category === 'price'){
            const priceValue = handlePrice(filter);
            newFilters[category] = priceValue;
        }

        showFilteredResults(newFilters);
        setFilters(newFilters);
    }

    const updateSearchTerm = (newSearchTerm) => {
        const requestBody = {
            skip: 0,
            limit: more_btn_limit,
            filter: filters,     // 현재 어느 필터가 눌려져 있는 부분인지도 고려하기 위해서!
            searchTerm: newSearchTerm
        };

        setSearchTerm(newSearchTerm);
        getProducts(requestBody);
        setSkip(0);
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }} >
            <div style={{ textAlign: 'center', marginBottom: '3%' }}>
                <Title level={1}> 전체 상품 <Icon type='rocket' /> </Title>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    {/* Check Box */}
                    <Classifications 
                        list={classifications} 
                        handleFilters={(filter) => handleFilters(filter, 'classification')}
                    />
                </Col>
                <Col lg={12} xs={24}>
                    {/* Radio Box */}
                    <Price 
                        list={price} 
                        handleFilters={(filter) => handleFilters(filter, 'price')}
                    />
                </Col>
            </Row>

            {/* Search */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />
            </div>

            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderProducts()}
            </Row>

            {/* 가져온 것이 more 버튼이 가져오는 개수보다 적으면 끝까지 다 긁어온 것이다. */}
            {postSize >= more_btn_limit && 
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                    <Button type="primary" onClick={handleMoreBtn}>더보기</Button>
                </div>
            }
        </div>
    );
}

export default LandingPage