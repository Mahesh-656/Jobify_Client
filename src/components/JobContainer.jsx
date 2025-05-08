import React from 'react';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJob';

const JobContainer = () => {
    // Ensure we are properly destructuring content, and set an empty array if undefined
    const {data}  = useAllJobsContext();
    // console.log('content' ,data);
    
    const jobs = data?.content || [];
    // console.log(jobs);
    // Default to an empty array if data.content is undefined

    if (jobs.length === 0) {
        return (
            <Wrapper>
                <h2>No Jobs to display...</h2>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <div className="jobs">
                {jobs.map((job) => {
                    return <Job key={job.id} {...job} />;
                })}
            </div>
        </Wrapper>
    );
};

export default JobContainer;
