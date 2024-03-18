import React, { useContext, useState } from 'react';
import CustomModal from '../modal/modal';
import GlobalContext from '../../store/Context';
import './card.css';
// import FormularioAgregar from '../formularioAgregar/formularioAgregar'; // Importa el componente de formulario agregar

const Card = ({ card }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isAgregarCard, setIsAgregarCard] = useState(card.name === 'Agregar');
  const { globalState } = useContext(GlobalContext);

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

  const register = async (id_giveaway) => {
    console.log('Registrandome')
    response = await fetch('https://codequest2024back.onrender.com/api/sweeper', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_discord: globalState.userData.id,
        username: globalState.userData.username,
        avatar: globalState.userData.avatar
      })
    });
    if (response.ok) {
      const responseData = await response.json();
      const swepper_response = await fetch('https://codequest2024back.onrender.com/api/giveaway-sweeper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fk_id_giveaway: id_giveaway,
          fk_id_sweeper: responseData.id_sweeper
        })
      });
      if (swepper_response.ok) {
        const responseData = await response.json();
        Swal.fire('¡Éxito!', 'El giveaway se creó correctamente', 'success');
      } else {
        // Mostrar mensaje de error si la respuesta no es exitosa
        Swal.fire('Error', 'Hubo un problema al crear el sweeper', 'error');
      }
    } else {
      // Mostrar mensaje de error si la respuesta no es exitosa
      Swal.fire('Error', 'Hubo un problema al crear el sweeper', 'error');
    }

    // Imprimir el contenido del objeto JSON devuelto por response.json()
    const responseData = await response.json();
    console.log(responseData);
  }

  return (
    <>
      <div className="col-md-4 mb-3" onClick={handleCardClick}>
        <div className="tarjeta card h-100 rounded-1" style={{ background: '#0f0a1e', minWidth: '200px', minHeight: '250px', maxHeight: '400px'}} >
          <img src={card.image} className="card-img-top" alt={card.name} style={{ objectFit: 'fill', height: '60%'}} />
          <div className="card-body text-white " style={{ overflowY: 'auto' }}>
            <h5 className="card-title" style={{ fontWeight: '600' }}>{card.name}</h5>
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              <p className="card-text">{card.description}</p>
            </div>
            <p className="card-text">{card.initial_date}</p>
            <p className="card-text">{card.finish_date}</p>
          </div>
          {(globalState.userData && Object.keys(globalState.userData).length > 4) && <button onClick={() => {register(card.id_giveaway)}}>Register</button>}
        </div>
      </div>
      {modalShow && (
        <CustomModal
          onHide={handleCloseModal}
          nombreSorteo={card.name}
          estado={card.state}
          participantes={card.giveawaySweeper}
          ganadores={card.number_winners}
          id={card.id_giveaway}
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
