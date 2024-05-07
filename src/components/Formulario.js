import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert2';

class Formulario extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contactos: [
                { id: 1, nombre: "Juan", apellido: "Pérez", telefono: "123456789", favorito: false },
                { id: 2, nombre: "María", apellido: "González", telefono: "987654321", favorito: false }
            ]
        };
    }

    toggleFavorito = (id) => {
        this.setState(prevState => ({
            contactos: prevState.contactos.map(contacto =>
                contacto.id === id ? { ...contacto, favorito: !contacto.favorito } : contacto
            )
        }));
    };

    ordenarContactos = () => {
        this.setState(prevState => ({
            contactos: prevState.contactos.sort((a, b) => {
                // Ordenar por apellido
                if (a.apellido.toLowerCase() < b.apellido.toLowerCase()) return -1;
                if (a.apellido.toLowerCase() > b.apellido.toLowerCase()) return 1;
                // Si los apellidos son iguales, ordenar por nombre
                if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) return -1;
                if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) return 1;
                return 0;
            })
        }));
    };

    agregarContacto = () => {
        swal.fire({
            title: "Agregar nuevo contacto",
            html:
                `<input id="nombre" class="swal2-input" placeholder="Nombre">
                <input id="apellido" class="swal2-input" placeholder="Apellido">
                <input id="telefono" class="swal2-input" placeholder="Teléfono">`,
            showCancelButton: true,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const nombre = swal.getPopup().querySelector('#nombre').value;
                const apellido = swal.getPopup().querySelector('#apellido').value;
                const telefono = swal.getPopup().querySelector('#telefono').value;
                if (!nombre || !apellido || !telefono) {
                    swal.showValidationMessage('Por favor complete todos los campos');
                }
                return { nombre: nombre, apellido: apellido, telefono: telefono };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const contacto = {
                    id: Math.random(),
                    nombre: result.value.nombre,
                    apellido: result.value.apellido,
                    telefono: result.value.telefono,
                    favorito: false
                };
                this.setState(prevState => ({
                    contactos: [...prevState.contactos, contacto]
                }));
            }
        });
    };

    eliminarContacto = (id) => {
        this.setState(prevState => ({
            contactos: prevState.contactos.filter(contacto => contacto.id !== id)
        }));
    };

    editarContacto = (id, campo, valor) => {
        this.setState(prevState => ({
            contactos: prevState.contactos.map(contacto =>
                contacto.id === id ? { ...contacto, [campo]: valor } : contacto
            )
        }));
    };

    render() {
        return (
            <div className="container mt-3">
                <h2 className="mb-4">Agenda de Contactos</h2>
                <button className="btn btn-primary mb-3" onClick={this.agregarContacto}>Agregar Contacto</button>
                <button className="btn btn-secondary mb-3 ml-2" onClick={this.ordenarContactos}>Ordenar por Apellido y Nombre</button>
                <div className="row">
                    {this.state.contactos.map(contacto => (
                        <div key={contacto.id} className="col-md-4 mb-3">
                            <div className={`card ${contacto.favorito ? 'border-warning' : 'border-secondary'}`}>
                                <div className="card-body">
                                    <h5 className="card-title">{contacto.nombre} {contacto.apellido} {contacto.favorito && <span className="badge bg-warning text-dark">★</span>}</h5>
                                    <p className="card-text">Teléfono: {contacto.telefono}</p>
                                    <button className="btn btn-info btn-sm mb-1" onClick={() => this.toggleFavorito(contacto.id)}>
                                        {contacto.favorito ? 'Quitar de Favoritos' : 'Agregar a Favoritos'}
                                    </button>
                                    <button className="btn btn-danger btn-sm mb-1" onClick={() => this.eliminarContacto(contacto.id)}>Eliminar</button>
                                    <div className="form-group">
                                        <label htmlFor={`nombre_${contacto.id}`} className="form-label">Nombre:</label>
                                        <input type="text" id={`nombre_${contacto.id}`} className="form-control" value={contacto.nombre} onChange={(e) => this.editarContacto(contacto.id, 'nombre', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`apellido_${contacto.id}`} className="form-label">Apellido:</label>
                                        <input type="text" id={`apellido_${contacto.id}`} className="form-control" value={contacto.apellido} onChange={(e) => this.editarContacto(contacto.id, 'apellido', e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`telefono_${contacto.id}`} className="form-label">Teléfono:</label>
                                        <input type="text" id={`telefono_${contacto.id}`} className="form-control" value={contacto.telefono} onChange={(e) => this.editarContacto(contacto.id, 'telefono', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Formulario;
