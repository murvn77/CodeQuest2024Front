// src/components/Header.jsx
import React, { useState } from 'react';
import CompanyIcon from '../../assets/icons/LOGOBLANCO.png';
import PersonLogo from '../../assets/icons/perfil.png';
import './Navbar.css'; // Asegúrate de tener este archivo CSS

const NvRes = ({ isLoggedIn, userName }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    // Implementación temporal de inicio de sesión
    alert('Iniciar sesión');
  };

  const handleLogout = () => {
    // Implementación temporal de cierre de sesión
    alert('Cerrar sesión');
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <header>
      <div className="left">
        <img src={CompanyIcon} alt="Company Icon" className="company-icon" />
      </div>
      <div className="right">
        {!isLoggedIn ? (
          <button onClick={handleLogin}>
            <img src={PersonLogo} alt="Person Logo" className="person-logo" />
            Iniciar sesión
          </button>
        ) : (
          <>
            <div className="user-info">
              <span>{userName}</span>
              <button onClick={toggleModal}>☰</button>
            </div>
            {showModal && (
              <div className="modal">
                <ul>
                  <li>Dashboard</li>
                  <li>Mi perfil</li>
                </ul>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default NvRes;
