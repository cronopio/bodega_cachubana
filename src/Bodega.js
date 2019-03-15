import React, { Component } from 'react';
import OrdersListBodega from './orders-list-bodega';

// Utilizo este componente para mostrar el listado de ordenes entrantes

class Bodega extends Component {
  render(){
    return (
      <div className="lista">
        <OrdersListBodega updateState={this.props.updateState}/>
      </div>
    )
  }
}
export default Bodega;