import React, { useState, useEffect } from 'react';
import './form.css'
// import { useNavigate } from 'react-router-dom';
// import './Navbar.css'; // Asegúrate de tener este archivo CSS
// import Swal from 'sweetalert2';

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

    const sendData = (e) => {
        e.preventDefault();
        var form = document.querySelectorAll('.needs-validation')[0];
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            alert(JSON.stringify(data))
        }
    }

    return (
        <>
            <div className="col-12 col-sm-9 col-md-5 mt-3 mb-5 mx-auto">
                <fieldset className="border border-light rounded p-3">
                   <legend>{props.mode} giveaway</legend>
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
                                <label htmlFor="description" className="form-label">Number of winners</label>
                                <input className="form-control" type="number" min={1} id='winners' onChange={handleInput} readOnly={readOnlyProp} value={data.winners} required />
                                <div className="invalid-feedback">
                                    Completa este campo
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="start_date" className="form-label">Giveaway state</label>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="state" disabled={readOnlyProp} onChange={handleCheckBoxInput} />
                                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Open</label>
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
