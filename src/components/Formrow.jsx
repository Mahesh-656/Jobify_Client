import React from 'react'

const Formrow = ({type,name,labeltext,defaultValue}) => {
  return (
    <div className="form-row">
  <label htmlFor={name} className='form-label'>{labeltext || name}</label>
  <input type={type} id={name} name={name} className='form-input' defaultValue={defaultValue} required/>
</div>
  )
}

export default Formrow

