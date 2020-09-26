export const initialState = {
  cart: [],
  user: null,
};

const itemReducer = (state = initialState, action) => {
  const { type, item } = action;
  switch (type) {
    case "ADD_To_CART":
      return {
        ...state,
        cart: item,
      };

    case "REMOVE_FROM_BASKET":
      return { state };
    default:
      return state;
  }
};

export default itemReducer;
