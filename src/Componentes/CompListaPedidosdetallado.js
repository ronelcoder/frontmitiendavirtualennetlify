import React,{Component} from 'react';
import CompSubpedidodetalle from './CompSubpedidodetalle';


class CompListaPedidosdetallado extends Component{
    render(){
        const {itemsdelpedido} = this.props;
        return (
            <table className="table table-striped"> 
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-right">Precio Unitario</th>
                        <th className="text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody>                    
                    {
                    Array.isArray(itemsdelpedido) && itemsdelpedido.length > 0 ?
                    itemsdelpedido.map(pedidodetalle => (
                        <CompSubpedidodetalle  key={pedidodetalle.id}  datosdelpedido={pedidodetalle} 
                        />
                    )):
                    <tr>
                                <td colSpan="4" className="text-center">
                                    {/* Cambia X por el número de columnas de tu tabla */}
                                    Selecciona un pedido para ver los detalles, o no se encontraron detalles.
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        );              
    }
}
export default CompListaPedidosdetallado;