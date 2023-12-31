import React from 'react'
import './SideBar.css'
import logo from '../../logo.svg'
import SideBarMenu from '../../components/SideBarMenu'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <div className="header-sidebar">
            <img src={logo} alt='logo'/>
        </div>
        <div className="line"></div>
        <SideBarMenu />
    </div>
  )
}

export default SideBar