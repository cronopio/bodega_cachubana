import React, { Component } from 'react';
import { connect } from 'react-redux';

// Este componente renderiza una lista de productos recibidos en props
function ProductsList(props) {
  return (
    <div className='container-products'>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
      {
        props.products.map((product, i) => (
          <Product product={product} key={i} />
        ))
      }
         </tbody>
      </table>
    </div>
  )
}

// Este componente renderiza un solo producto y su informacion.
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
  setAlistarGui(event){
    this.props.updateState('alistandoOrden', event.target.value)
    this.props.updateState('gui', 'alistar')
  }

  render(){
    return (
      <div className='container-bodega'>
        {
          this.props.orders.map(order => (
            <div key={order._id} className='item-order'>
              <div><h3>{order.user.name} <span style={{fontWeight: 'bold'}}>[{order.region_code}]</span></h3></div>
              <div>{order.slot}</div>
              <p>Listado de Productos: <button className="btn" onClick={this.setAlistarGui.bind(this)} value={order._id}>Alistar</button></p>
              <ProductsList products={order.products} />
            </div>
          ))
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders
})

export default connect(mapStateToProps)(OrdersListBodega);