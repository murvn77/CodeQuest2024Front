import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../components/navbar/Navbar';
import NvRes from '../components/navbar/NvRes';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import './layout.css';
import Swal from 'sweetalert2';
import GlobalContext from '../store/Context';

function Layout({ children }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { globalState, setGlobalState } = useContext(GlobalContext);

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
    const clientId = '1216925942572650566';
    const redirectUri = encodeURIComponent('https://codequest2024front.onrender.com/principal');
    const scope = encodeURIComponent('identify guilds guilds.members.read');
    const authorizationUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=https://codequest2024front.onrender.com/principal&scope=guilds+identify+guilds.members.read`;
    window.location.href = authorizationUrl;
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setGlobalState({
      ...globalState,
      isLoggedIn: false
    })
    console.log('logged out');
    navigate('https://codequest2024front.onrender.com', { replace: true });
    Swal.fire({
      icon: 'success',
      title: '¡Logout!',
      text: 'Cierre de sesión existoso.',
    }).then(() => {
      window.location.href = '/';
    });
  };

  const [dataUsuario, setData] = useState({});
  useEffect(() => {
    async function fechtData() {
      const code = new URLSearchParams(window.location.search).get('code');
      let options = {
        method: 'GET'
      }
      
      try {
        const data = await fetch('https://codequest2024back.onrender.com/api/auth/discord?code=' + code, options);
        if (data.status == "200") {
          const response = await data.json();
          console.log(response)
          setGlobalState({
            isLoggedIn: true,
            userData: response
          })
          sessionStorage.setItem("userData", JSON.stringify(response));
          sessionStorage.setItem("isLoggedIn", true);
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Parece que no estás en el servidor de DevTalles",
            footer: '<a href="https://discord.gg/yWhcxVva" target="_blank">Únete</a>'
          }).then(() => {
            window.location.href = '/';
          });
        }
      } catch (exception) {
        console.log(exception);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Parece que no estás en el servidor de DevTalles",
          footer: '<a href="https://discord.gg/yWhcxVva" target="_blank">Únete</a>'
        }).then(() => {
          window.location.href = '/';
        });
      }
    }

    if (window.location.pathname === "/principal") {
      if (!sessionStorage.getItem("userData")) {
        fechtData();
      }else{
        setGlobalState({
          isLoggedIn: sessionStorage.getItem("isLoggedIn"),
          userData:JSON.parse(sessionStorage.getItem("userData"))
        });
      }
    }else{
      if (sessionStorage.getItem("userData")) {
        setGlobalState({
          isLoggedIn: true,
          userData:JSON.parse(sessionStorage.getItem("userData"))
        });
      }
    }

  }, []);

  return (
    <div className='layout' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {windowWidth < 800 ? (
        <NvRes />
      ) : (
        <Navbar handleLogout={handleLogout} handleLogin={handleLogin} />
      )}
      <main style={{ minHeight: 'calc((100vh/8)*6)' }} className='main-project'>
        {children}
      </main>
      <Footer style={{ alignSelf: 'flex-end' }} />
    </div>
  );
}

export default Layout;
