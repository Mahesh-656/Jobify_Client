import React from 'react'
import { Formrow } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext, useNavigation, Form, redirect } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../utils/Job';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post('/job',data)
    toast.success('Job added Sucessfully..')
    return redirect('/dashboard/all-jobs');
  } catch (error) {
       toast.error(error?.response?.data?.msg)
    return null;
    
  }
}

const AddJob = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
           <Formrow type="text" name="company" />
          <Formrow type="text" name="position" />  
          {/* Job Status Select */}
          <div className="form-row">
            <label htmlFor="jobStatus" className="form-label ">Job Status</label>
            <select name="jobStatus" id="jobStatus" className="form-select">
              {Object.values(JOB_STATUS).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Job Type Select */}
          <div className="form-row">
            <label htmlFor="jobType" className="form-label">Job Type</label>
            <select name="jobType" id="jobType" className="form-select">
              {Object.values(JOB_TYPE).map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
           <Formrow type="text" name="location" labelText="Job Location" defaultValue={user?.location || ''} />

          <button type="submit" className="btn btn-block form-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddJob;
