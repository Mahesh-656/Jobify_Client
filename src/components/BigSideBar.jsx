import Wrapper from '../assets/wrappers/BigSidebar'
import React from 'react'
import Logo from './Logo'
import NavLinks from '../components/NavLinks'
import { useDashboardContext } from '../pages/DashboardLayout'

const BigSideBar = () => {
  const {showSidebar}=useDashboardContext()
  return (
    <Wrapper>
      <div className={showSidebar?'sidebar-container':'sidebar-container show-sidebar'}>
        <div className="content">
          <header>
            <Logo/>
          </header>
          <NavLinks isBigSideBar/>
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSideBar