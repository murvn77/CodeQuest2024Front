import React, { useState, useEffect } from 'react';
import CompanyIcon from '../../assets/icons/LOGOBLANCO.png';
import PersonLogo from '../../assets/icons/perfil.png';
import NormalFace from '../../assets/icons/normal face.png';
import LoveFace from '../../assets/icons/love.png'
import './Navbar.css'; // Asegúrate de tener este archivo CSS


const Navbar = (props) => {
  console.log(props)
  const isLoggedIn = props.isLoggedIn;
  const userData = props.userData;
  
  if (userData) {
    return (
      <header>
        <div className="left">
          <a href='/'>
            <img src={CompanyIcon} alt="Company Icon" className="company-icon" />
          </a>
        </div>
        <div className="right">
          {!isLoggedIn ? (
            <button onClick={props.handleLogin} id="logInBtn">
              <i className="logo-discord"></i>
              Iniciar sesión
            </button>
          ) : (
            <>
              <div className="user-info">
                <span>Bienvenido {userData.name}</span>
              </div>
              <button onClick={props.handleLogout}>
                <img src={`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.jpg`} alt="Person Logo" id="person-logo-in" />
                Cerrar sesión</button>
            </>
          )}
        </div>
      </header>

    );
  }

};

export default Navbar;
