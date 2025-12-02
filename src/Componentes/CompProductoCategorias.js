import React,{Component} from 'react';

 const url = "https://backmitiendavirtual-production.up.railway.app/api/categoria/";
class CompProductoCategorias extends Component{
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
    // Llama a la función 'onSelectCategoria' que viene del componente padre.
    manejarClickCategoria = (idCategoria) => {
        // La función 'onSelectCategoria' se espera que venga de los props
        if (this.props.onSelectCategoria) {
            this.props.onSelectCategoria(idCategoria);
        }
    }
    render(){
        const { categoriaSeleccionada } = this.props;
        return <div className="col-3">
            <p className="h5 text-secondary">
                Categorías ({this.state.lista_categoria.length})
            </p>
            <div className="card">
                <ul className="list-group list-group-flush">
                   
                    {
                        this.state.lista_categoria.map((categoria, indice) => {
                           const isSelected = categoria.id.toString() === categoriaSeleccionada; 
                            return (
                            <li className={`list-group-item  list-group-item-action ${isSelected ? 'active bg-primary text-white' : ''}`} key={categoria.id} onClick={() => this.manejarClickCategoria(categoria.id)}
                                        style={{ cursor: 'pointer' }} >
                                <p className={`h6 ${isSelected ? 'text-white' : 'text-secondary'}`}>
                                            {categoria.nombre}
                                        </p>
                            </li>
                        );
                        })
                    }
                </ul>
            </div>
        </div>
    }
}

export default CompProductoCategorias;