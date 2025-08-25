import React from 'react'
import Spinner from '../components/Spinner'
import { useState , useEffect } from 'react';
import { useParams , useNavigate  , NavLink} from 'react-router-dom';
import { FaArrowLeft,FaMapMarker } from 'react-icons/fa';
import { toast } from 'react-toastify';
import jobsData from '../jobs.json'; // Import local jobs data

const JobPage = ({deleteJob}) => {

    const navigate = useNavigate(); //This for redirect page

    const {id} = useParams() // This will get id params from url

    const [job,setJob] = useState(null);
    const [loading , setLoading] = useState(true)
    
    useEffect(()=>{
        const fetchJob = async()=>{
            try{
                // Simulate API call delay and use local data
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Find job from local data instead of API call
                const foundJob = jobsData.jobs.find(j => j.id === id);
                if (foundJob) {
                    setJob(foundJob);
                } else {
                    console.log('Job not found with id:', id);
                    // Redirect to jobs page if job not found
                    navigate('/jobs-page');
                }
            }catch(error){
                console.log('Error loading data' , error);
            }finally{
                setLoading(false)
            }
        }
        fetchJob();
    },[id, navigate])

    const onDelete = (jobId) => {
        const confirm = window.confirm('Are you sure you want to delete this listing?');
        if(!confirm) return;

        // Since we're using local data, just show success message and redirect
        // In a real app, you would call deleteJob(jobId) here
        console.log('Job would be deleted:', jobId);
        
        toast.success('Job deleted successfully');
        navigate('/jobs-page');
    };
  return (
    loading ? <Spinner /> :
    !job ? <Spinner /> : // Add additional check for job data
       <>
        <section>
        <div className="container m-auto py-6 px-6">
            <NavLink
            to="/jobs-page"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
            >
            <FaArrowLeft className='mr-2' /> Back to Job Listings
            </NavLink>
        </div>
        </section>

        <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
                <div
                className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
                >
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">
                    {job.title}
                </h1>
                <div
                    className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
                >
                   <FaMapMarker className='text-orange-700 mr-1' />
                    <p className="text-orange-700">{job.location}</p>
                </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                    Job Description
                </h3>

                <p className="mb-4">
                {job.description}
                </p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">Salary</h3>

                <p className="mb-4"> {job.salary}</p>
                </div>
            </main>

            <aside>
                <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl"> {job.company.name}</h2>

                <p className="my-2">
                    {job.company.description}
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                    {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">{job.company.contactPhone}</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <NavLink
                    to={`/edit-job/${job.id}`}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                    >Edit Job</NavLink>
                <button onClick={ () => onDelete(job.id) }
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                    Delete Job
                </button>
                </div>
            </aside>
            </div>
        </div>
        </section>
    </>
    )
}
export default JobPage