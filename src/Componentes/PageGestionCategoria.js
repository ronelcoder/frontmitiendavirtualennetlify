import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//npm install --save @fortawesome/rfontawesome-svg-core
//npm install --save @fortawesome/react-fontawesome
//npm install --save @fortawesome/free-solid-svg-icons
const url = "https://backmitiendavirtual-production.up.railway.app/api/categoria/";

class PageGestionCategoria extends Component {
    state = {
        lista: [],
        modalInsertar: false,
        modalEliminar: false,
        datos: {
            id: '',
            nombre: '',
            activo: true
        },
        tipoModal: ''
    }

    metodoGet = () => {
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(lista => {
                this.setState({
                    lista
                })
            });
            
    }

    metodoPost = async () => {
        // No mutar state directamente: crear payload independiente
        const payload = { ...this.state.datos };
        if (payload.hasOwnProperty('id')) delete payload.id;

        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(payload),  //envia el objeto cargado
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Error al insertar categoría:', response.status, text);
                alert('Error al insertar categoría: ' + (text || response.statusText));
                return;
            }

            // éxito: cerrar modal y refrescar lista
            this.modalInsertar();   //cierra el modal
            this.metodoGet();     //lista categ
        } catch (error) {
            console.error('Error en metodoPost:', error);
            alert('No se pudo conectar al servidor para insertar la categoría.');
        }
    }

    metodoPut = () => {
        fetch(url + this.state.datos.id, {
            method: "PUT",
            body: JSON.stringify(this.state.datos),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => {
                this.modalInsertar(); //cierra el modal
                this.metodoGet();
            }).catch(error => {
                console.log(error.message);
            })
    }

    metodoDelete = () => {
        fetch(url + this.state.datos.id, {
            method: "DELETE"
        })
            .then(response => {
                this.setState({
                    modalEliminar: false    //cierra el modal
                });
                this.metodoGet();
            }).catch(error => {
                console.log(error.message);
            })
    }
    //modalInsertar será true o false
    modalInsertar = () => {
        this.setState({
            modalInsertar: !this.state.modalInsertar
        });
    }

    seleccionarDatos = (categoria) => {
        this.setState({
            tipoModal: 'actualizar',
            datos: {
                id: categoria.id,
                nombre: categoria.nombre,
                activo: categoria.activo
            }
        });
    }
    //actualiza valores de las variables del objeto (datos) segun el usuario vaya llenando
    //... para hacer referencia al this
    cargarDatos = async e => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === 'activo') {
            // convertir a booleano
            value = (value === 'true' || value === true);
        }

        await this.setState({
            datos: {
                ...this.state.datos, [name]: value
            }
        });
    }

    componentDidMount() {  //automatic al cargar la clase
        this.metodoGet();
    }
   //se pone constante porque nec una var pa manejar el estado de mi form
   //para insertar y editar nec tener una referencia fija q contenga todas esas var
   //<!--usa terneario ; es V(tiene datos) entonces los muestra -->
    render() {
        const { datos } = this.state;
        return (
            <main role="main" className="container">
                <div className="row">
                    <button className="btn btn-success mb-4"
                        onClick={() => {
                            this.setState({ datos: { id: '', nombre: '', activo: true }, tipoModal: 'insertar' });
                            this.modalInsertar()
                        }}
                    >Agregar Categoría</button>
                </div>
                <div className="row">
                    <div className="col-9">
                        <table className="table">
                            <thead>
                                <tr><th>ID</th><th>Nombre</th><th>Estado</th><th>Mantenimiento</th></tr>
                            </thead>
                            <tbody>
                                {this.state.lista.map(categoria => {
                                    return (
                                        <tr key={categoria.id}>
                                            <td>{categoria.id}</td>
                                            <td>{categoria.nombre}</td>
                                            <td>{categoria.activo ? 'Activo' : 'Inactivo'}</td>
                                            <td>
                                                <button className="btn btn-secondary"
                                                    onClick={() => {
                                                        this.seleccionarDatos(categoria);
                                                        this.modalInsertar()
                                                    }}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </button>
                                                {" "}
                                                <button className="btn btn-danger"
                                                    onClick={() => {
                                                        this.seleccionarDatos(categoria);
                                                        this.setState({ modalEliminar: true })
                                                    }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                        <Modal isOpen={this.state.modalInsertar}>
                            <ModalHeader style={{ display: 'block' }}>
                                <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>X</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="form-group">
   
                                    <label htmlFor="id">ID</label>
                                    <input className="form-control" type="text" name="id" id="id" readOnly
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.id : ''}></input><br />

                                    <label htmlFor="nombre">Nombre:</label>
                                    <input className="form-control" type="text" name="nombre" id="nombre"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.nombre : ''}></input><br />

                                    <label htmlFor="activo">Estado (true o false):</label>
                                    <input className="form-control" type="text" name="activo" id="activo"
                                        onChange={this.cargarDatos}
                                        value={datos ? datos.activo : ''}></input>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                {this.state.tipoModal === "insertar" ?
                                    <button className="btn btn-seccuess" onClick={() => this.metodoPost()}>
                                        Insertar
                                    </button> : <button className="btn btn-danger" onClick={() => this.metodoPut()}>
                                        Actualizar
                                    </button>
                                }
                            </ModalFooter>
                        </Modal>

                        <Modal isOpen={this.state.modalEliminar}>
                            <ModalBody>
                                Desea Eliminar la Categoría {datos && datos.nombre} ?
                            </ModalBody>
                            <ModalFooter>
                                <button className="btn btn-danger" onClick={() => this.metodoDelete()}>
                                    Aceptar
                                </button>
                                <button className="btn btn-secondary" onClick={() => this.setState({modalEliminar: false})}>
                                    Cancelar
                                </button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </main>
        );
    }
}

export default PageGestionCategoria;
