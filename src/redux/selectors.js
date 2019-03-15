export const getOrdersState = store => store.orders;

export const getOrderList = store =>
  getOrdersState(store) ? [...getOrdersState(store)] : [];

export const getOrderById = (store, id) => 
  getOrdersState(store) ? getOrdersState(store).filter(o => o._id === id).pop() : {};

export const getOrders = store =>
  getOrderList(store).map(id => getOrderById(store, id));