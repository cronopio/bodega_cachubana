function myActions(state = [], action) {
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
      return newOrders
    }
    default: return state;
  }
}

export default myActions;