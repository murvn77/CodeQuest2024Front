import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import NvRes from '../components/navbar/NvRes';
import Footer from '../components/footer/Footer';
import CookieConsentBanner from '../components/cookies/cookies'; // Importa el componente CookieConsentBanner
import './layout.css';

function Layout({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Verificar el estado de inicio de sesión al cargar el componente
  useEffect(() => {
    const loggedInUserString = sessionStorage.getItem('userData');
    if (loggedInUserString) {
      try {
        const loggedInUser = JSON.parse(loggedInUserString);
        if (loggedInUser && typeof loggedInUser === 'object') {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [sessionStorage.getItem('userData')]);

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    sessionStorage.removeItem('sesion');
    setIsLoggedIn(false);
  };

  // Función para manejar la aceptación de cookies
  const handleCookieAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setCookieAccepted(true);
  };

  return (
    <div className='layout' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {windowWidth < 800 ? (
        <NvRes />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      )}
      <main style={{ minHeight: 'calc((100vh/8)*6)' }} className='main-project'>
        {children}
      </main>
      <Footer style={{ alignSelf: 'flex-end' }} />
    </div>
  );
}

export default Layout;
