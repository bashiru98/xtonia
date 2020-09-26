import {
  ADD_ITEM_TO_CART,
  REMOVE_CART_ITEM,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT,
} from "./../actions/types/cart";
function cartReducer(
  state = { cartItems: [], ahipping: {}, payment: {} },
  action
) {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const item = action.payload;
      const product = state.cartItems.find((x) => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map((x) =>
            x.product === product.product ? product : x
          ),
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case REMOVE_CART_ITEM:
      return {
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}

export { cartReducer };
