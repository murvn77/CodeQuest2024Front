import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyIcon from '../../assets/icons/LOGOBLANCO.png';
import PersonLogo from '../../assets/icons/perfil.png';
import NormalFace from '../../assets/icons/normal face.png';
import LoveFace from '../../assets/icons/love.png'
import './Navbar.css'; // Asegúrate de tener este archivo CSS
import Swal from 'sweetalert2';

const Navbar = () => {

  const [dataUsuario, setData] = useState({});
  useEffect(() => {
    async function fechtData() {
      console.log("haciendo peticion")
      const code = new URLSearchParams(window.location.search).get('code');
      const CLIENT_ID = '1218718388809891841';
      const CLIENT_SECRET = 'NmMU9hIzlnC18bs3qToZDFAlxg6H1BF8';
      let options = {
        url: 'https://discord.com/api/oauth2/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          'client_id': CLIENT_ID,
          'client_secret': CLIENT_SECRET,
          'grant_type': 'authorization_code',
          'code': code,
          'redirect_uri': 'http://localhost:5173/principal'
        })
      }
      const data = await fetch('https://discord.com/api/v10/oauth2/token', options);
      const response = await data.json();
      console.log(response)
      const accessToken = response.access_token;
      const tokenType = response.token_type;
      sessionStorage.setItem("tokenType", tokenType);
      sessionStorage.setItem("accessToken", accessToken);
      if (!accessToken) {
        // window.location.href = '/';
      }

      fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then(result => result.json())
        .then(response => {
          console.log(response);
        })
        .catch(console.error);

      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
        .then(result => result.json())
        .then(response => {
          console.log(response);
          const { username, discriminator, avatar, id } = response;
          //set the welcome username string
          setData(response);
          sessionStorage.setItem('userData', JSON.stringify(response));
        })
        .catch(console.error);
    }
    if (window.location.pathname === "/principal") {
      if (!sessionStorage.getItem("accessToken")) {
        fechtData();
      }else{
        setData(JSON.parse(sessionStorage.getItem("userData")));
      }
    }

  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserString = sessionStorage.getItem('userData');
    if (!loggedInUserString) {
      setIsLoggedIn(false);
      setUserName('');
    } else {
      const loggedInUser = JSON.parse(loggedInUserString);
      setIsLoggedIn(true);
      console.log("esta es:")
      console.log(loggedInUser);
      setUserName(loggedInUser.username);
    }

  }, [sessionStorage.getItem('userData')]);

  const handleLogin = (button) => {
    console.log(button)
    const clientId = '1218718388809891841';
    const redirectUri = encodeURIComponent('http://localhost:5173/principal');
    const scope = encodeURIComponent('identify guilds');
    const authorizationUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fprincipal&scope=guilds+identify`;
    window.location.href = authorizationUrl;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/', { replace: true });
    Swal.fire({
      icon: 'success',
      title: '¡Logout!',
      text: 'Cierre de sesión existoso.',
    });
  };

  return (
    <header>
      <div className="left">
        <a href='/'>
          <img src={CompanyIcon} alt="Company Icon" className="company-icon" />
        </a>
      </div>
      <div className="right">
        {!isLoggedIn ? (
          <button onClick={() => {handleLogin(this)}} id="logInBtn">
            <i className="logo-discord"></i>
            Iniciar sesión
          </button>
        ) : (
          <>
            <div className="user-info">
              <span>Bienvenido {userName}</span>
            </div>
            <button onClick={handleLogout}>
              <img src={`https://cdn.discordapp.com/avatars/${dataUsuario.id}/${dataUsuario.avatar}.jpg`} alt="Person Logo" id="person-logo-in" />
              Cerrar sesión</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
