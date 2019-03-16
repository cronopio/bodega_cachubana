import React, { Component } from 'react';
import { getPercentageCompleted } from './redux/selectors';

// Utilizo este componente para producir el listado de productos
// que sera mostrada en el componente ViewOrder que muestra los
// detalles de la orden
function ProductList(props) {
  let incompleteFirst = props.products.sort((first, second) => {
    let valorRetorno
    if (first.finished && !second.finished) valorRetorno = 1;
    if (!first.finished && !second.finished) valorRetorno = 0;
    if (first.finished && second.finished) valorRetorno = 0;
    if (!first.finished && second.finished) valorRetorno = -1;
    return valorRetorno
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


// Utilizo este componente para mostrar el detalle de una orden.
class ViewOrder extends Component {
  constructor(props){
    super(props);
    this.state = {
      order: props.order
    }
  }

  render(){
    let { order } = this.state;

    let porcentajeCompletado = getPercentageCompleted(order.products)
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