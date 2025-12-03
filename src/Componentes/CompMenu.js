import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CompMenu extends Component {
    render() {
        return <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container">
                <span className="float-left">
                    <Link className="navbar-brand" to="/">
                        <img src="imagenes/logo.png" width="250" height="35" alt="" />
                    </Link>
                </span>
                <span className="float-right">
                    <ul className="btn btn-group">
                        <li className="btn btn-dark">
                            <Link to="/" >Inicio</Link>
                        </li>                    
                        <li className="btn btn-dark">
                            <Link to="/PagePedidoCliente" >Cliente</Link>
                        </li>                     
                        <li className="btn btn-dark">
                            <Link to="/__PageGestionCategoria" >GestionCategoria</Link>
                        </li>                      
                        <li className="btn btn-dark">
                            <Link to="/PageListaProductos" >Productos</Link>
                        </li>
                        <li className="btn btn-dark">
                            <Link to="/PagePedidoDetalle" >Agregar Pedido</Link>
                        </li>
                          <li className="btn btn-dark">
                            <Link to="/PageListaPedidos" >Pedidos</Link>
                        </li>
                    </ul>
                </span>
            </div>
        </nav>
    }
}
export default CompMenu;
//to es el value logico