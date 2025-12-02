import React,{Component} from 'react';

 const url = "https://backmitiendavirtual-production.up.railway.app/api/categoria/";
class CompListaCategorias extends Component{
     state = {
        lista_categoria: []
    }  

    componentDidMount() {
        fetch(url)
            .then(response => {
                    return response.json();
                })
            .then(lista_categoria => {
                this.setState({
                    lista_categoria
                })
            })
            .catch(error => console.error("Error al cargar categorías:", error));
    }
    render(){
        return <div className="col-3">
            <p className="h5 text-secondary">
                Categorías ({this.state.lista_categoria.length})
            </p>
            <div className="card">
                <ul className="list-group list-group-flush">
                   
                    {
                        this.state.lista_categoria.map((categoria, indice) => {
                            
                            return <li className="list-group-item  list-group-item-action" key={categoria.id} onClick={() => this.props.pManejarClickCategoria(categoria.id)} >
                                <p  className="text-secondary" style={{cursor: 'pointer'}}>
                                    {categoria.nombre}
                                </p>
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

export default CompListaCategorias;