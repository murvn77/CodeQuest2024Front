import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import NvRes from '../components/navbar/NvRes';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import './layout.css';
import Swal from 'sweetalert2';

function Layout({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogin = () => {
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

  const [dataUsuario, setData] = useState({});
  useEffect(() => {
    async function fechtData() {
      const code = new URLSearchParams(window.location.search).get('code');
      const CLIENT_ID = '1218718388809891841';
      const CLIENT_SECRET = 'NmMU9hIzlnC18bs3qToZDFAlxg6H1BF8';
      let options = {
        method: 'GET'
      }
      try{
        const data = await fetch('https://codequest2024back.onrender.com/api/auth/discord?code=' + code, options);
        if(data.status == "200"){
          const response = await data.json(); 
          setData(response);
          setIsLoggedIn(true);
          sessionStorage.setItem("userData", JSON.stringify(response));
        }else{
          window.location.href = '/';
        }
      }catch(exception){
        console.log(exception);
        window.location.href = '/';
      }
    }
    if(sessionStorage.getItem("userData")){
      setData(JSON.parse(sessionStorage.getItem("userData")));
      setIsLoggedIn(true);
    }else{
      if (window.location.pathname === "/principal") {
        fechtData();
      }
    }
  }, []);

  return (
    <div className='layout' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {windowWidth < 800 ? (
        <NvRes />
      ) : (
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} handleLogin={handleLogin} userData={dataUsuario}/>
      )}
      <main style={{ minHeight: 'calc((100vh/8)*6)' }} className='main-project'>
        {children}
      </main>
      <Footer style={{ alignSelf: 'flex-end' }} />
    </div>
  );
}

export default Layout;
