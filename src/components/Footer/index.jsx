import React from 'react'
import './Footer.css'

import logoFooter from '../../logoFooter.svg'
import { ArrowTop } from '../../icons'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="main-info">
        <img src={logoFooter} alt="footer logo" width={'170px'}/>
        <p>© Copyright 2023 | Callpurity.com | All Rights Reserved</p>
      </div>
      <div className="footer-nav">
        <a href="https://callpurity.com/" className='nav-el'>Home</a>
        <a href="https://callpurity.com/solution/" className='nav-el'>Solution</a>
        <a href="https://callpurity.com/about/" className='nav-el'>About</a>
        <a href="https://callpurity.com/about/#contact" className='nav-el'>Contact</a>
        <button className='nav-el arrow'><ArrowTop className='arrow-footer'/></button>
      </div>
    </div>
  )
}

export default Footer