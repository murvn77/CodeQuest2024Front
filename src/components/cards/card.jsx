import React, { useContext, useEffect, useState } from 'react';
import CustomModal from '../modal/modal';
import GlobalContext from '../../store/Context';
import './card.css';
import Swal from 'sweetalert2';

const Card = ({ card, refetch }) => {
  const [modalShow, setModalShow] = useState(false);
  const [isAgregarCard, setIsAgregarCard] = useState(card.name === 'Agregar');
  const { globalState } = useContext(GlobalContext);
  const [giveaways, setGiveaways] = useState([]);
  const [countRegisters, setCountRegisters] = useState(0);

  const handleCardClick = () => {
    if (globalState.userData && Object.keys(globalState.userData).length == 4) {
      setModalShow(true);
    }
  };

  const handleCloseModal = () => {
    setModalShow(false);
    refetch();
  };

  const eliminarConcurso = () => {
    console.log('Eliminar concurso');
  };

  const jugarSorteo = async (id_giveaway) => {
    const sweeper = await fetch('https://codequest2024back.onrender.com/api/giveaway-sweeper/generateWinners/giveaway/' + id_giveaway, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const response = await sweeper.json();
    var ganadores = response.map((winner) => winner.username);
    var res = "";
    if(ganadores.length > 1){
      res = "Los usuarios " + ganadores.join() + " han sido los ganadores del sorteo";
    }else{
      res = "El usuario " + ganadores[0] + " ha sido el ganador del sorteo";
    }
     
    Swal.fire('¡Éxito!', res, 'success');
    setCountRegisters(countRegisters + 1);
    console.log(response.map((winner) => winner.username))
    console.log('Jugar sorteo');
  };

  useEffect(() => {
    async function fetchData() {
      if (globalState.isLoggedIn) {
        const sweeper = await fetch('https://codequest2024back.onrender.com/api/sweeper/idDiscord/' + globalState.userData.id, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const response = await sweeper.json();
        setGiveaways(response.giveawaySweeper.map((giveaway) => giveaway.giveaway));
      }
    }
    fetchData();
  }, [countRegisters])

  const register = async (id_giveaway) => {
    const giveaway = await fetch('https://codequest2024back.onrender.com/api/giveaway/' + id_giveaway, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(await giveaway.json())
    const response = await fetch('https://codequest2024back.onrender.com/api/sweeper', {
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
          fk_id_sweeper: responseData.id_sweeper,
          winner: false
        })
      });
      console.log(swepper_response)
      if (swepper_response.ok) {
        Swal.fire('¡Éxito!', 'Se registró al sorteo correctamente', 'success');
        setCountRegisters(countRegisters + 1)
      } else {
        Swal.fire('Error', 'Hubo un problema al crear el sweeper', 'error');
      }
    } else {
      Swal.fire('Error', 'Hubo un problema al crear el sweeper', 'error');
    }
  }

  return (
    <>
      {console.log(giveaways)}

      <div className="col-md-4 mb-3" onClick={handleCardClick}>
        <div className="tarjeta card h-100 rounded-1" style={{ background: '#0f0a1e', minWidth: '200px', minHeight: '250px', maxHeight: '400px' }} >
          <img src={card.image} className="card-img-top" alt={card.name} style={{ objectFit: 'fill', height: '60%' }} />
          <div className="card-body text-white " style={{ overflowY: 'auto' }}>
            <h5 className="card-title" style={{ fontWeight: '600' }}>{card.name}</h5>
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              <p className="card-text">{card.description}</p>
            </div>
            <p className="card-text">{card.initial_date}</p>
            <p className="card-text">{card.finish_date}</p>
          </div>
          {/* {(globalState.userData && Object.keys(globalState.userData).length > 4) && <button onClick={() => {register(card.id_giveaway)}}>Register</button>} */}
          {(globalState.userData && Object.keys(globalState.userData).length > 0 && !giveaways.find((element) => element.id_giveaway == card.id_giveaway)) && <button onClick={() => { register(card.id_giveaway) }} className="btn btn-success">Register</button>}
        </div>
      </div>
      {modalShow && (
        <CustomModal
          onHide={handleCloseModal}
          nombreSorteo={card.name}
          estado={card.state}
          ganadores={card.number_winners}
          id={card.id_giveaway}
          jugarSorteo={() => { jugarSorteo(card.id_giveaway) }}
          isAgregarCard={isAgregarCard}
        />
      )}
    </>
  );
};

const CardGrid = ({ cards, refetch }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-3">
      {cards.map((card, index) => (
        <Card key={index} card={card} refetch={refetch}/>
      ))}
    </div>
  );
};

export default CardGrid;
