import React from 'react'
import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import {Logo} from '../components'
import { Formrow } from '../components'
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const action = async({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', data);
    toast.success('Registration Successfully..');
    return redirect('/login');

  } catch (error) {
    const errorMessage = error?.response?.data?.msg || 'An unexpected error occurred.';
    toast.error(errorMessage);  // Display error toast
    return error;
  }
  
};
const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Wrapper>
       <Form method='post' className='form'>
<Logo/>
<h4>Register</h4>
<Formrow type='text' name='name'  defaultValue='Mahi'/>
<Formrow type='text' name='lastName' defaultValue='R' />
<Formrow type='text' name='location' defaultValue='Berigai' />
<Formrow type='email' name='email'  defaultValue='mahi@gmail.com'/>
<Formrow type='password' name='password' defaultValue='12345678' />
        <button type='submit' className='btn btn-block' disabled={isSubmitting}>{isSubmitting?'submitting':'submit'}</button>
<p>
  Already a member?
  <Link to='/login' className='member-btn'>Login</Link>
</p>
       </Form>
    </Wrapper>
  )
}

export default Register