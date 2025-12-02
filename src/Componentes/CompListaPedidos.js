import React,{Component} from 'react';

 const url = "https://backmitiendavirtual-production.up.railway.app/api/pedidos/";
class CompListaPedidos extends Component{
     state = {
        lista_pedidos: []
    }  

    componentDidMount() {
        fetch(url)
            .then(response => {
                    return response.json();
                })
            .then(lista_pedidos => {
                this.setState({
                    lista_pedidos
                })
            })
            .catch(error => console.error("Error al cargar pedidos:", error));
    }
    render(){
        return <div >
            <p className="h5 text-secondary">
                Pedidos ({this.state.lista_pedidos.length})
            </p>
            <div className="card">
                <ul className="list-group list-group-flush">                   
                    {
                        this.state.lista_pedidos.map((pedido, indice) => {
                            
                            return <li className="list-group-item  list-group-item-action" key={pedido.id} onClick={() => this.props.pManejarClickPedido(pedido.id)} >
                                <p  className="text-secondary" style={{cursor: 'pointer'}}>
                                    {pedido.id}
                                </p>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

export default CompListaPedidos;