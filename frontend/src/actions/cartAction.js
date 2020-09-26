import axios from "axios";
import Cookie from "js-cookie";
import {
  ADD_ITEM_TO_CART,
  REMOVE_CART_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "./types/cart";
const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: {
        product: data._id,
        title: data.title,
        image: data.image,
        price: data.price,
        rating: data.rating,
        numInStock: data.numInStock,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};
const removeFromCartAction = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};
const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};
export { addToCart, removeFromCartAction, saveShipping, savePayment };
