import React from 'react'
import './SideBar.css'
import logo from '../../logo.svg'
import Menu from '../Menu'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="header-sidebar">
            <img src={logo} alt='logo'/>
        </div>
        <div className="line"></div>
        <Menu />
    </div>
  )
}

export default SideBar