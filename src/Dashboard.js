import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOrders, getOrdersSortedAndFilteredByRegion } from './redux/selectors';
import ViewOrder from './viewOrder';
import FiltroRegion from './filtroRegion';
import SortButtons from './sortButtons';

class Dashboard extends Component {
  render() {
    let orderList = this.props.orders.map(order => <ViewOrder order={order} key={order._id} />)
    let regionList = this.props.orders.map(order => order.region_code)
    return (
      <div>
        <FiltroRegion regiones={regionList} />
        <SortButtons />
        {orderList}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let { filterRegion, sorter } = state;
  if (!filterRegion) {
    filterRegion = 'All'
  }
  if (!sorter) {
    sorter = {
      by:'Ruta',
      direction: 'DESC'
    }
  }
  return {
    filterRegion,
    sorter,
    orders: getOrdersSortedAndFilteredByRegion(state, filterRegion, sorter)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);