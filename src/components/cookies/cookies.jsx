import React, { useState, useEffect } from 'react';

const CookieConsentBanner = () => {
  const [consentGiven, setConsentGiven] = useState(localStorage.getItem('cookieAccepted') === 'true');

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setConsentGiven(true);
  };

  if (consentGiven) {
    return null; // No mostrar el banner si ya se ha dado el consentimiento
  }

  return (
    <div className="cookie-consent-banner">
      <p>Para mejorar tu experiencia, este sitio web utiliza cookies de terceros.</p>
      <button onClick={handleAccept}>Aceptar cookies</button>
    </div>
  );
};

export default CookieConsentBanner;
