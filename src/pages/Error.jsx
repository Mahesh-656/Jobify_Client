import React from 'react'
import { Link, useRouteError  } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  const error=useRouteError();
 if(error.status === 404){
  return <Wrapper>
<div>
      <img src={img} alt="Not found" />
    <h3>Page not found..!</h3>
    <p>We can't seem to find the page you are looking for</p>
      <Link to="/dashboard">back home</Link>
</div>
  </Wrapper>
 }
  
  return (
    <Wrapper>
      <div>
        <h3>Something Went Wrong</h3>
      </div>
    </Wrapper>
  )
}

export default Error