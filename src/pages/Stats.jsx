import { ChartsContainer, StatsContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    // First get the current user to get the userId
    const userResponse = await customFetch.get("/users/me");
    const userId = userResponse.data.user.id;
    console.log('Current User ID:', userId);
    
    // Then get the stats using the userId
    const statsResponse = await customFetch.get(`/job/stats/${userId}`);
    console.log('Stats Response:', statsResponse.data);
    
    if (!statsResponse.data) {
      console.log('No stats data received');
      return {
        defaultStats: {
          pending: 0,
          interview: 0,
          declined: 0
        },
        monthlyApplications: []
      };
    }
    
    return statsResponse.data;
  } catch (error) {
    console.error('Error in loader:', error);
    toast.error(error?.response?.data?.msg || "Error fetching stats");
    return {
      defaultStats: {
        pending: 0,
        interview: 0,
        declined: 0
      },
      monthlyApplications: []
    };
  }
};

const Stats = () => {
  const data = useLoaderData();
  // console.log('Stats Data:', data);

  const { defaultStats, monthlyApplications } = data || {
    defaultStats: {
      pending: 0,
      interview: 0,
      declined: 0
    },
    monthlyApplications: []
  };

  console.log('Parsed Stats:', { defaultStats, monthlyApplications });

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default Stats;
