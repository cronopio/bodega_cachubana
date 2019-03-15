export const addProduct = (quantity, product, order) => ({
  type: 'ADD_PRODUCT',
  payload: {quantity, product, order}
});