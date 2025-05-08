import { Formrow, FormRowSelect } from "./index";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../utils/constants";
import { useAllJobsContext } from "../pages/AllJob";
import { useCallback, useEffect, useState } from "react";

const SearchContainer = () => {
  const { searchValues, data } = useAllJobsContext();
  const submit = useSubmit();
  const [searchTerm, setSearchTerm] = useState(searchValues?.search || '');

  // Debounce function that triggers every 1 second
  const debounce = useCallback((onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000); // Changed to 1000ms (1 second)
    };
  }, []);

  const handleSearch = useCallback(
    debounce((form) => {
      submit(form);
    }),
    [submit]
  );

  const handleFilterChange = useCallback((e) => {
    const form = e.currentTarget.form;
    submit(form);
  }, [submit]);

  // Effect to trigger search when searchTerm changes
  useEffect(() => {
    const form = document.querySelector('form');
    if (form) {
      handleSearch({ currentTarget: { form } });
    }
  }, [searchTerm, handleSearch]);

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <Formrow
            type="search"
            name="search"
            value={searchTerm}
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
              }
            }}
          />

          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={searchValues?.jobStatus || "all"}
            onChange={handleFilterChange}
          />

          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={searchValues?.jobType || "all"}
            onChange={handleFilterChange}
          />

          <FormRowSelect
            labelText="sort"
            name="sort"
            defaultValue={searchValues?.sort || "newest"}
            list={Object.values(JOB_SORT_BY)}
            onChange={handleFilterChange}
          />

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>

      {data && (
        <div className="pagination-info">
          <span>
            Page {searchValues?.page || 1} of{" "}
            {Math.ceil(data.totalElements / (searchValues?.size || 10))}
          </span>
          <span> | </span>
          <span>Total Jobs: {data.totalElements}</span>
        </div>
      )}
    </Wrapper>
  );
};

export default SearchContainer;
