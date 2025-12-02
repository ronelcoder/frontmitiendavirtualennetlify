import React, {Component} from 'react';

class CompSubpedidodetalle extends Component {
    render(){        
       const detalle = this.props.datosdelpedido;
       const nombreProducto = detalle.idProductoNavigation 
            ? detalle.idProductoNavigation.nombre 
            : detalle.idProducto;
        return (            
            <tr>                
                <td>
                    <strong>{nombreProducto}</strong>
                </td>                          
                <td className="text-center">
                    {detalle.cantidad}
                </td>               
                <td className="text-right">
                    S/ {detalle.precioUnitario?.toFixed(2)}
                </td>               
                <td className="text-right">
                    <strong>S/ {detalle.subTotal?.toFixed(2)}</strong>
                </td>
            </tr>
        );
    }
}
export default CompSubpedidodetalle;