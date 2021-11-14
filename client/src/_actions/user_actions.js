import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
} from './types';
import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then(response => response.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/auth`).then(response => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data);

  return {
    type: LOGOUT_USER,
    payload: request,
  };
}

export function addToCart(id) {
  let body = {
    productId: id,
  };

  const request = axios.post(`${USER_SERVER}/addToCart`, body).then(response => response.data);

  return {
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getCartItems(cartItems, userCart) {
  const request = axios.get(`/api/product/products_by_id?id=${cartItems}&type=array`).then(response => {
    // Product Collection에서 데이터를 가져와 Qunatity 정보를 추가
    response.data.success
      ? userCart.forEach(cartItem => {
          response.data.product.forEach((productDetail, index) => {
            if (cartItem.id === productDetail._id) {
              response.data.product[index].quantity = cartItem.quantity;
            }
          });
        })
      : (response.data.product = []);

    return response.data;
  });

  return {
    type: GET_CART_ITEMS,
    payload: request,
  };
}

export function removeCartItem(productId) {
  const request = axios.post(`${USER_SERVER}/removeFromCart`, { productId }).then(response => {
    if (!response.data.success) {
      response.data.deletedProduct = { ...response.data, deletedProduct: null };
    }

    return response.data;
  });

  return {
    type: REMOVE_CART_ITEM,
    payload: request,
  };
}
