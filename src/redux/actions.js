export const addProduct = (quantity, product, order) => ({
  type: 'ADD_PRODUCT',
  payload: {quantity, product, order}
});

export const toggleFinish = (productId, orderId) => ({
  type: 'TOGGLE_FINISH',
  payload: {productId, orderId}
})