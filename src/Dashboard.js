import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, getOrdersByFiltroRegion } from './redux/selectors';
import ViewOrder from './viewOrder';
import FiltroRegion from './filtroRegion';

class Dashboard extends Component {
  render() {
    let orderList = this.props.orders.map(order => <ViewOrder order={order} key={order._id} />)
    let regionList = this.props.orders.map(order => order.region_code)
    return (
      <div>
        <FiltroRegion regiones={regionList} />
        {orderList}
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  let { filterRegion } = state;
  if (!filterRegion) {
    filterRegion = 'All'
  }
  return {
    filterRegion,
    orders: getOrdersByFiltroRegion(state, filterRegion)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);