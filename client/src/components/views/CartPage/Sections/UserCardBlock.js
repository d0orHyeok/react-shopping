import React from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

import './UserCardBlock.css';

function UserCardBlock(props) {
  const products = useSelector(state => state.user.cartDetail);

  const renderCartImage = images => {
    if (images.length > 0) {
      let image = images[0];
      return `http://localhost:5000/${image}`;
    }
  };

  const renderItems = () =>
    products &&
    products.map(product => (
      <tr key={product._id}>
        <td>
          <img style={{ width: '70px' }} alt="product" src={renderCartImage(product.images)} />
        </td>
        <td>{product.title}</td>
        <td>{product.quantity} EA</td>
        <td>$ {product.price} </td>
        <td>
          <Button onClick={() => props.removeItem(product._id)}>Remove</Button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>

            <th>Product Quantity</th>
            <th>Product Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
}

export default UserCardBlock;
