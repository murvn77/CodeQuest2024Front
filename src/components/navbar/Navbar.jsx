import React, { useState, useEffect, useContext } from 'react';
import CompanyIcon from '../../assets/icons/LOGOBLANCO.png';
import PersonLogo from '../../assets/icons/perfil.png';
import NormalFace from '../../assets/icons/normal face.png';
import LoveFace from '../../assets/icons/love.png'
import './Navbar.css'; // Asegúrate de tener este archivo CSS
import GlobalContext from '../../store/Context';


const Navbar = (props) => {
  const {globalState} = useContext(GlobalContext);

  return (
    <header>
      <div className="left">
        <a href='/'>
          <img src={CompanyIcon} alt="Company Icon" className="company-icon" />
        </a>
      </div>
      <div className="right">
        {!globalState.isLoggedIn ? (
          <button onClick={props.handleLogin} id="logInBtn">
            <i className="logo-discord"></i>
            Iniciar sesión
          </button>
        ) : (
          <>
            <div className="user-info">
              <span>Bienvenido {globalState.userData.username}</span>
            </div>
            <button onClick={props.handleLogout}>
              <img src={`https://cdn.discordapp.com/avatars/${globalState.userData.id}/${globalState.userData.avatar}.jpg`} alt="Person Logo" id="person-logo-in" />
              Cerrar sesión</button>
          </>
        )}
      </div>
    </header>

  );


};

export default Navbar;
