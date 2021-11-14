import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';

import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';

function DetailProductPage() {
  const { productId } = useParams();

  const [Product, setProduct] = useState({});

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(res => {
      if (res.data.success) {
        setProduct(res.data.product[0]);
      } else {
        alert('상세정보 가져오기를 실패했습니다.');
      }
    });
  }, []);

  return (
    <div style={{ width: '100%', padding: '3rem 4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>{Product.title}</h1>
      </div>
      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} md={12} xs={24}>
          {/* Product Image */}
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} md={12} xs={24}>
          {/* Product Info */}
          <ProductInfo detail={Product} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
