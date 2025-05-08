import { useContext, createContext } from "react";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import { SearchContainer, JobContainer } from "../components";
import customFetch from "../utils/customFetch";

const AllJobsContext = createContext();

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const { search, jobStatus, jobType, sort, page = 1, size = 10 } = params;

    let url = "/job/search";
    const queryParams = new URLSearchParams();

    // Always use search endpoint for consistent filtering
    if (search) {
      queryParams.append("search", search);
    }
    
    // Add filters if they exist and are not "all"
    if (jobStatus && jobStatus !== "all") {
      queryParams.append("jobStatus", jobStatus);
    }
    if (jobType && jobType !== "all") {
      queryParams.append("jobType", jobType);
    }

    // Add pagination parameters
    queryParams.append("page", parseInt(page) - 1); // Convert to 0-based for backend
    queryParams.append("size", size);
    queryParams.append("sortBy", sort || "newest");

    console.log("Making request to:", `${url}?${queryParams.toString()}`);
    const { data } = await customFetch.get(`${url}?${queryParams}`);

    return {
      data,
      searchValues: { search, jobStatus, jobType, sort, page, size },
    };
  } catch (error) {
    console.error("Error in loader:", error);
    toast.error(error?.response?.data?.msg || "Something went wrong");
    return error;
  }
};

const AllJob = () => {
  const { data, searchValues } = useLoaderData();

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJob;
