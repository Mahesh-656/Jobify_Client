import Wrapper from '../assets/wrappers/SmallSidebar'
import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import NavLinks from './NavLinks';

const SmallSideBar = () => {
  const {showSidebar,togglesidebar}=useDashboardContext();

  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container show-sidebar':'sidebar-container'}>
        <div className="content">
          <button type='button' className='close-btn' onClick={togglesidebar}>
            <FaTimes/>
          </button>
          <header>
            <Logo/>
          </header>
        <NavLinks/>
        </div>

      </div>
    </Wrapper>
  )
}
export default SmallSideBar