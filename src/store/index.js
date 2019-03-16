import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import data from './orders.json';
import { AddProduct, filtroVisualReducer,
  toggleFinish, filterRegionReducer, sorterReducer } from './myActions'

const myReduceres = {
  'ADD_PRODUCT': AddProduct,
  'TOGGLE_FINISH': toggleFinish
}

function orderReducer(state = [], action) {
  if (myReduceres[action.type]) return myReduceres[action.type](state, action)

  switch (action.type) {
    case '@@ORDERS/ADD_ORDER': {
      return [
        ...state,
        action.payload.order,
      ] 
    }
    default: return state;
  }
}
const store = createStore(
  combineReducers({
    orders: orderReducer,
    visibilityFilter: filtroVisualReducer,
    filterRegion: filterRegionReducer,
    sorter: sorterReducer
  }),
  applyMiddleware(logger),
)

/* mock of realtime action */
let timerId = null;
let index = 0;

function getRandom(min = 1, max = 10) {
  let result = Math.random();
  result = result * (max - min + 1) + min;
  result = Math.floor(result);
  return result * 1000;
}

function startEvent(delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    store.dispatch({
      type: '@@ORDERS/ADD_ORDER',
      payload: {
        order: data[index]
      }
    });
    if (index < (data.length - 1)) {
      index += 1;
      return startEvent(getRandom());
    }
    return
  }, delay)
}

startEvent(getRandom());

export default store;