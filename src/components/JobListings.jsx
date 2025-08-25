import React from 'react'
import JobListingCard from '../components/JobListingCard'
import Spinner from '../components/Spinner'
import { useState , useEffect } from 'react';
import jobsData from '../jobs.json'; // Import the local JSON file

const JobListings = ({isHome = false}) => {
  const [jobs,setJobs] = useState([])
  const [loading , setLoading] = useState(true)
  
  useEffect(()=> {
    // Simulate API call delay and use local data
    const fetchJobs = async () => {
      try{
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Use local data instead of API call
        const data = isHome ? jobsData.jobs.slice(0, 3) : jobsData.jobs;
        console.log('Using local jobs data:', data);
        setJobs(data);
      }catch(error){
        console.log('Error loading data' , error);
      }finally{
        setLoading(false)
      }
    }
    fetchJobs();
  },[isHome])
  
  return (
   <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? 'Recent Jobs' : 'Browse Jobs'}
          </h2>
            {loading ? (
            <Spinner loading={loading} />
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListingCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      </section>
  )
}

export default JobListings