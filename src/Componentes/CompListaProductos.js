import React,{Component} from 'react';
import CompProductoResumen from './CompProductoResumen';

class CompListaProductos extends Component{
    render(){
        const { pListaProductos } = this.props;
        if (!Array.isArray(pListaProductos) || pListaProductos.length === 0) {
            return (
                <div className="col-9"> 
                    <div className="alert alert-info text-center" role="alert">
                        **No se encontraron productos** para la categoría seleccionada o la lista está vacía.
                    </div>
                </div>
            );
        }
        return <div className="col-9">
                
                <div className="row row-col-1 row-col-md-3">
                    {
                        this.props.pListaProductos.map(
                            lp => <CompProductoResumen pDatosDelProducto={lp} key={lp.id}/>
                        )
                    }
                </div>
            </div>
    }
}
export default CompListaProductos;