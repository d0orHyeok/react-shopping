/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightMenu(props) {
  const user = useSelector(state => state.user);

  const [CartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user.userData && user.userData.isAuth) {
      setCartCount(user.userData.cart.length);
    }
  }, [user.userData]);

  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        navigate('/login');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <p>
        <Menu style={{ marginTop: '1rem' }} disabledOverflow="true" mode={props.mode}>
          <Menu.Item key="register">
            <a href="/register">Signup</a>
          </Menu.Item>
          <Menu.Item key="login">
            <a href="/login">Signin</a>
          </Menu.Item>
        </Menu>
      </p>
    );
  } else {
    return (
      <Menu style={{ marginTop: '1rem' }} disabledOverflow="true" mode={props.mode}>
        <Menu.Item key="history">
          <a href="/user/history">History</a>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="cart">
          <Badge count={CartCount}>
            <a href="/user/cart" style={{ color: '#667777' }}>
              <ShoppingCartOutlined style={{ fontSize: '30px' }} />
            </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
