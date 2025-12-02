import React,{Component} from 'react';
import CompListaPedidosdetallado from './CompListaPedidosdetallado';
import CompPiePagina from './CompPiePagina';
import CompListaPedidos from './CompListaPedidos';

const urlPedidos = "https://backmitiendavirtual-production.up.railway.app/api/pedidos";

class PageListaPedidos extends Component{
      state = {
        lista_pedidos: [],
        detalle_pedido_seleccionado: []
     }
// Función que carga los detalles del pedido específico
    cargarListaDetalle = (urlEspecifica) => {
        fetch(urlEspecifica)
            .then(response => response.json())
            .then(data => {
                // Extraer el array de detalles del objeto principal
            const detalles = data.pedidoDetalles || [];
                this.setState({ 
                    detalle_pedido_seleccionado:Array.isArray(detalles) ? detalles : []
                });
            })
            .catch(error => {console.error("Error al cargar detalles:", error);
                          this.setState({ detalle_pedido_seleccionado: [] });
             });
    }
   
 // Función que se pasará al componente de pedidos
// Recibe el ID de pedido y llama a cargarListaDetalle con la URL correcta
  manejarSeleccionPedido = (Id) => {
        const urlEspecifica = `${urlPedidos}/${Id}`;
        this.cargarListaDetalle(urlEspecifica);
  }
  
    render(){
        return (
        <div>
            <main role="main" className="container">
                <div className="row">                   
                    <div className="col-2 pr-0">
                        <CompListaPedidos 
                            pManejarClickPedido={this.manejarSeleccionPedido}
                        />
                    </div>                         
                    <div className="col-10 pl-0">
                        <CompListaPedidosdetallado itemsdelpedido={this.state.detalle_pedido_seleccionado}  />
                    </div>                    
                </div>
            </main>
            <CompPiePagina/>
        </div>
    );
    }
}
export default PageListaPedidos;