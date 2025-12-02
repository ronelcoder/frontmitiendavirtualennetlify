import React, {Component} from 'react';

class CompProductoDetalle extends Component {
    render(){
      const { pDatosDelProducto } = this.props;
        
        
        if (!pDatosDelProducto || !pDatosDelProducto.url) {
            return <div>Cargando detalle del producto...</div>;
        }

        const urlImagen = `/imagenes/${pDatosDelProducto.url}`;        

        return (
            <div className="producto-detalle-container"> {}
                <div className="producto-detalle-content"> {/* Contenedor para Flexbox */}
                    <div className="producto-detalle-info"> {/* Lado izquierdo: Descripciones */}
                        {}
                        {}
                            <h2 className="card-title">{pDatosDelProducto.nombre}</h2> {}
                        {}
                        <p className="card-text">{pDatosDelProducto.descripcion}</p>
                        <p className="text-precio">S/ {pDatosDelProducto.precio}</p>
                        {}
                        <button className="btn btn-primary mt-3">Añadir al Carrito</button>
                    </div>

                    <div className="producto-detalle-imagen"> {/* Lado derecho: Imagen */}
                        <img src={urlImagen} className="img-fluid" alt={pDatosDelProducto.nombre} />
                    </div>
                </div>
            </div>
        );
    }
}
export default CompProductoDetalle;
