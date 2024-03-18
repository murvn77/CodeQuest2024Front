import React, { useState } from 'react';
import './modal.css';

const CustomModal = ({ show, onHide, nombreSorteo, estado, participantes, ganadores, eliminarConcurso, jugarSorteo }) => {
  const [activeTab, setActiveTab] = useState(estado === 'Abierto' ? 'participantes' : 'modificar');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderTabs = () => {
    if (estado === 'Abierto') {
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
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'sorteo' ? 'active' : ''}`} onClick={() => handleTabClick('sorteo')}>Jugar Sorteo</button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'modificar' ? 'active' : ''}`} onClick={() => handleTabClick('modificar')}>Modificar</button>
          </li>
          <li className="nav-item" role="presentation">
            <button className={`nav-link ${activeTab === 'eliminar' ? 'active' : ''}`} onClick={() => handleTabClick('eliminar')}>Eliminar Concurso</button>
          </li>
        </>
      );
    }
  };

  const renderTabContent = () => {
    return (
      <div className="tab-content" id="myTabContent">
        {estado === 'Abierto' && (
          <div className={`tab-pane fade ${activeTab === 'participantes' ? 'show active' : ''}`} id="participantes" role="tabpanel">
            <ul>
              {participantes && participantes.length > 0 ? (
                participantes.map((participante, index) => (
                  <li key={index}>{participante}</li>
                ))
              ) : (
                <p>Sin participantes aún</p>
              )}
            </ul>
          </div>
        )}
        <div className={`tab-pane fade ${activeTab === 'modificar' ? 'show active' : ''}`} id="modificar" role="tabpanel">
          {/* Aquí puedes colocar el formulario de modificación */}
        </div>
        <div className={`tab-pane fade ${activeTab === 'eliminar' ? 'show active' : ''}`} id="eliminar" role="tabpanel">
          <button className="btn btn-danger" onClick={eliminarConcurso}>Eliminar</button>
        </div>
        {estado === 'Abierto' && (
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
            <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
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
