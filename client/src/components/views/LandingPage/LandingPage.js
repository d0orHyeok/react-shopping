import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { RocketOutlined } from '@ant-design/icons';

import { continents } from './Sections/Datas';
import ImageSilder from '../../utils/ImageSilder';
import CheckBox from './Sections/CheckBox';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [IsMore, setIsMore] = useState(false);
  const [Body, setBody] = useState({
    skip: 0,
    limit: 8,
    filters: {
      continents: [],
      price: [],
    },
  });
  const [Filters, setFilters] = useState(0);

  useEffect(() => {
    getProducts();
  }, [Filters]);

  const getProducts = () => {
    Axios.post('/api/product/products', Body).then(res => {
      if (res.data.success) {
        setProducts([...Products, ...res.data.products]);
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
    const newFilters = {
      ...Body.filters,
      continents: filters,
    };

    setBody({
      ...Body,
      skip: 0,
      filters: newFilters,
    });

    setProducts([]);
    setFilters(filters.length);
  };

  const renderCard = Products.map((product, index) => {
    return (
      <Col key={index} lg={6} md={12} xs={24}>
        <Card cover={<ImageSilder images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Travel Anywhere
          <RocketOutlined />
        </h2>
      </div>
      {/* Filter */}

      {/* CheckBox */}
      <CheckBox list={continents} handleFilters={filters => handleFilters(filters, 'continents')} />
      {/* RadioBox */}

      {/* Search */}

      {/* Card */}
      <Row gutter={[16, 16]}>{renderCard}</Row>
      {IsMore && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button onClick={getProducts}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
