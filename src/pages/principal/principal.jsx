import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import CardGrid from "../../components/cards/card";
import CustomForm from "../../components/form/form";
import Swal from 'sweetalert2';

const Principal = () => {
    const [modalShow, setModalShow] = useState(false);
    const [concursos, setConcursos] = useState([]);

    // Función para obtener los datos de los concursos
    const fetchConcursos = async () => {
        try {
            const response = await fetch('https://codequest2024back.onrender.com/api/giveaway');
            if (response.ok) {
                const data = await response.json();
                // Para cada concurso, obtener los nombres de los participantes
                for (const concurso of data) {
                    await fetchParticipantes(concurso);
                }
                setConcursos(data);
            } else {
                // Mostrar mensaje de error si la respuesta no es exitosa
                showErrorAlert('Hubo un problema al obtener los concursos');
            }
        } catch (error) {
            // Mostrar mensaje de error si ocurre algún error durante la solicitud
            console.error('Error:', error);
            showErrorAlert('Hubo un problema al realizar la solicitud');
        }
    };

    // Función para obtener los nombres de los participantes de un concurso
    const fetchParticipantes = async (concurso) => {
        try {
            const response = await fetch('https://codequest2024back.onrender.com/api/sweeper');
            if (response.ok) {
                const data = await response.json();
                // Filtrar los nombres de los participantes por los IDs de giveawaySweeper
                const participantes = data.filter(participante => concurso.giveawaySweeper.some(sweeper => sweeper.id_giveawaySweeper === participante.id_giveawaySweeper));
                // Asignar los nombres de los participantes al concurso
                concurso.participantes = participantes.map(participante => participante.name);
            } else {
                // Mostrar mensaje de error si la respuesta no es exitosa
                showErrorAlert('Hubo un problema al obtener los nombres de los participantes');
            }
        } catch (error) {
            // Mostrar mensaje de error si ocurre algún error durante la solicitud
            console.error('Error:', error);
            showErrorAlert('Hubo un problema al realizar la solicitud');
        }
    };

    useEffect(() => {
        // Llama a la función para obtener los datos de los concursos cuando se monta el componente
        fetchConcursos();
    }, []);

    const handleOpenAddModal = () => {
        setModalShow(true);
    };

    const handleCloseAddModal = () => {
        setModalShow(false);
        // Vuelve a cargar los concursos después de cerrar el modal
        fetchConcursos();
    };

    const showErrorAlert = (message) => {
        Swal.fire('Error', message, 'error');
    };

    return (
        <>
            <div className="container">
                <h1 className="text-center my-5 text-white" style={{fontWeight:'600'}}>Sorteos</h1>
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary" onClick={handleOpenAddModal}>
                        <FaPlus /> Agregar Sorteo
                    </button>
                </div>
                <CardGrid cards={concursos} />
            </div>
            {modalShow && (
                <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-xl custom-modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Sorteo</h5>
                                <button type="button" className="btn-close" onClick={handleCloseAddModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <CustomForm readOnlyProp={false} concursos={concursos} mode="Create" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Principal;
