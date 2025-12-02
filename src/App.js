import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PageListaProductos from './Componentes/PageListaProductos';
import PageListaPedidos from './Componentes/PageListaPedidos';
import PageProducto from './Componentes/PageProducto';
import PagePedidoDetalle from './Componentes/PagePedidoDetalle';
import CompMenu from './Componentes/CompMenu';
import PagePedidoCliente from './Componentes/PagePedidoCliente';
import PageInicio from './Componentes/PageInicio';
import PageGestionCategoria from './Componentes/PageGestionCategoria';

class App extends Component {
  render() {
    return <Router>
      <CompMenu />
      <Routes>
          <Route path="/" exact  element={<PageInicio/>}     />                     
        
          <Route path="/__PageGestionCategoria"    element={ <PageGestionCategoria />}  />
       
          <Route path="/PagePedidoCliente"    element={<PagePedidoCliente />}   />              
           <Route path="/PageListaProductos/PageProducto/:id" element={<PageProducto />} />    
          <Route path="/PageListaProductos"     element={<PageListaProductos />}    />
          <Route path="/PagePedidoDetalle"     element={<PagePedidoDetalle />}    />
           <Route path="/PageListaPedidos"     element={<PageListaPedidos />}    />
      </Routes>
    </Router>
  }
}

export default App;
