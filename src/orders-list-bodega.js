import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrdersByVisibilityFilter } from './redux/selectors';
import FiltrosVisuales from './filtroVisual';

// Este componente renderiza una lista de productos recibidos en props
function ProductsList(props) {
  // Saco la sumatoria de todos los productos alistados
  let alistados = props.products.map(p => {
    if (p.finished) return p.quantity
    return (typeof p.alistado === 'undefined') ? 0 : p.alistado;
  }).reduce((accum, initial) => accum+initial, 0)
  // Saco la sumatoria de todos los productos pedidos
  let necesarios = props.products.map(p => p.quantity).reduce((accum, initial) => accum+initial, 0)

  // Saco la sumatoria con totales
  let granTotal = props.products.map(p => p.total).reduce((accum, initial) => accum+initial, 0)

  // Calculo entonces los porcentajes
  let porcentajeCompletado = ((alistados * 100) / necesarios).toFixed(0)
  let porcentajeFaltante = (100 - porcentajeCompletado).toFixed(0)
  return (
    <div className='container-products'>
      <h4 style={{margin:'0'}}>Total Productos: {necesarios} </h4>
      <h4 style={{margin:'0'}}>Valor total Orden: ${granTotal}</h4>
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
  )
}

// Este componente renderiza un solo producto y su informacion.
// Se deja de usar para no mostrar esta info en el listado.
function Product(props) {
  return(
    <tr>
      <td style={{textAlign:'left'}}>{props.product.name}</td>
      <td style={{textAlign:'center'}}>${props.product.price}</td>
      <td style={{textAlign:'center'}}>{props.product.quantity}</td>
      <td style={{textAlign:'center'}}>${props.product.total}</td>
    </tr>
  )
}

// Este componente se usa para mostrar el listado de ordenes a procesar
// Esta conectado a un store de Redux y puede cambiar de GUI
class OrdersListBodega extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  setAlistarGui(event){
    this.props.updateState('alistandoOrden', event.target.value)
    this.props.updateState('gui', 'alistar')
  }

  render(){
    return (
      <div className='container-bodega'>
        <FiltrosVisuales />
        {
          this.props.orders.map(order => (
            <div key={order._id} className='item-order'>
              <div>
                <h3>{order.user.name}  |  <span style={{fontWeight: 'bold'}}>[{order.region_code}]</span> | 
                <button className="btn" onClick={this.setAlistarGui.bind(this)} value={order._id}>{(!order.finished) ? 'Alistar Orden' : 'Ver Orden'}</button>
                </h3>
              </div>
              <div>{order.slot}</div>
              <ProductsList products={order.products} />
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  let { visibilityFilter } = state;
  if (!visibilityFilter) {
    visibilityFilter = 'all'
  }
  const orders = getOrdersByVisibilityFilter(state, visibilityFilter);
  return { orders };
}

export default connect(mapStateToProps)(OrdersListBodega);