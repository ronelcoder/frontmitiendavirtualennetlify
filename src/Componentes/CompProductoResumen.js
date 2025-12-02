import React, {Component} from 'react';
import { Link } from 'react-router-dom';
class CompProductoResumen extends Component {
    render(){
        var urlImagen = "imagenes/" + this.props.pDatosDelProducto.url
        var urlProducto = "PageProducto/" + this.props.pDatosDelProducto.id;
        return <div className="col mb-4">
            <div className="card h-100">
                <a href="#">
                    <img src={urlImagen} className="card-img-top" alt="..." />
                </a>
                <div className="card-body">
                   <Link className="text-primary" to={urlProducto}> 
                        <h5 className="card-title">{this.props.pDatosDelProducto.nombre}</h5>
                    </Link>
                    <p className="card-text">{this.props.pDatosDelProducto.descripcion}
                    </p>
                    <p className="text-primary">S/ {this.props.pDatosDelProducto.precio}
                    </p>
                </div>
            </div>
        </div>
    }
}
export default CompProductoResumen;