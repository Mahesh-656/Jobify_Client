import React, { useState } from 'react';
import { redirect, Link, Form, useNavigation,useActionData } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo } from '../components';
import { Formrow } from '../components';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

// Action function to handle the form submission
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData); // Convert form data to an object

  const errors = { msg: '' }
  if (data.password.length < 7) {
    errors.msg="Password too short";
    return errors;
  }

  try {
    // Send login request to backend
    const response = await customFetch.post('/auth/login', data);

    // On successful login, show success message and redirect
    toast.success('Login successful!');
    return redirect('/dashboard'); // Redirect to a protected page after successful login
  } catch (error) {
    // Handle error from the backend
     errors.msg = error?.response?.data?.message || 'An unexpected error occurred';
    return errors;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting'; // Show submitting state when form is submitting

  
     const errors = useActionData();

  return (

    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}
        <p>
        </p>
        <Formrow type="text" name="email" defaultValue="mahi@gmail.com" />
        <Formrow type="password" name="password" defaultValue="12345678" />
        
        {/* Submit Button */}
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Submit'}
        </button>
        
        {/* Explore the app button */}
        <button type="button" className="btn btn-block">
          Explore the App
        </button>
        
        {/* Link to register page */}
        <p>
          Not a member yet? 
          <Link to="/register" className="member-btn">Register</Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
