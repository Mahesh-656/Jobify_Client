import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

import React from 'react'

const Themetoggle = () => {
    const {isDarkTheme,toggletheme}=useDashboardContext()
  return (
    <Wrapper onClick={toggletheme}>
        {isDarkTheme?(<BsFillSunFill className='toggle-icon'/>):(<BsFillMoonFill className='toggle-icon'/>)}
    </Wrapper>
  )
}

export default Themetoggle