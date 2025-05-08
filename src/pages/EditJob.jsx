import React from 'react';
import { Formrow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../utils/Job';
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

// Loader to fetch job data
export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/job/${params.id}`);
    console.log('Fetched job data:', data);
    return {data};
  } catch (error) {
    toast.error(error.response?.data?.msg || 'Error fetching job');
    return redirect('/dashboard/all-jobs');
  }
};

// Action to handle job update submission
export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.put(`/job/${params.id}`, data);
    toast.success('Job edited successfully');
    return redirect('/dashboard/all-jobs');
  } catch (error) {
    toast.error(error.response.data.msg);
    return error;
  }
};

const EditJob = () => {
   const params = useParams();
  console.log(params);
  const { job } = useLoaderData(); // Retrieving job data from the loader
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method='post' className='form'>
        <h4 className='form-title'>edit job</h4>
        <div className='form-center'>
          <Formrow type='text' name='position' defaultValue={job?.position} />
          <Formrow type='text' name='company' defaultValue={job?.company} />

          {/* Job Status Select */}
          <div className='form-row'>
            <label htmlFor='jobStatus' className='form-label'>Job Status</label>
            <select name='jobStatus' id='jobStatus' className='form-select' defaultValue={job?.jobStatus}>
              {Object.values(JOB_STATUS).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Job Type Select */}
          <div className='form-row'>
            <label htmlFor='jobType' className='form-label'>Job Type</label>
            <select name='jobType' id='jobType' className='form-select' defaultValue={job?.jobType}>
              {Object.values(JOB_TYPE).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Job Location */}
          <Formrow type='text' name='jobLocation' labelText='Job Location' defaultValue={job?.location} />

          <button
            type='submit'
            className='btn btn-block form-btn'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'submitting...' : 'submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default EditJob;
