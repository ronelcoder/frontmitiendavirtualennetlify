import React, { Component } from 'react';
import CompCabecera from './CompCabecera';
import CompProductoCategorias from './CompProductoCategorias';
import CompPedidoDetalle from './CompPedidoDetalle';
import CompPiePagina from './CompPiePagina';

const url1 = "https://backmitiendavirtual-production.up.railway.app/api/pedidos/";
const urlProductos = "https://backmitiendavirtual-production.up.railway.app/api/productos/";
class PagePedidoDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoriaSeleccionadaId:"", 
            productos: [],
            dataPedido: {},
            listaDetalle: [],
            miPedido: {},
            miPedidoDetalle: [],
            contador: 0
        };
    }
    // 💡 Esta función se pasa como prop a CompProductoCategorias
    manejarSeleccionCategoria = (idCategoria) => {        
        this.setState({
            categoriaSeleccionadaId: idCategoria.toString()
        },() => {        
        console.log("Categoría seleccionada:", this.state.categoriaSeleccionadaId);
    });
    }
     
    // Lógica para obtener productos filtrados, se pasa como prop a CompPedidoDetalle
    obtenerProductosFiltrados = () => {
        const { productos, categoriaSeleccionadaId } = this.state;        
        if (!categoriaSeleccionadaId || categoriaSeleccionadaId === "") {
            return []; 
        }
        return productos.filter(producto =>   { 
            if (producto.idCategoria) {
                return producto.idCategoria.toString() === categoriaSeleccionadaId;}
            return false;
    });
    }
    
    //al cargarse esta clase llama automatico a este metodo
    componentDidMount() {
        fetch(url1)
            .then(response => {
                    return response.json();
                })
            .then(dataPedido => {
                this.setState({
                    dataPedido,miPedido: dataPedido
                })
            });
        fetch(urlProductos)
            .then(response => {
                    return response.json();
                })
            .then(productos => {
                this.setState({
                    productos
                });
            })
            .catch(error => console.error("Error al cargar productos:", error));
    }
    
//este no inserta en BD solo pasa pa abajo:lista virtual
    agregarProductoAlPedido = (pIdreal, pProducto, pMarca, pPrecio, pCantidad) => {
        console.log(pProducto);
        const idLocalUnico = Date.now() + Math.random();
        const nuevoItemDetalle = {
            "id": idLocalUnico,   // ID temporal para el frontend/función de eliminar
            "idPedido": null,
            "idProducto": pIdreal,
            "cantidad": pCantidad,
            "precioUnitario": pPrecio,
            "subTotal": pPrecio * pCantidad,
            "producto": {
                "id": pIdreal,
                "idCategoria": 0,
                "idMarca": 0,
                "nombre": pProducto,
                "precio": pPrecio,
                "categoria": {
                    "id": 0,
                    "nombre": ""
                },
                "marca": {
                    "id": 0,
                    "nombre": pMarca
                }
            }
        };

        let nuevoPedidoDetalle = [...this.state.miPedidoDetalle, nuevoItemDetalle]
        this.setState({
            miPedidoDetalle: nuevoPedidoDetalle
            
        })
        this.recalcularTotal(nuevoPedidoDetalle);
    }

    recalcularTotal = (pDetalle) =>{
        let total = 0;
        let pedido = this.state.miPedido;
        pDetalle.map(itemDetalle => total = total + itemDetalle.subTotal);
        pedido.total = total;
        this.setState({
            miPedido: pedido
        })
    }

    eliminarProductoDelPedido = (id) => {
        let nuevoPedidoDetalle = this.state.miPedidoDetalle.filter(itemDetalle => itemDetalle.id !== id);
        this.setState({
            miPedidoDetalle: nuevoPedidoDetalle
        });
        //Recalcular el Monto Total
        let total = 0;
        let num = 0; //Contador de total de productos
        let pedido = this.state.miPedido;
        nuevoPedidoDetalle.map(itemDetalle => total = total + itemDetalle.subTotal);
        nuevoPedidoDetalle.map(itemDetalle => num = num + 1); //Contabiliza los productos
        pedido.total = total;
        this.setState({
            miPedido: pedido,
            contador: num
        });
    }
    finalizarCompra = async () => {
        const { miPedidoDetalle } = this.state;        
        if (miPedidoDetalle.length === 0) {
            alert("No hay productos en el pedido.");
            return;
        }                
        const detallesParaAPI = miPedidoDetalle.map(item => ({           
            idProducto: item.producto.id, 
            cantidad: item.cantidad,
            precioUnitario: item.precioUnitario,
            subTotal: item.subTotal,            
        }));        
        const pedidoCompleto = {           
             total: this.state.miPedido.total,                
            pedidoDetalles: detallesParaAPI 
        };

        try {
            const response = await fetch(url1, { // url1 es "http:.../api/pedidos/"
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(pedidoCompleto)
            });
            if (response.ok) {
                const pedidoCreado = await response.json();
                alert(`🛒 ¡Compra exitosa! Pedido ID: ${pedidoCreado.id}`);                 
                this.setState({
                    miPedido: { id: null, total: 0 },
                    miPedidoDetalle: [],
                    contador: 0
                });
            } else {
                const errorData = await response.json();
                console.error("Error al crear el pedido (API):", errorData);
                alert("❌ Hubo un error al procesar el pedido.");
            }
        } catch (error) {
            console.error("Error de red/conexión:", error);
            alert("⚠️ Error de conexión con el servidor de la API.");
        }
    }
    render() {
        
        return <div>
            <CompCabecera pCantidadProductos={this.state.miPedidoDetalle.length} 
                            pTotal={this.state.miPedido.total}/>
            <main role="main" className="container">
                <div className="row">
                    <CompProductoCategorias categorias={this.state.categorias}
                    categoriaSeleccionada={this.state.categoriaSeleccionadaId}
                    onSelectCategoria={this.manejarSeleccionCategoria}  />
                    <CompPedidoDetalle
                        pPedido={this.state.miPedido}
                        pPedidoDetalle={this.state.miPedidoDetalle}
                        pFuncionEliminarProducto={this.eliminarProductoDelPedido}
                        pFuncionAgregarProducto={this.agregarProductoAlPedido} productosFiltrados={this.obtenerProductosFiltrados()} pFuncionFinalizarCompra={this.finalizarCompra}
                    />
                </div>
            </main>
            <CompPiePagina />
        </div>
    }
}
export default PagePedidoDetalle;