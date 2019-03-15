export const getOrdersState = store => store.orders;

export const getOrderList = store =>
  getOrdersState(store) ? [...getOrdersState(store)] : [];

export const getOrderById = (store, id) => 
  getOrdersState(store) ? getOrdersState(store).filter(o => o._id === id).pop() : {};

export const getOrders = store =>
  getOrderList(store).map(order => getOrderById(store, order._id));

export const getOrdersByVisibilityFilter = (store, visibilityFilter) => {
  const allOrders = getOrders(store);
  switch (visibilityFilter) {
    case 'completed':
      return allOrders.filter(order => order.finished);
    case 'incomplete':
      return allOrders.filter(order => !order.finished);
    case 'all':
    default:
      return allOrders;
  }
};

export const getOrdersByFiltroRegion = (store, filterRegion) => {
  if (filterRegion === 'All') return getOrders(store)
  return getOrders(store).filter(order => (order.region_code === filterRegion))
}