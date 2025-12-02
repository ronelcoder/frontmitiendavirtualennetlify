import React, {Component} from 'react';
 
class CompPedidoDetalleItem extends Component{
    render(){
        return <tbody>
            <tr>
                <th scope="row">{this.props.pIndice + 1}</th>
                <td>{this.props.pItem.producto.nombre}</td>
                <td>{this.props.pItem.producto.marca.nombre}</td>
                <td className="text-right">{this.props.pItem.precioUnitario}</td>
                <td className="text-right">{this.props.pItem.cantidad}</td>
                <td className="text-right">{Number(this.props.pItem.subTotal).toFixed(2)}</td>
                <td className="text-center">
                    <button type="button" className="btn btn-outline-danger btn-sm"
                        onClick={this.props.pFuncElminarProducto.bind(
                            this, this.props.pItem.id
                        )}
                    >X</button>
                </td>
            </tr>
        </tbody>
    }
}

export default CompPedidoDetalleItem;