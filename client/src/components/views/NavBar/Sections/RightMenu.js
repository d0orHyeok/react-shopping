/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightMenu(props) {
  const user = useSelector(state => state.user);

  useEffect(() => {}, [user]);

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
        <Menu disabledOverflow="true" mode={props.mode}>
          <Menu.Item key="login">
            <a href="/login">Signin</a>
          </Menu.Item>
          <Menu.Item key="register">
            <a href="/register">Signup</a>
          </Menu.Item>
        </Menu>
      </p>
    );
  } else {
    return (
      <Menu disabledOverflow="true" mode={props.mode}>
        <Menu.Item key="upload">
          <a href="/product/upload">Upload</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;
