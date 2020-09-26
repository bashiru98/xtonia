import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productSaveReducer,
} from "./reducers/product";
import { cartReducer } from "./reducers/cart";
import thunk from "redux-thunk";
import Cookie from "js-cookie";
import {
  signInReducer,
  registerReducer,
  userUpdateReducer,
} from "./reducers/user";
import {
  myOrderListReducer,
  orderCreateReducer,
  orderDeleteReducer,
  orderDetailsReducer,
  orderListReducer,
  orderPayReducer,
} from "./reducers/order";
const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;
const initialState = {
  cart: { cartItems, shipping: {}, payment: {} },
  userSignIn: { userInfo },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignIn: signInReducer,
  userRegister: registerReducer,
  productSave: productSaveReducer,
  productDelete: productDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  userUpdate: userUpdateReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
