import React from 'react';
import { FaTwitter, FaYoutube, FaLinkedin, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="text-white text-center text-lg-start" style={{ backgroundColor: '#130c25' }}>
      <div className="container p-4">
        <div className="row align-items-center">
          <div className="col-lg-7 mx-auto">
            {/* Enlaces para Inicio, Términos y condiciones, Políticas de privacidad, FAQ y Contáctanos */}
            <p className="footer-links d-flex justify-content-start" style={{ fontSize: '14px' }}>
              <span className="me-3"><a className='text-white' style={{ textDecoration: 'none' }} href='https://cursos.devtalles.com/' target='_black'>Inicio</a></span>
              <span className="me-3"><a className='text-white' style={{ textDecoration: 'none' }} href='https://cursos.devtalles.com/pages/terminos-y-condiciones' target='_black'>Términos y condiciones</a></span>
              <span className="me-3"><a className='text-white' style={{ textDecoration: 'none' }} href='https://cursos.devtalles.com/pages/politicas-de-privacidad' target='_black'>Políticas de privacidad</a></span>
              <span className="me-3"><a className='text-white' style={{ textDecoration: 'none' }} href='https://cursos.devtalles.com/pages/preguntas-frecuentes' target='_black'>FAQ</a></span>
              <span className="me-3"><a className='text-white' style={{ textDecoration: 'none' }} href='https://cursos.devtalles.com/pages/contactanos' target='_black'>Contáctanos</a></span>
            </p>
          </div>
          {/* Iconos para Twitter, YouTube, LinkedIn y Discord */}
          <div className="col-lg-5 d-flex justify-content-end">
          <a className='text-white' style={{ textDecoration: 'none' }} href='https://cursos.devtalles.com/pages/contactanos' target='_black'><FaTwitter size={24} className="me-3" /></a>
            <FaYoutube size={24} className="me-3" />
            <FaLinkedin size={24} className="me-3" />
            <FaDiscord size={24} className="me-3" />
          </div>
          {/* Línea divisoria */}
          <hr className="w-100" />
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', fontSize: '12px' }}>
        {/* Copyright */}
        <span>© 2024 devTalles.com todos los derechos reservados</span>
      </div>
    </footer>
  );
};

export default Footer;
