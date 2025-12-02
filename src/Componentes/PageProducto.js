import React,{Component} from 'react';
import CompProductoCategorias from './CompProductoCategorias';
import CompProductoDetalle from './CompProductoDetalle';
import { useParams } from 'react-router-dom';
import CompPiePagina from './CompPiePagina';

const urlProductobase = "https://backmitiendavirtual-production.up.railway.app/api/productos/producto/";

// Función HOC (Componente de Orden Superior) para inyectar los parámetros de la ruta
function withRouter(Component) {
  return function ComponenteEnvuelto(props) {
    const params = useParams();
    return <Component {...props} params={params} />;
  };
}

class PageProducto extends Component{
      state = {
        producto: {}
    }
   cargarProducto = (url) => {
      fetch(url)
          .then(response => {
            if (!response.ok) {
                   throw new Error('Network response was not ok');
                }
               return response.json();
      })
          .then(producto => {
           this.setState({
             producto:producto              // Actualiza el estado
       })
     })
        .catch(error => console.error("Error al cargar producto:", error));
 }
   
  
    componentDidMount() {
       // 1. Obtener el ID del parámetro 'id' definido en la ruta '/PageProducto/:id'
        const productoId = this.props.params.id;          
        const urlEspecifica = urlProductobase + productoId;
        // 3. Cargar el producto
        this.cargarProducto(urlEspecifica);
    }
    render(){
        return <div>

                    <main role="main" className="container">
                        <div className="row">
                            <CompProductoCategorias />
                            <CompProductoDetalle pDatosDelProducto={this.state.producto}/>
                        </div>
                    </main>
                    <CompPiePagina/>
            </div>
    }
}
export default withRouter(PageProducto);