export const AddProduct = function AddProduct(state = [], action) {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      // Busco la orden filtrandola por ID
      // Luego busco el producto filtrandolo por ID
      // Luego incremento lo alistado en la cantidad recibida
      // Luego verifico si se completo la cantidad para marcarlo como completado
      let newOrders = state.map(order => {
        if (order._id === action.payload.order) {
          // Encuentro la Order entonces ahora busco el producto
          let newProducts = order.products.map(product => {
            if (product._id === action.payload.product) {
              // Encuentro el producto que quiero actualziar
              console.log('Encontre el producto', product)
              // Incremento lo alistado con la cantidad recibida
              let qtPrev = (typeof product.alistado === 'undefined') ? 0 : product.alistado;
              let qtNew = qtPrev += action.payload.quantity;

              if (qtNew > product.quantity) {
                qtNew = product.quantity
              }

              return Object.assign({}, product, { alistado: qtNew, finished: (qtNew >= product.quantity) })
            }
            return product
          })
          // Verifico si ya se completaron todos los productos para marcar la orden como completada
          let checkFinish = newProducts.every(p => p.finished)
          console.log('MIrame lo que termina', checkFinish)
          return Object.assign({}, order, { products: newProducts, finished: checkFinish })
        }
        return order
      })
      return [...newOrders]
    }
    default: return state;
  }
}

export const filtroVisualReducer = function filtroVisualReducer(state = 'all', action){
  switch (action.type) {
    case 'SET_FILTER': {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
}

export const toggleFinish = function tooggleFinish(state = [], action){
  switch(action.type) {
    case 'TOGGLE_FINISH': {
      let newOrders = state.map(order => {
        if (order._id === action.payload.orderId) {
          let newProducts = order.products.map(product => {
            if (product._id === action.payload.productId) {
              return Object.assign({}, product, { finished: (!product.finished) })
            }
            return product
          })
          // Verifico si ya se completaron todos los productos para marcar la orden como completada
          let checkFinish = newProducts.every(p => p.finished)
          return Object.assign({}, order, { products: newProducts, finished: checkFinish })
        }
        return order
      })
      return [...newOrders]
    }
    default: {
      return state;
    }
  }
}

export const filterRegionReducer = function filterRegionReducer(state = 'All', action){
  switch (action.type) {
    case 'FILTER_REGION': {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
}

export const sorterReducer = function sorterReducer(state={by:'Ruta',direction:'DESC'}, action){
  switch (action.type) {
    case 'ORDER_DIRECTION': {
      let by = 'Ruta'
      let direction = 'DESC'
      let newState = {}
      if (!action.payload.by) {
        newState.by = by;
      }
      if (!action.payload.direction) {
        newState.direction = direction
      }
      return Object.assign({}, action.payload, newState);
    }
    default: {
      return state;
    }
  }
}