import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrderById } from './redux/selectors';
import { addProduct, toogleFinish } from "./redux/actions";

// Utilizo este componente para la interfaz para alistar productos
function ToggleFinish(props){
  function calltoogleFinish(){
    props.toogleFinish(props.product._id, props.order._id)
  }
  return (<button onClick={calltoogleFinish}>Hey</button>);
}

class Alistar extends Component {
  constructor(props){
    super(props);

    this.callAddProduct = this.callAddProduct.bind(this)
  }

  // Llamamos la funcion necesario para iniciar una accion que cambiara el estado
  callAddProduct(Qt, productId, orderId) {
    return () => {
      this.props.addProduct(Qt, productId, orderId)
    }
  }

  render(){
    // Saco la sumatoria de todos los productos alistados
    let alistados = this.props.order.products.map(p => (typeof p.alistado === 'undefined') ? 0 : p.alistado).reduce((accum, initial) => accum+initial, 0)
    // Saco la sumatoria de todos los productos pedidos
    let necesarios = this.props.order.products.map(p => p.quantity).reduce((accum, initial) => accum+initial, 0)

    // Calculo entonces los porcentajes
    let porcentajeCompletado = ((alistados * 100) / necesarios).toFixed(0)
    let porcentajeFaltante = (100 - porcentajeCompletado).toFixed(0)
    console.log('Quiero contar los alistados', alistados, necesarios)
    return (
      <div className="orden">
        <div><h3>{this.props.order.user.name} <span style={{fontWeight: 'bold'}}>[{this.props.order.region_code}]</span></h3></div>
        <div>{this.props.order.slot}</div>
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
        <div className='container-products'>
          <table>
          <tbody>
          {
            this.props.order.products.map((product, i) => {
              let restante = (typeof product.alistado === 'undefined') ? product.quantity : product.quantity - product.alistado;
              let styleRestante = 'red'
              let actionButtons = (
                <td style={{textAlign:'right'}}></td>
              );
              if (restante <= 0 && product.finished) {
                styleRestante = 'green'
                restante = 'OK'
              }

              if (restante > 0) {
                actionButtons = (
                  <td style={{textAlign:'right'}}>
                    <button onClick={this.callAddProduct(1, product._id, this.props.order._id)}>+1</button>
                    <button onClick={this.callAddProduct(product.quantity, product._id, this.props.order._id)}>Agregar Todos</button>
                  </td>
                )
              }

              return (
                <tr key={i}>
                  <td style={{textAlign:'left'}}>{product.name} ({product.quantity})</td>
                  <td style={{textAlign:'center', color:styleRestante}}>({restante})</td>
                  {actionButtons}
                  <td>
                  <ToggleFinish product={product} order={this.props.order} toogleFinish={this.props.toogleFinish}/>
                  </td>
                </tr>
              )
            })
          }
          </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ordenId } = ownProps
  return {
    order: getOrderById(state, ordenId)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProduct: (quantity, product, order) => {
      dispatch(addProduct(quantity, product, order))
    },
    toogleFinish: (productId, orderId) => {
      dispatch(toogleFinish(productId, orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alistar);

