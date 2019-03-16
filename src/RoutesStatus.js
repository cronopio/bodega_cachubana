import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRoutesFromOrders, getPercentageCompleted,
    getProductCountByOrder } from './redux/selectors';

function ViewRoute(props) {
  let ordersList =  props.route.orders.map(order => {
    let percentajeComplete = getPercentageCompleted(order.products)
    let porcentajeFaltante = (100 - percentajeComplete).toFixed(0);
    return (
      <tr key={order._id}>
        <td>{order.user.name}</td>
        <td>{percentajeComplete}%</td>
        <td>{porcentajeFaltante}%</td>
      </tr>
    )
  })
  let alistadosOrders = props.route.orders.map(order => 
    getProductCountByOrder(order.products)
  ).reduce((accum, initial) => accum+Number(initial.alistados), 0)

  let necesariosOrders = props.route.orders.map(order => 
    getProductCountByOrder(order.products)
  ).reduce((accum, initial) => accum+Number(initial.necesarios), 0)

  let percentajeCompleteRoute = ((alistadosOrders * 100) / necesariosOrders).toFixed(0)
  let porcentajeFaltanteRoute = (100 - percentajeCompleteRoute).toFixed(0);
  return (
    <div className="view-route">
    <table>
    <thead>
      <tr>
      <th style={{color:'gray'}}>Ruta: {props.route.routeId}</th>
      <th style={{color:'green'}}>{percentajeCompleteRoute}%</th>
      <th style={{color:'red'}}>{porcentajeFaltanteRoute}%</th>
      </tr>
      <tr>
        <th>Usuario Orden</th>
        <th>%Completado</th>
        <th>%Faltante</th>
      </tr>
    </thead>
    <tbody>
      {ordersList}
    </tbody>
    </table>
    <hr />
    </div>
  )
}

class RoutesStatus extends Component {
  render(){
    let { routes } = this.props;
    return (
      <div className='routes-status'>
        {
          routes.map(route => (<ViewRoute route={route} key={route.routeId} />))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    routes: getRoutesFromOrders(state)
  }
}
export default connect(mapStateToProps)(RoutesStatus)