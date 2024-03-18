import React, { useState } from 'react';
import CustomModal from '../modal/modal';
// import FormularioAgregar from '../formularioAgregar/formularioAgregar'; // Importa el componente de formulario agregar

const Card = ({ card }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isAgregarCard, setIsAgregarCard] = useState(card.name === 'Agregar');

  const handleCardClick = () => {
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
  };

  const eliminarConcurso = () => {
    console.log('Eliminar concurso');
  };

  const jugarSorteo = () => {
    console.log('Jugar sorteo');
  };

  return (
    <>
      <div className="col-md-4 mb-3" onClick={handleCardClick}>
        <div className="card h-100 rounded-1" style={{ background: '#0f0a1e', minWidth: '200px', minHeight: '250px', maxHeight: '400px' }}>
          <img src={card.image} className="card-img-top" alt={card.name} style={{ objectFit: 'fill', height: '60%' }} />
          <div className="card-body text-white" style={{ overflowY: 'auto' }}>
            <h5 className="card-title" style={{ fontWeight: '600' }}>{card.name}</h5>
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              <p className="card-text">{card.description}</p>
            </div>
            <p className="card-text">{card.FechaInicio}</p>
            <p className="card-text">{card.FechaFin}</p>
          </div>
        </div>
      </div>
      {modalShow && (
        <CustomModal
          onHide={handleCloseModal}
          nombreSorteo={card.name}
          estado={card.estado}
          participantes={card.participantes}
          ganadores={card.ganadores}
          eliminarConcurso={eliminarConcurso}
          jugarSorteo={jugarSorteo}
          isAgregarCard={isAgregarCard} // pasa el estado de isAgregarCard al modal
        />
      )}
    </>
  );
};

const CardGrid = ({ cards }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;
