import React from 'react'
import { useState } from 'react'
import { FaMapMarker } from 'react-icons/fa'
import {Link} from 'react-router-dom'

const JobListingCard = ({job}) => {

    // Debug log to see what job data is being passed
    console.log('JobListingCard received job:', job);

    // showFullDescription => 	A boolean state variable (true/false). It holds whether the full job description should be shown or not.
    // setShowFullDescription => function 
    // useState => Initializes the state to false (i.e. the full description is hidden by default).

    const [showFullDescription , setShowFullDescription] = useState(false);//useState
    let description = job.description || ''; // Add fallback for null/undefined description
    
    if(!showFullDescription && description){//This value is false by default from useState function above
        description = description.substring(0,90) + '...'; // For cut some text from description
    }
  return (
    <div className="bg-white rounded-xl shadow-md relative">
        <div className="p-4">
            <div className="mb-6">
            <div className="text-gray-600 my-2">{job.type}</div>
            <h3 className="text-xl font-bold">{job.title}</h3>
            </div>

            <div className="mb-5">{description}</div>

            <button onClick={()=>setShowFullDescription((prevState)=> !prevState)} className="text-indigo-500 mb-5 hover:text-indigo-600">{showFullDescription ? 'Less' : 'More'}</button>

            <h3 className="text-indigo-500 mb-2">{job.salary}</h3>

            <div className="border border-gray-100 mb-5"></div>

            <div className="flex flex-col lg:flex-row justify-between mb-4">
            <div className="text-orange-700 mb-3">
                <FaMapMarker className='inline text-lg mb-1'/>
                {job.location}
            </div>
            <Link
                to={`/job/${job.id}`}
                className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
            >
            Read More
            </Link>
            </div>
        </div>
    </div>
  )
}

export default JobListingCard