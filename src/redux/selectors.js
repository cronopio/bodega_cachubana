// Retorna las ordenes sacadas del estado
export const getOrdersState = store => store.orders;

// Retorna un listado de ordenes sacadas a partir del estado
export const getOrderList = store =>
  getOrdersState(store) ? [...getOrdersState(store)] : [];

// Retorna si es encontrada por el ID un orden especifico
export const getOrderById = (store, id) => 
  getOrdersState(store) ? getOrdersState(store).filter(o => o._id === id).pop() : {};

// Retorna un listado de ordenes detallas sacadas a partir del estado
export const getOrders = store =>
  getOrderList(store).map(order => getOrderById(store, order._id));

// Retorna un listado filtrado de acuerdo al filtro de visibilidad
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

// Retorna un listado de ordenes filtrada por codigo de Region
export const getOrdersByFiltroRegion = (store, filterRegion) => {
  if (filterRegion === 'All') return getOrders(store)
  return getOrders(store).filter(order => (order.region_code === filterRegion))
}

// Revisa los parametros de ordenamiento y retorna un listado filtrado y ordenado
export const getOrdersSortedAndFilteredByRegion = (store, filterRegion, sorter) => {
  if (!sorter.direction || sorter.direction === 'DESC') {
    return getOrdersByFiltroRegion(store, filterRegion).sort(sortBy(sorter.by))
  } else if (sorter.direction === 'ASC') {
    return getOrdersByFiltroRegion(store, filterRegion).sort(sortBy(sorter.by)).reverse()
  }
}

// Helper para order por los criterios solicitados
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

// Helper para sacar el porcentaje de completado de una lista de productos
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
// Helper para retornar un array con valores unicos
export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

// Retorna un listado de ordenes filtradas por routeId
export const getOrdersByRoute = (store, routeId) => {
  return getOrders(store).filter((order) => {
    return routeId === order.routeId
  })
}

// Retorna un listado de rutas que contienen sus respectivas ordenes
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

// Retorna un objeto con la informacion de los conteos de
// productos alistados y productos requeridos en la orden
export const getProductCountByOrder = (products) => {
  let alistados = products.map(p => {
    if (p.finished) return p.quantity
    return (typeof p.alistado === 'undefined') ? 0 : p.alistado;
  }).reduce((accum, initial) => accum+initial, 0)

  let necesarios = products.map(p => p.quantity).reduce((accum, initial) => accum+initial, 0)
  return {alistados, necesarios}
}