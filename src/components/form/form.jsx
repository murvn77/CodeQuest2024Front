import React, { useState, useEffect } from 'react';
import './form.css';
import Swal from 'sweetalert2';

const CustomForm = (props) => {
    const readOnlyProp = props.readOnlyProp;
    var initial_data = {
        start_date: '',
        finish_date: '',
        title: '',
        description: '',
        image: '',
        state: false,
        winners: 1
    }
    if (readOnlyProp && props.data) {
        initial_data = props.data;
    }
    const [data, setData] = useState(initial_data);

    const handleInput = (e) => {
        let input = e.target.id;
        setData({
            ...data,
            [input]: e.target.value
        })
    }

    const handleCheckBoxInput = (e) => {
        let input = e.target.id;
        setData({
            ...data,
            [input]: e.target.checked
        })
    }

    const handleImageInput = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.nativeEvent.srcElement.files[0]);
        reader.onloadend = function () {
            let input = e.target.id;
            setData({
                ...data,
                [input]: reader.result
            })
        }
    }

    
    const sendData = async (e) => {
        e.preventDefault();
        var form = document.querySelectorAll('.needs-validation')[0];
        form.classList.add('was-validated')
        console.log(data.image);
        if (form.checkValidity()) {
            try {
                let admin = 'f0ade084-c287-477f-8b2c-6a68bc5d05b0';
                if (props.mode === "Create") {
                    // Realizar la petición POST para crear un nuevo giveaway
                    const response = await fetch('https://codequest2024back.onrender.com/api/giveaway', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: data.title, // Cambiado de 'title' a 'name'
                            description: data.description,
                            initial_date: data.start_date,
                            finish_date: data.finish_date,
                            imagen: data.image, // Cambiado de 'image' a 'imagen'
                            state: data.state,
                            number_winners: data.winners, // Cambiado de 'winners' a 'number_winners'
                            fk_id_administrator: admin
                        })
                    });
                    if (response.ok) {
                        // Mostrar mensaje de éxito
                        Swal.fire('¡Éxito!', 'El giveaway se creó correctamente', 'success');
                    } else {
                        // Mostrar mensaje de error si la respuesta no es exitosa
                        Swal.fire('Error', 'Hubo un problema al crear el giveaway', 'error');
                    }
    
                    // Imprimir el contenido del objeto JSON devuelto por response.json()
                    const responseData = await response.json();
                    console.log(responseData);
                } else {
                    // Realizar la petición PUT para actualizar el giveaway
                    const response = await fetch(`https://codequest2024back.onrender.com/api/giveaway/${props.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: data.title, // Cambiado de 'title' a 'name'
                            description: data.description,
                            initial_date: data.start_date,
                            finish_date: data.finish_date,
                            imagen: data.image, // Cambiado de 'image' a 'imagen'
                            state: data.state,
                            number_winners: data.winners, // Cambiado de 'winners' a 'number_winners'
                            fk_id_administrator: admin
                        })
                    });
                    if (response.ok) {
                        // Mostrar mensaje de éxito
                        Swal.fire('¡Éxito!', 'El giveaway se actualizó correctamente', 'success');
                    } else {
                        // Mostrar mensaje de error si la respuesta no es exitosa
                        Swal.fire('Error', 'Hubo un problema al actualizar el giveaway', 'error');
                    }
                }
            } catch (error) {
                // Capturar y mostrar cualquier error que ocurra durante la solicitud
                console.error('Error:', error);
                Swal.fire('Error', 'Hubo un problema al realizar la solicitud', 'error');
            }
        }
    };
    
    
    return (
        <>
            <div className="col-12 col-sm-9 col-md-5 mt-3 mb-5 mx-auto">
                <fieldset className="border border-light rounded p-3">
                   <legend>{props.mode} sorteo</legend>
                    <form className="needs-validation" noValidate>
                        <div id="reactSignUpForm" className="px-2">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nombre</label>
                                <input type="text" className="form-control" id="title" onChange={handleInput} readOnly={readOnlyProp} value={data.title} required />
                                <div className="invalid-feedback">
                                    Completa este campo
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Descripción</label>
                                <textarea className="form-control" id="description" rows="3" onChange={handleInput} readOnly={readOnlyProp} value={data.description} required></textarea>
                                <div className="invalid-feedback">
                                    Completa este campo
                                </div>
                            </div>
                            {!readOnlyProp && <div className="mb-3">
                                <label htmlFor="avatar" className="form-label">Imagen</label>
                                <input className="form-control" type="file" id="image" name="avatar" accept="image/png, image/jpeg, image/gif" onChange={handleImageInput} readOnly={readOnlyProp} />
                            </div>}
                            {data.image && <div className="mb-3">
                                <img id="blah" src={data.image} alt="your image" style={{ width: '100%' }} />
                            </div>}

                            <div className="mb-3">
                                <label htmlFor="start_date" className="form-label">Fecha de inicio</label>
                                <input className="form-control" type="date" id="start_date" onChange={handleInput} readOnly={readOnlyProp} value={data.start_date} required />
                                <div className="invalid-feedback">
                                    Completa este campo
                                </div>
                                <label htmlFor="finish_date" className="form-label">Fecha de fin</label>
                                <input className="form-control" type="date" min={data.start_date} id='finish_date' onChange={handleInput} readOnly={readOnlyProp} value={data.finish_date} required />
                                <div className="invalid-feedback">
                                    Completa este campo
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Cantidad de ganadores</label>
                                <input className="form-control" type="number" min={1} id='winners' onChange={handleInput} readOnly={readOnlyProp} value={data.winners} required />
                                <div className="invalid-feedback">
                                    Completa este campo
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="form-label">Estado de sorteo</label>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="state" disabled={readOnlyProp} onChange={handleCheckBoxInput} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Abierto</label>
                                </div>
                            </div>
                        </div>

                        {!readOnlyProp && <button type="submit" className="btn btn-success" onClick={sendData}>Crear</button>}
                    </form>

                </fieldset>
            </div>

        </>
    );
};

export default CustomForm;
