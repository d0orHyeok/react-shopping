import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from '../_actions/types';

export default function user_reducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case ADD_TO_CART:
      return { ...state, userData: { ...state.userData, cart: action.payload.userInfoCart } };
    case GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload.product };
    case REMOVE_CART_ITEM:
      let newCartDetail = [];
      let newCart = [];
      if (action.payload.success) {
        newCartDetail = state.cartDetail.filter(product => product._id !== action.payload.deletedProduct);
        newCart = state.userData.cart.filter(product => product.id !== action.payload.deletedProduct);
      }
      return { ...state, userData: { ...state.userData, cart: newCart }, cartDetail: newCartDetail };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        userData: { ...state.userData, cart: action.payload.cart },
        cartDetail: action.payload.cartDetail,
      };
    default:
      return state;
  }
}
