import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, removeCartItem } from '../../../_actions/user_actions';
import { Empty } from 'antd';

import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [Total, setTotal] = useState(0);

  useEffect(() => {
    let cartItems = [];

    if (user.userData && user.userData.cart) {
      if (user.userData.cart.length > 0) {
        user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });

        dispatch(getCartItems(cartItems, user.userData.cart)).then(res => {
          calculateTotal(res.payload.product);
        });
      }
    }
  }, [user.userData]);

  const calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.map(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });
    setTotal(total);
  };

  const removeFromCart = productId => {
    dispatch(removeCartItem(productId)).then(res => {});
  };

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock removeItem={removeFromCart} />
      </div>

      <div style={{ marginTop: '3rem' }}>
        {user.cartDetail && user.cartDetail.length > 0 ? (
          //   Cart에 상품이 있는경우
          <h2>Total Amount: ${Total}</h2>
        ) : (
          //   Cart에 상품이 없는 경우
          <Empty description={false} />
        )}
      </div>
    </div>
  );
}

export default CartPage;
