import React, { useState } from 'react';
import { Descriptions, Button } from 'antd';

function ProductInfo(props) {
  const onClickAddCart = () => {};

  return (
    <React.Fragment>
      <Descriptions title="Product Info" bordered>
        <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
        <Descriptions.Item label="Views">{props.detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button size="large" shape="round" type="danger" onClick={onClickAddCart}>
          Add to Cart
        </Button>
      </div>
    </React.Fragment>
  );
}

export default ProductInfo;
