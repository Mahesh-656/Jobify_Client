import Wrapper from '../assets/wrappers/Navbar'
import React from 'react'
import {FaAlignLeft} from 'react-icons/fa'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logo from './Logo'
import LogoutContainer from '../components/LogoutContainer'
import Themetoggle from './Themetoggle'

const Navbar = () => {
  const {togglesidebar}=useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
<button type='button' className='toggle-btn' onClick={togglesidebar}>
  <FaAlignLeft/>
</button>
<div>
        <Logo/>
<h4 className="logo-text">dashboard</h4>
</div>
<div className="btn-container">
  <Themetoggle/>
  <LogoutContainer/>
</div>
      </div>

   
    </Wrapper>
  )
}

export default Navbar