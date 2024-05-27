import React from 'react';

const Footer = ({ openModal }) => {
  return (
     <button className="fab" onClick={() => openModal(null,'add')} style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>+</button>
    
  );
};

export default Footer;
