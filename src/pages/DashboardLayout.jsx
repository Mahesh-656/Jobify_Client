import React, { createContext, useContext, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Dashboard'
import { SmallSideBar,BigSideBar,Navbar } from '../components'
import { defaultTheme } from '../App'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loader = async() => {
try {
  const {data}=await customFetch.get('/users/me')
  return data;
} catch (error) {
  return redirect('/');
}
}

const DashboardContext=createContext() //this is used to make the values to access globally
const DashboardLayout = ({defaultTheme}) => {
  const{user}  = useLoaderData();
 
  

  

  const [showSidebar,setshowSidebar]=useState(false);
  const [isDarkTheme,setIsDarkTheme]=useState(defaultTheme);

  const toggletheme=()=>{
   const darkTheme= !isDarkTheme;
   setIsDarkTheme(darkTheme);
   document.body.classList.toggle('dark-theme',darkTheme);
   localStorage.setItem('dark-theme',darkTheme);
  }

  const navigate=useNavigate()

  const togglesidebar=()=>{
    setshowSidebar(!showSidebar)
  }
  const logoutUser=async()=>{
    await customFetch.get('/auth/logout')
    navigate('/')
    toast.success('Logging out..');
    
  }

  return (
    <DashboardContext.Provider value={{user,showSidebar,isDarkTheme,togglesidebar,toggletheme,logoutUser}}>
      
    <Wrapper>
      <main className="dashboard">
        <SmallSideBar/>
        <BigSideBar/>
        <div>
          <Navbar/>
        <div className="dashboard-page">
          <Outlet context={{user}}/>
        </div>
        </div>
      </main>
    </Wrapper>
    </DashboardContext.Provider>

  )
}


export const useDashboardContext=()=>useContext(DashboardContext);
export default DashboardLayout