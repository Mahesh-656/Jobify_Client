import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
import {Logo} from '../components'
const Landing = () => {
  return (
    <Wrapper>
<nav>
  <Logo/>
</nav>
<div className="container page">
  <div className="info">
    <h1>
      Job <span>tracking</span>App
    </h1>
    <p>
     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, saepe incidunt repudiandae, enim animi excepturi modi quos tempora nobis dolore praesentium labore corrupti placeat eum fuga hic omnis sunt velit!
    </p>
<Link to='/register' className="btn register-link">Register</Link>
<Link to='/login' className='btn'>Login / Demo User</Link>
  </div>
  <img src={main} alt="Job Hunt" className='img main-img' />
</div>
    </Wrapper>
  )
}

export default Landing