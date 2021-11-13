import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { RocketOutlined } from '@ant-design/icons';

import ImageSilder from '../../utils/ImageSilder';

function LandingPage() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    Axios.post('/api/product/products').then(res => {
      if (res.data.success) {
        setProducts(res.data.products);
      } else {
        alert('상품들을 가져오는데 실패했습니다.');
      }
    });
  }, []);

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

      {/* Search */}

      {/* Card */}
      <Row gutter={[16, 16]}>{renderCard}</Row>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default LandingPage;
