import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = () => {
      const params = new URLSearchParams(window.location.hash.replace('#', ''));
      const accessToken = params.get('access_token');
      // Haz lo que necesites con el accessToken, por ejemplo, almacenarlo en sessionStorage
      sessionStorage.setItem('accessToken', accessToken);
      // Redirige al usuario a la página principal u otra página relevante
      navigate('/principal');
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div>
      <p>Procesando...</p>
    </div>
  );
};

export default AuthCallback;
