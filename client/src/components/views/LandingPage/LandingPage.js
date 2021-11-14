import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { RocketOutlined } from '@ant-design/icons';

import { continents, price } from './Sections/Datas';
import ImageSilder from '../../utils/ImageSilder';
import CheckBox from './Sections/CheckBox';
import RadioBox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [IsMore, setIsMore] = useState(false);
  const [Body, setBody] = useState({
    // 상품을 가져올 때 사용할 조건
    skip: 0,
    limit: 8,
    searchText: '',
    filters: {
      continents: [],
      price: [],
    },
  });
  const [Filters, setFilters] = useState(false);

  useEffect(() => {
    getProducts();
  }, [Filters]);

  const getProducts = () => {
    Axios.post('/api/product/products', Body).then(res => {
      if (res.data.success) {
        if (res.data.isMore) {
          setProducts([...Products, ...res.data.products]);
        } else {
          setProducts(res.data.products);
        }
        setIsMore(res.data.isMore);
        setBody({
          ...Body,
          skip: Body.skip + Body.limit,
        });
      } else {
        alert('상품들을 가져오는데 실패했습니다.');
      }
    });
  };

  const handleFilters = (filters, category) => {
    let array = [];
    if (category === 'price') {
      for (let key in price) {
        if (price[key]._id === parseInt(filters, 10)) {
          array = price[key].array;
        }
      }
    } else {
      array = filters;
    }

    const newFilters = {
      ...Body.filters,
      [category]: array,
    };

    setBody({
      ...Body,
      skip: 0,
      filters: newFilters,
    });
    setFilters(!Filters);
  };

  const updateSearchText = text => {
    setBody({
      ...Body,
      skip: 0,
      searchText: text,
    });
    setFilters(!Filters);
  };

  // 상품목록 JSX
  const renderCard = () =>
    Products.length > 0 ? (
      Products.map((product, index) => {
        return (
          <Col key={index} lg={6} md={12} xs={24}>
            <Card cover={<ImageSilder images={product.images} />}>
              <Meta title={product.title} description={`$${product.price}`} />
            </Card>
          </Col>
        );
      })
    ) : (
      <h3 style={{ width: '100%', textAlign: 'center' }}> Product Not Found</h3>
    );

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Travel Anywhere
          <RocketOutlined />
        </h2>
      </div>

      {/* Filter */}
      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} xs={24}>
          {/* CheckBox */}
          <CheckBox list={continents} handleFilters={filters => handleFilters(filters, 'continents')} />
        </Col>
        <Col lg={12} md={12} xs={24}>
          {/* RadioBox */}
          <RadioBox list={price} handleFilters={filters => handleFilters(filters, 'price')} />
        </Col>
      </Row>

      {/* Search */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
        <SearchFeature refreshFunction={updateSearchText} />
      </div>

      {/* Card */}
      <Row gutter={[16, 16]}>{renderCard()}</Row>
      {IsMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={getProducts}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
