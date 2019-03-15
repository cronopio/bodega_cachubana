import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import logo from './logo.svg';
import './App.css';
import OrdersList from './orders-list';
import Bodega from './Bodega';
import Alistar from './Alistar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gui: '',
      alistandoOrden: ''
    }
  }

  selectGui(event){
    event.preventDefault();
    this.setState({ gui: event.target.value })
  }

  handleUpdateState(name, value) {
    this.setState({ [name]: value })
  }

  render() {
    var componentToRender
    switch(this.state.gui) {
      case 'dashboard':
        componentToRender = (
          <div className="App-container">
            <p>Interfaz de Gerente</p>
            <div className="navbar">
              <button className="App-link navbar-btn" onClick={this.selectGui.bind(this)} value="ninguna">Ir al Inicio</button>
            </div>
          </div>
        )
        break;
      case 'bodega':
        componentToRender = (
          <div className="App-container">
            <p>Interfaz de Bodega</p>
            <div className="navbar">
              <button className="App-link navbar-btn" onClick={this.selectGui.bind(this)} value="ninguna">Ir al Inicio</button>
            </div>
            <Bodega updateState={this.handleUpdateState.bind(this)} />
            <div className="navbar">
              <button className="App-link navbar-btn" onClick={this.selectGui.bind(this)} value="ninguna">Ir al Inicio</button>
            </div>
          </div>
        )
        break;
      case 'alistar':
        componentToRender = (
          <div className="App-container">
            <p>Entro a la Interfaz de Alistar Orden</p>
            <div className="navbar">
              <button className="App-link navbar-btn" onClick={this.selectGui.bind(this)} value="bodega">Ir al Listado</button>
            </div>
            <Alistar ordenId={this.state.alistandoOrden} />
            <div className="navbar">
              <button className="App-link navbar-btn" onClick={this.selectGui.bind(this)} value="bodega">Ir al Listado</button>
            </div>
          </div>
        )
        break;
      default:
        componentToRender = (
          <div className="App-container">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Bienvenidos a la plataforma de Cachubana. Por favor elija entre las siguientes opciones de acuerdo a su rol en la empresa.
            </p>
            <div className="navbar">
              <button className="App-link navbar-btn" onClick={this.selectGui.bind(this)} value="dashboard">Soy Gerente</button>|
              <button className="App-link navbar-btn" onClick={this.selectGui.bind(this)} value="bodega">Soy Operario de Bodega</button>
            </div>
            <OrdersList />
          </div>
        )
        break;
    }
    return (
      <Provider store={store}>
        <div className="App">
          {componentToRender}
        </div>
      </Provider>
    );
  }
}

export default App;
