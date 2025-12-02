import React,{Component} from 'react';
import CompListaCategorias from './CompListaCategorias';
import CompListaProductos from './CompListaProductos';
import CompPiePagina from './CompPiePagina';

const urlProductos = "https://backmitiendavirtual-production.up.railway.app/api/productos";
const urlBasePorCategoria = "https://backmitiendavirtual-production.up.railway.app/api/productos/porcategoria/";
class PageListaProductos extends Component{

      state = {
        lista_productos: []
    }
   cargarListaProductos = (url) => {
      fetch(url)
          .then(response => {
               return response.json();
      })
          .then(lista_productos => {
           this.setState({
             lista_productos // Actualiza el estado
       })
     })
        .catch(error => console.error("Error al cargar productos:", error));
 }
 // Función que se pasará al componente de categorías
// Recibe el ID de la categoría y llama a cargarListaProductos con la URL correcta
  manejarSeleccionCategoria = (categoriaId) => {
        const urlEspecifica = urlBasePorCategoria + categoriaId;
        this.cargarListaProductos(urlEspecifica);
  }
  // Al cargarse esta clase, llama a la lista de todos los productos por defecto
    componentDidMount() {
       this.cargarListaProductos(urlProductos); 
 }
    render(){
        return <div>

                    <main role="main" className="container">
                        <div className="row">
                            <CompListaCategorias pManejarClickCategoria={this.manejarSeleccionCategoria}/>
                            <CompListaProductos pListaProductos={this.state.lista_productos}/>
                        </div>
                    </main>
                    <CompPiePagina/>
            </div>
    }
}
export default PageListaProductos;