import React from 'react'
import Links from '../utils/Links'
import { useDashboardContext } from '../pages/DashboardLayout'
import { NavLink } from 'react-router-dom'

const NavLinks = ({isBigSideBar}) => {
    const {togglesidebar,user}=useDashboardContext();
  return (
     
         <div className="nav-links">
      {Links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        // console.log(user,role);
        
        if (role !== 'ADMIN' && path === 'admin') return;
              return <NavLink to={path} key={text} className='nav-link' onClick={isBigSideBar?null:togglesidebar} end>
                <span className='icon'>
                  {icon}
                </span>
                {text}
                </NavLink>
            })}
          </div>
     
  )
}

export default NavLinks
