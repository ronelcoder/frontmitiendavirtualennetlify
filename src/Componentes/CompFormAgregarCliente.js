import React, {Component} from 'react';

class CompFormAgregarCliente extends Component{
    state = {
        id: 0,
        nombres: "",
        apellidos: "",
        dni: "",
        telefono: "",
        correo: "",
        direccion: "",
        mensajeErrorNombres: "",
        mensajeErrorApellidos: "",
        mensajeErrorDni: "",
        mensajeErrorCorreo: ""
    }

    validarDatosCliente = e =>{        
        e.preventDefault();
        this.setState({
            mensajeErrorNombres: "",
            mensajeErrorApellidos: "",
            mensajeErrorDni: "",
            mensajeErrorCorreo: ""
        })

        if(this.state.nombres == null || this.state.nombres.length === 0 || /^\s+$/.test(this.state.nombres)){
            this.setState({ mensajeErrorNombres: "Campo Obligatorio" });
            return;
        }
        if(!(/[a-zA-Z]+$/.test(this.state.nombres))){
            this.setState({ mensajeErrorNombres: "Valor Incorrecto" });
            return;
        }
        if(this.state.apellidos == null || this.state.apellidos.length === 0 || /^\s+$/.test(this.state.apellidos)){
            this.setState({ mensajeErrorApellidos: "Campo Obligatorio" });
            return;
        }
        if(this.state.dni == null || this.state.dni.length === 0 || /^\s+$/.test(this.state.dni)){
            this.setState({ mensajeErrorDni: "Campo Obligatorio" });
            return;
        }
        if(!(/^\d{8}$/.test(this.state.dni))){
            this.setState({ mensajeErrorDni: "Ingresar 8 números" });
            return;
        }
        if(this.state.correo == null || this.state.correo.length === 0 || /^\s+$/.test(this.state.correo)){
            this.setState({ mensajeErrorCorreo: "Campo Obligatorio" });
            return;
        }
        if(this.state.correo.length > 0 && !(/\S+@\S+\.\S+/.test(this.state.correo))){
            this.setState({ mensajeErrorCorreo: "Ingresar un correo válido" });
            return;
        }
        // Si llegamos aquí, los datos son válidos -> enviar al API
        this.enviarCliente();
    }

    enviarCliente = async () => {
        const cliente = {
            nombres: this.state.nombres,
            apellidos: this.state.apellidos,
            dni: this.state.dni,
            telefono: this.state.telefono,
            correo: this.state.correo,
            direccion: this.state.direccion
        };

        try{
            const resp = await fetch('https://backmitiendavirtual-production.up.railway.app/api/cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });

            if(resp.ok){
                // Si el API devuelve el objeto creado, lo podemos leer si es necesario
                // const data = await resp.json();
                alert('Cliente creado correctamente.');
                this.setState({
                    id: 0,
                    nombres: "",
                    apellidos: "",
                    dni: "",
                    telefono: "",
                    correo: "",
                    direccion: "",
                    mensajeErrorNombres: "",
                    mensajeErrorApellidos: "",
                    mensajeErrorDni: "",
                    mensajeErrorCorreo: ""
                });
                // Si el padre necesita refrescar la lista, puede pasar una prop como onClienteCreado
                if(this.props.onClienteCreado){
                    this.props.onClienteCreado();
                }
            }else{
                let text;
                try{ text = await resp.text(); }catch{ text = 'Respuesta inesperada del servidor.' }
                alert('Error al crear cliente: ' + text);
            }
        }catch(err){
            console.error(err);
            alert('No se pudo conectar con el servidor. Ver consola para más detalles.');
        }
    }

    actualizarEstado = e =>{
        if(e.target.name === "txtNombres"){
            this.setState({
                nombres: e.target.value
            })
        }else if(e.target.name === "txtApellidos"){
            this.setState({
                apellidos: e.target.value
            })
        }else if(e.target.name === "txtDni"){
            this.setState({
                dni: e.target.value
            })
        }else if(e.target.name === "txtTelefono"){
            this.setState({
                telefono: e.target.value
            })
        }else if(e.target.name === "txtCorreo"){
            this.setState({
                correo: e.target.value
            })
        }else if(e.target.name === "txtDireccion"){
            this.setState({
                direccion: e.target.value
            })
        }
    }

    render(){
        return <form onSubmit={this.validarDatosCliente}>
            <p className="h5 text-ssecondary">Datos del Cliente</p>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="txtNombres" >*Nombres:</label>
                    <input type="text" className="form-control" name="txtNombres" id="txtNombres" value={this.state.nombres} 
                        onChange={this.actualizarEstado}
                    />
                    <div className="badge badge-danger">{this.state.mensajeErrorNombres}</div> 
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="txtApellidos" >*Apellidos:</label>
                    <input type="text" className="form-control" name="txtApellidos" id="txtApellidos" value={this.state.apellidos} 
                        onChange={this.actualizarEstado}
                    />
                    <div className="badge badge-danger">{this.state.mensajeErrorApellidos}</div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-3">
                    <label htmlFor="txtDni" >*DNI:</label>
                    <input type="text" className="form-control" name="txtDni" id="txtDni" value={this.state.dni} 
                        onChange={this.actualizarEstado}
                    />
                    <div className="badge badge-danger">{this.state.mensajeErrorDni}</div>
                </div>
                <div className="form-group col-md-4">
                    <label htmlFor="txtTelefono" >Teléfono:</label>
                    <input type="text" className="form-control" name="txtTelefono" id="txtTelefono"
                        value={this.state.telefono} 
                        onChange={this.actualizarEstado}
                    />
                </div>
                <div className="form-group col-md-5">
                    <label htmlFor="txtCorreo" >*Correo:</label>
                    <input type="text" className="form-control" name="txtCorreo" id="txtCorreo"
                        value={this.state.correo} 
                        onChange={this.actualizarEstado}
                    />
                    <div className="badge badge-danger">{this.state.mensajeErrorCorreo}</div>
                </div>
            </div>

            <div className="form-row">
                <div className="form-group col-md-12">
                    <label htmlFor="txtDireccion" >Dirección:</label>
                    <input type="text" className="form-control" name="txtDireccion" id="txtDireccion" 
                        value={this.state.direccion} 
                        onChange={this.actualizarEstado}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12 text-right">
                    <button type="submit" className="btn btn-primary">Agregar</button>
                </div>
            </div>
        </form>
    }
}

export default CompFormAgregarCliente;