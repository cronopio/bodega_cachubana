import React, { Component } from 'react';

function ProductList(props) {
  let incompleteFirst = props.products.sort((first, second) => {
    if (first.finished && !second.finished) return 1;
    if (!first.finished && !second.finished) return 0;
    if (first.finished && second.finished) return 0;
    if (!first.finished && second.finished) return -1;
  })
  return (
    <table>
    <thead>
    <tr>
      <th>Nombre</th>
      <th>Alistado</th>
      <th>Faltante</th>
    </tr>
    </thead>
    <tbody>
    {
      incompleteFirst.map(product => (
        <tr key={product._id} style={{backgroundColor:(product.finished) ? '#005900' : '#b84747'}}>
          <td>{product.name}</td>
          <td>
            {(typeof product.alistado === 'undefined') ? 0 : product.alistado}
          </td>
          <td>
            {(typeof product.alistado === 'undefined') ?
              product.quantity :
              product.quantity - product.alistado}
          </td>
        </tr>
      ))
    }
    </tbody>
    </table>
  )
}

class ViewOrder extends Component {
  constructor(props){
    super(props);
    this.state = {
      order: props.order,
    }
  }

  render(){
    let { order } = this.state;
    // Saco la sumatoria de todos los productos alistados
    let alistados = order.products.map(p => {
      if (p.finished) return p.quantity
      return (typeof p.alistado === 'undefined') ? 0 : p.alistado;
    }).reduce((accum, initial) => accum+initial, 0)
    // Saco la sumatoria de todos los productos pedidos
    let necesarios = order.products.map(p => p.quantity).reduce((accum, initial) => accum+initial, 0)
    // Calculo entonces los porcentajes
    let porcentajeCompletado = ((alistados * 100) / necesarios).toFixed(0)
    let porcentajeFaltante = (100 - porcentajeCompletado).toFixed(0)

    return (
      <div key={order._id} className='item-order'>
        <div>
          <p><span style={{fontWeight: 'bold'}}>{order.user.name}</span>  |  <span>[{order.region_code}]</span></p>
        </div>
        <div>
          <p>Ruta: <span style={{fontWeight: 'bold'}}>{order.routeId}</span></p>
          <p>Slot: <span style={{fontWeight: 'bold'}}>{order.slot}</span></p>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th style={{paddingRight: '2em', backgroundColor: 'green'}}>Completado</th>
                <th style={{backgroundColor: 'red'}}>Faltante</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{backgroundColor: 'green'}}>{porcentajeCompletado}%</td>
                <td style={{backgroundColor: 'red'}}>{porcentajeFaltante}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ProductList products={order.products} />
      </div>
    )
  }
}

export default ViewOrder;