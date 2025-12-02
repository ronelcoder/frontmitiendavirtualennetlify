import React, {Component} from 'react';

class CompCabecera extends Component{
    render(){
        return <nav className="navbar navbar-expand-md mb-4">
            <div className="container">
                <span className="float-left">
                    
                </span>
                <span className="float-right">
                        <div className="collapse navbar-collapse" id="navbarText">
                            <img src="imagenes/carrito.png" width="32" height="32" alt="" />
                            <a className="text-danger" 
                                href="#">&nbsp;{this.props.pCantidadProductos} productos(s) - S/
                                        &nbsp;{this.props.pTotal}</a>
                        </div> 
                </span>
            </div>
        </nav>
    }
}
export default CompCabecera;