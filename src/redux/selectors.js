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

export const getOrdersSortedAndFilteredByRegion = (store, filterRegion, sorter) => {
  if (!sorter.direction || sorter.direction === 'DESC') {
    return getOrdersByFiltroRegion(store, filterRegion).sort(sortBy(sorter.by))
  } else if (sorter.direction === 'ASC') {
    return getOrdersByFiltroRegion(store, filterRegion).sort(sortBy(sorter.by)).reverse()
  }
}

export const sortBy = (attr) => {
  switch(attr) {
    case 'Ruta': {
      return function (first, second) {
        return first.routeId.localeCompare(second.routeId)
      }
    }
    case 'Slot':{
      return function (first, second) {
        return first.slot.localeCompare(second.slot)
      }
    }
    case 'Alistado': {
      return function (first, second) {
        let firstPercentage = getPercentageCompleted(first.products)
        let secondPercentage = getPercentageCompleted(second.products)
        return firstPercentage - secondPercentage;
      }
    }
    default: {
      return function (first, second) {
        return first.routeId.localeCompare(second.routeId)
      }
    }
  }
}

export const getPercentageCompleted = (products) => {
  // Saco la sumatoria de todos los productos alistados
  let alistados = products.map(p => {
    if (p.finished) return p.quantity
    return (typeof p.alistado === 'undefined') ? 0 : p.alistado;
  }).reduce((accum, initial) => accum+initial, 0)
  // Saco la sumatoria de todos los productos pedidos
  let necesarios = products.map(p => p.quantity).reduce((accum, initial) => accum+initial, 0)
  // Calculo entonces el porcentaje completado
  return ((alistados * 100) / necesarios).toFixed(0)
}

// Sacada de Stackoverflow
export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const getOrdersByRoute = (store, routeId) => {
  return getOrders(store).filter((order) => {
    return routeId === order.routeId
  })
}

export const getRoutesFromOrders = (store) => {
  let allOrders = getOrders(store)
  let allRoutes = allOrders.map(order => order.routeId).filter(onlyUnique)
  return allRoutes.map(route => {
    return {
      routeId: route,
      orders: getOrdersByRoute(store, route)
    }
  })
}

export const getProductCountByOrder = (products) => {
  let alistados = products.map(p => {
    if (p.finished) return p.quantity
    return (typeof p.alistado === 'undefined') ? 0 : p.alistado;
  }).reduce((accum, initial) => accum+initial, 0)

  let necesarios = products.map(p => p.quantity).reduce((accum, initial) => accum+initial, 0)
  return {alistados, necesarios}
}