import React, { useEffect, useState, useContext } from "react";
import { FaPlus } from "react-icons/fa";
import CardGrid from "../../components/cards/card";
import GlobalContext from "../../store/Context";

const Principal = () => {
    const [modalShow, setModalShow] = useState(false);
    const { globalState } = useContext(GlobalContext);
    const handleOpenAddModal = () => {
        setModalShow(true);
    };

    const handleCloseAddModal = () => {
        setModalShow(false);
    };

    const cards = [
        { id: '1', estado: 'Abierto', name: 'Card 1', description: 'Description for Card 1Description for Card 1Description for Card 1Description for Card 1Description for Card 1Description for Card 1Description for Card 1Description for Card 1', image: 'https://cdn-icons-png.flaticon.com/512/1078/1078454.png', FechaInicio: '20-02-2024', FechaFin: '21-02-2024' },
        { id: '2', estado: 'activo', name: 'Card 2', description: 'Description for Card 2', image: 'https://cdn-icons-png.flaticon.com/512/1078/1078454.png', FechaInicio: '20-02-2024', FechaFin: '21-02-2024' },
        { id: '3', estado: 'activo', name: 'Card 3', description: 'Description for Card 3', image: 'https://cdn-icons-png.flaticon.com/512/1078/1078454.png', FechaInicio: '20-02-2024', FechaFin: '21-02-2024' },
        { id: '4', estado: 'activo', name: 'Card 1', description: 'Description for Card 1', image: 'https://cdn-icons-png.flaticon.com/512/1078/1078454.png', FechaInicio: '20-02-2024', FechaFin: '21-02-2024' },
        { id: '5', estado: 'activo', name: 'Card 2', description: 'Description for Card 2', image: 'https://cdn-icons-png.flaticon.com/512/1078/1078454.png', FechaInicio: '20-02-2024', FechaFin: '21-02-2024' },
        { id: '6', estado: 'activo', name: 'Card 3', description: 'Description for Card 3', image: 'https://cdn-icons-png.flaticon.com/512/1078/1078454.png', FechaInicio: '20-02-2024', FechaFin: '21-02-2024' },
        // Agrega más tarjetas si es necesario
    ];
    var userData = null;
    return (
        <>
            <div className="container">
                <h1 className="text-center my-5 text-white" style={{ fontWeight: '600' }}>Sorteos</h1>
                <div className="d-flex justify-content-end mb-3">
                    {(globalState.userData && Object.keys(globalState.userData).length == 4) && <button className="btn btn-primary" onClick={handleOpenAddModal}>
                        <FaPlus /> Agregar Sorteo
                    </button>}

                </div>
                <CardGrid cards={cards} />
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
                                {/* Aquí colocarías el formulario para agregar sorteo */}
                                <p>Formulario de agregar sorteo aquí...</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Principal;
