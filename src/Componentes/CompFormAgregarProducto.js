import React, {Component} from 'react';


class CompFormAgregarProducto extends Component{    
    state={
        categoriaSeleccionada: "",
        id:0,
        productoSeleccionadoId: "",
        nombre:"",
        marca:"",
        precio:"",
        cantidad:"",
        msjErrorNombre: "",
        msjErrorMarca: "",
        msjErrorPrecio: "",
        msjErrorCantidad: ""
    }
    componentDidUpdate(prevProps) {
        const productosChanged = this.props.productos.length !== prevProps.productos.length;    
    // También verifica si antes no había productos y ahora sí, o viceversa:
    const fromEmptyToNonEmpty = !prevProps.productos && this.props.productos;
    const fromNonEmptyToEmpty = prevProps.productos && !this.props.productos;
        if (productosChanged || fromEmptyToNonEmpty || fromNonEmptyToEmpty) {            
            // 2. Si la lista de productos cambió (nueva categoría seleccionada), REINICIA el estado de la selección de producto en este componente.
            this.setState({
                productoSeleccionadoId: "",
                nombre: "",
                marca: "",
                precio: "",
                cantidad: ""
            }); 
            console.log("Productos actualizados, formulario reseteado.");                
        }
    }
    manejarCambioProducto = e => {
        const productoId = e.target.value;
        const productos = this.props.productos; // Lista filtrada x categoría        
        // Encontrar el objeto producto completo
        const productoSeleccionado = productos.find(p => p.id.toString() === productoId);

        if (productoSeleccionado) {
            this.setState({
                productoSeleccionadoId: productoId,
                nombre: productoSeleccionado.nombre,
                marca: productoSeleccionado.idMarcaNavigation ? productoSeleccionado.idMarcaNavigation.nombre : "", 
                precio: productoSeleccionado.precio.toString(),                
                cantidad: ""
            });
        } else {
            // Si selecciona el placeholder ("Seleccione un Producto")
            this.setState({
                productoSeleccionadoId: "",
                nombre: "", marca: "", precio: "", cantidad: ""
            });
        }
    }
    
    validarDatosProducto = e =>{
        this.setState({
            msjErrorNombre: "",
            msjErrorMarca: "",
            msjErrorPrecio: "",
            msjErrorCantidad: ""
        })

        if(this.state.nombre == null || this.state.nombre.length === 0 || /^\s+$/.test(this.state.nombre)){
            this.setState({
                msjErrorNombre: "Campo Obligatorio"
            })
        }else if(this.state.marca == null || this.state.marca.length === 0 || /^\s+$/.test(this.state.marca)){
            this.setState({
                msjErrorMarca: "Campo Obligatorio"
            })
        }else if(this.state.precio == null || this.state.precio.length === 0 || /^\s+$/.test(this.state.precio)){
            this.setState({
                msjErrorPrecio: "Campo Obligatorio"
            })
        }else if(this.state.cantidad == null || this.state.cantidad.length === 0 || /^\s+$/.test(this.state.cantidad)){
            this.setState({
                msjErrorCantidad: "Campo Obligatorio"
            })
        }else{
            alert("Registro Completo");
            //Agregar Producto si todo esta ok
           this.props.pFuncionAgregarProducto(
                parseInt(this.state.productoSeleccionadoId),
                this.state.nombre,
                this.state.marca,
                parseFloat(this.state.precio),
                parseInt(this.state.cantidad)
            );
        }
        e.preventDefault();
    }

    actualizarEstado = e =>{
        if(e.target.name === "txtNombre"){
            this.setState({
                nombre: e.target.value
            })
        }else if(e.target.name === "txtMarca"){
            this.setState({
                marca: e.target.value
            })
        }else if(e.target.name === "txtPrecio"){
            this.setState({
                precio: e.target.value
            })
        }else if(e.target.name === "txtCantidad"){
            this.setState({
                cantidad: e.target.value
            })
        }
    }

    render(){
        const { productos } = this.props; // Los productos vienen filtrados por categoría desde el padre
        return <form onSubmit={this.validarDatosProducto}>
            <p className="h5 text-secondary">Producto</p>

            <div className="form-row">
                <div className="form-group col-md-6">
                    <select
    className="form-control"  name="txtNombre" 
    value={this.state.productoSeleccionadoId} 
    onChange={this.manejarCambioProducto} disabled={!productos || productos.length === 0} >    
          <option value=""> {(!productos || productos.length === 0) 
                                ? "Seleccione primero Categoría" 
                                : "Seleccione un Producto"
                            }
            </option>    
                         {
                            // Mapeamos los productos filtrados para crear las opciones
                            productos && productos.map(producto => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre}
                                </option>
                            ))
                        }           
   </select>
                    <div className="badge badge-danger">{this.state.msjErrorNombre}</div>
                </div>
                <div className="form-group col-md-6">
                    <input type="number" className="form-control" name="txtPrecio" 
                        placeholder="Precio Unitario" 
                        value={this.state.precio} readOnly                        
                    />
                    <div className="badge badge-danger">{this.state.msjErrorPrecio}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <input type="text" className="form-control" name="txtMarca" 
                        placeholder="Marca" 
                        value={this.state.marca} 
                        readOnly
                    />
                    <div className="badge badge-danger">{this.state.msjErrorMarca}</div>
                </div>
                <div className="form-group col-md-6">
                    <input type="number" className="form-control" name="txtCantidad" 
                        placeholder="Cantidad" 
                        value={this.state.cantidad} 
                        onChange={this.actualizarEstado} 
                    />
                    <div className="badge badge-danger">{this.state.msjErrorCantidad}</div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-12 text-right"> 
                    <button type="submit" className="btn btn-secondary">Agregar Producto</button>
                </div>
            </div>

        </form>
    }
}

export default CompFormAgregarProducto;