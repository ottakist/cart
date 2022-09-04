import CartItem from './CartItem';

const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((CartItem) => CartItem.id !== action.payload),
    };
  }
  if (action.type === 'INCREASE') {
    let tempCart = state.cart.map((CartItem) => {
      if (CartItem.id === action.payload) {
        return { ...CartItem, amount: CartItem.amount + 1 };
      }
      return CartItem;
    });
    return { ...state, cart: tempCart };
  }
  if (action.type === 'DECREASE') {
    let tempCart = state.cart
      .map((CartItem) => {
        if (CartItem.id === action.payload) {
          return { ...CartItem, amount: CartItem.amount - 1 };
        }
        return CartItem;
      })
      .filter((CartItem) => CartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (carTotal, cartItem) => {
        let { price, amount } = cartItem;
        carTotal.total += amount * price;
        carTotal.amount += amount;
        // console.table(price, amount);
        return carTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }
  if (action.type === 'SHOW_ITEMS') {
  return{...state,loading:false,cart:action.payload}
  }
  throw new Error('No matching actions')
};
export default reducer;
