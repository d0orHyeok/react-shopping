import React from 'react';
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {
  const dispatch = useDispatch();

  const onClickAddCart = () => {
    dispatch(addToCart(props.detail._id));
  };

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
