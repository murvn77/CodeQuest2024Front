import React, { useState, useEffect } from 'react';
import './modal.css';
import CustomForm from "../../components/form/form";
import Swal from 'sweetalert2';

const CustomModal = ({ show, onHide, nombreSorteo, estado, ganadores, id, jugarSorteo }) => {
  const [activeTab, setActiveTab] = useState('modificar');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchConcursoData = async () => {
      try {
        const response = await fetch(`https://codequest2024back.onrender.com/api/giveaway/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          Swal.fire('Error', 'Hubo un problema al obtener los datos del concurso', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire('Error', 'Hubo un problema al realizar la solicitud', 'error');
      }
    };

    if (activeTab === 'modificar') {
      fetchConcursoData();
    }
  }, [activeTab, id]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const eliminarConcurso = async () => {
    try {
      const response = await fetch(`https://codequest2024back.onrender.com/api/giveaway/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        Swal.fire('¡Éxito!', 'El concurso se eliminó correctamente', 'success');
        onHide();
      } else {
        Swal.fire('Error', 'Hubo un problema al eliminar el concurso', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Hubo un problema al realizar la solicitud', 'error');
    }
  };

  const actualizarConcurso = async (formData) => {
    try {
      const response = await fetch(`https://codequest2024back.onrender.com/api/giveaway/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        Swal.fire('¡Éxito!', 'El concurso se actualizó correctamente', 'success');
      } else {
        Swal.fire('Error', 'Hubo un problema al actualizar el concurso', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Hubo un problema al realizar la solicitud', 'error');
    }
  };

  const renderTabs = () => {
    return (
      <>
        <li className="nav-item" role="presentation">
          <button className={`nav-link ${activeTab === 'participantes' ? 'active' : ''}`} onClick={() => handleTabClick('participantes')}>Participantes</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link ${activeTab === 'modificar' ? 'active' : ''}`} onClick={() => handleTabClick('modificar')}>Modificar</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className={`nav-link ${activeTab === 'eliminar' ? 'active' : ''}`} onClick={() => handleTabClick('eliminar')}>Eliminar Concurso</button>
        </li>
        {estado === true && <li className="nav-item" role="presentation">
          <button className={`nav-link ${activeTab === 'sorteo' ? 'active' : ''}`} onClick={() => handleTabClick('sorteo')}>Jugar Sorteo</button>
        </li>}

      </>
    );
  };

  const renderTabContent = () => {
    return (
      <div className="tab-content" id="myTabContent">

        <div className={`tab-pane fade ${activeTab === 'participantes' ? 'show active' : ''}`} id="participantes" role="tabpanel">
          <ul>
            <table class="table">
              <thead class="table-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Id</th>
                  <th scope="col">Username</th>
                </tr>
              </thead>
              <tbody>
                {formData.giveawaySweeper && formData.giveawaySweeper.length > 0 ? (

                  formData.giveawaySweeper.map((participante, index) => (
                    <tr id={index}>
                      <th scope='row'><img src={`https://cdn.discordapp.com/avatars/${participante.sweeper.id_discord}/${participante.sweeper.avatar}.jpg`} alt="Person Logo" id="person-logo-in" /></th>
                      <td>{participante.sweeper.id_discord}</td>
                      <td>{participante.sweeper.username}</td>
                    </tr>
                  ))
                ) : (
                  <p>Sin participantes aún</p>
                )}
              </tbody>
            </table>
          </ul>
        </div>

        <div className={`tab-pane fade ${activeTab === 'modificar' ? 'show active' : ''}`} id="modificar" role="tabpanel">
          {formData && <CustomForm readOnlyProp={false} concursos={formData} mode="Modify" onSubmit={actualizarConcurso} />}
        </div>
        <div className={`tab-pane fade ${activeTab === 'eliminar' ? 'show active' : ''}`} id="eliminar" role="tabpanel">
          <button className="btn btn-danger" onClick={eliminarConcurso}>Eliminar</button>
        </div>
        {estado === true && (
          <div className={`tab-pane fade ${activeTab === 'sorteo' ? 'show active' : ''}`} id="sorteo" role="tabpanel">
            <button className="btn btn-primary" onClick={jugarSorteo}>Jugar</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog modal-xl custom-modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{nombreSorteo}</h5>
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close" style={{ color: 'white' }}></button>
          </div>
          <div className="modal-body">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {renderTabs()}
            </ul>
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
