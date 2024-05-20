import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import logo from './images/logo.png'
function Header() {
  return (
    <header class="d-flex align-items-center justify-content-between p-3">
      <div className="d-flex align-items-center">
        <img src={logo} alt="Logo" className="me-3 px-2" style={{ width: '180px', height: '80px', }}  />
      </div>
      <div>
        <FontAwesomeIcon icon={faCog} className="settings-icon col align-self-end me-4" />
       </div>
    
</header>

  
  )
}

export default Header
