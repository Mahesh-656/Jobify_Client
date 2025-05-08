import React, { useState } from 'react';
import { Formrow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useOutletContext();
  console.log("uuuu",user);
  
  const { id, name, lastName, email, location } = user;
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Image Change and Size Validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        toast.error('Image size too large (max 0.5 MB)');
        e.target.value = null;
        setImagePreview(null);
        return;
      }
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    formData.append('id', id);

    try {
      await customFetch.put(`/users/update-user/${user.email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit} encType='multipart/form-data'>
        <h4 className='form-title'>Profile</h4>

        <div className='form-center'>
          {/* User ID (Hidden) */}
          <input type="hidden" name="id" value={id} />

          <div className='form-row'>
            <label htmlFor='image' className='form-label'>
              Select an image file (max 0.5 MB):
            </label>
            <input
              type='file'
              id='avatar'
              name='image'
              className='form-input'
              accept='image/*'
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt='Profile Preview'
                className='image-preview'
                style={{ marginTop: '10px', width: '100px', height: '100px', objectFit: 'cover' }}
              />
            )}
          </div>

          <Formrow type='text' name='name' defaultValue={name} />
          <Formrow type='text' labelText='Last Name' name='lastName' defaultValue={lastName} />
          <Formrow type='email' name='email' defaultValue={email} />
          <Formrow type='text' name='location' defaultValue={location} />

          <button
            className='btn btn-block form-btn'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
