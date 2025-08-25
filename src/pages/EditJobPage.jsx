import React from 'react'
import Spinner from '../components/Spinner'
import { useState , useEffect } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import jobsData from '../jobs.json'; // Import local jobs data
import { toast } from 'react-toastify'; // Import toast for notifications

const EditJobPage = () => {
    const [loading , setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false) // Add loading state for form submission
    const { id } = useParams();
    const navigate = useNavigate();
    const [job,setJob] = useState(null);
    
    // Initialize form state with empty strings
    const [title,setTitle] = useState('');
    const [type,setType] = useState('');
    const [location,setLocation] = useState('');
    const [description,setDescription] = useState('');
    const [salary,setSalary] = useState('');
    const [companyName,setCompanyName] = useState('');
    const [companyDescription,setCompanyDescription] = useState('');
    const [contactEmail,setContactEmail] = useState('');
    const [contactPhone,setContactPhone] = useState('');
    
    useEffect(()=>{
        const fetchJob = async()=>{
            try{
                // Simulate API call delay and use local data
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Find job from local data instead of API call
                const foundJob = jobsData.jobs.find(j => j.id === id);
                if (foundJob) {
                    setJob(foundJob);
                    
                    // Populate form fields with fetched job data
                    setTitle(foundJob.title || '');
                    setType(foundJob.type || '');
                    setLocation(foundJob.location || '');
                    setDescription(foundJob.description || '');
                    setSalary(foundJob.salary || '');
                    setCompanyName(foundJob.company?.name || '');
                    setCompanyDescription(foundJob.company?.description || '');
                    setContactEmail(foundJob.company?.contactEmail || '');
                    setContactPhone(foundJob.company?.contactPhone || '');
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
    },[id, navigate]);


    const submitForm = async (e) =>{  // Make it async for better error handling
        e.preventDefault();
        setSubmitting(true); // Start loading
        
        const updatedJob = {
          id: id, // Keep the same ID
          title,
          type,
          location,
          description,
          salary,
          company:{
            name:companyName,
            description:companyDescription,
            contactEmail,
            contactPhone
          }
        }
        
        try {
            // Update the job in the local data
            const jobIndex = jobsData.jobs.findIndex(j => j.id === id);
            if (jobIndex !== -1) {
                jobsData.jobs[jobIndex] = updatedJob;
                
                // In a real app, you would send this to your backend API
                // const response = await fetch(`/api/jobs/${id}`, {
                //   method: 'PUT',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(updatedJob)
                // });
                
                console.log('Job updated successfully:', updatedJob);
                
                // Show success message
                toast.success('Job updated successfully!');
                
                // Navigate back to jobs page
                navigate('/jobs-page');
            } else {
                toast.error('Job not found!');
            }
        } catch (error) {
            console.error('Error updating job:', error);
            toast.error('Error updating job. Please try again.');
        } finally {
            setSubmitting(false); // Stop loading
        }
      }

  return (
     loading ? <Spinner /> :
     !job ? <Spinner /> : // Add additional check for job data
      <>
           <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
  <div className="container mx-auto max-w-4xl py-12 px-4">
    <div className="bg-white/80 backdrop-blur-sm px-8 py-10 shadow-2xl rounded-2xl border border-white/20 hover:shadow-3xl transition-all duration-300">
      <form onSubmit={submitForm} className="space-y-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
            </svg>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Edit Job
          </h2>
          <p className="text-gray-600">Update the job details for your team</p>
        </div>

        {/* Job Details Section */}
        <div className="bg-gray-50/50 rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
            Job Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Job Type */}
            <div className="group">
              <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                Job Type <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="type"
                  name="type"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 appearance-none bg-white"
                  required
                  value={type}
                  onChange={(e)=> setType(e.target.value) } 
                  // {/* This will get value of select and send it to setType to store it in type */}
                >
                  <option value="">Select job type</option>
                  <option value="Full-Time">🕘 Full-Time</option>
                  <option value="Part-Time">⏰ Part-Time</option>
                  <option value="Remote">🏠 Remote</option>
                  <option value="Internship">🎓 Internship</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div className="group">
              <label htmlFor="salary" className="block text-sm font-semibold text-gray-700 mb-2">
                Salary Range <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="salary"
                  name="salary"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 appearance-none bg-white"
                  required
                  value={salary}
                  onChange={(e)=> setSalary(e.target.value) } 
                >
                  <option value="">Select salary range</option>
                  <option value="Under $50K">💰 Under $50K</option>
                  <option value="$50K - 60K">💰 $50K - $60K</option>
                  <option value="$60K - 70K">💰 $60K - $70K</option>
                  <option value="$70K - 80K">💰 $70K - $80K</option>
                  <option value="$80K - 90K">💰 $80K - $90K</option>
                  <option value="$90K - 100K">💰 $90K - $100K</option>
                  <option value="$100K - 125K">💎 $100K - $125K</option>
                  <option value="$125K - 150K">💎 $125K - $150K</option>
                  <option value="$150K - 175K">💎 $150K - $175K</option>
                  <option value="$175K - 200K">💎 $175K - $200K</option>
                  <option value="Over $200K">🚀 Over $200K</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Job Title */}
          <div className="group">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 placeholder-gray-400"
              placeholder="e.g. Senior React Developer"
              required
              value={title}
              onChange={(e)=> setTitle(e.target.value) } 
            />
          </div>

          {/* Location */}
          <div className="group">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 placeholder-gray-400"
                placeholder="e.g. New York, NY or Remote"
                required
                value={location}
                onChange={(e)=> setLocation(e.target.value) }
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="group">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="5"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 placeholder-gray-400 resize-none"
              placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
              value={description}
              onChange={(e)=> setDescription(e.target.value) } 
            ></textarea>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="bg-purple-50/50 rounded-xl p-6 space-y-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
            Company Information
          </h3>

          {/* Company Name */}
          <div className="group">
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="company"
                name="company"
                className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 placeholder-gray-400"
                placeholder="e.g. Tech Innovations Inc."
                required
                value={companyName}
              onChange={(e)=> setCompanyName(e.target.value) } 
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="group">
            <label htmlFor="company_description" className="block text-sm font-semibold text-gray-700 mb-2">
              Company Description
            </label>
            <textarea
              id="company_description"
              name="company_description"
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 placeholder-gray-400 resize-none"
              placeholder="Tell candidates about your company culture, mission, and what makes it a great place to work..."
              value={companyDescription}
              onChange={(e)=> setCompanyDescription(e.target.value) }
            ></textarea>
          </div>

          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="group">
              <label htmlFor="contact_email" className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 placeholder-gray-400"
                  placeholder="hr@company.com"
                  required
                  value={contactEmail}
                  onChange={(e)=> setContactEmail(e.target.value) }
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="contact_phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Phone <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  className="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 placeholder-gray-400"
                  placeholder="+1 (555) 123-4567"
                  value={contactPhone}
                  onChange={(e)=> setContactPhone(e.target.value) }
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50"
            disabled={submitting} // Disable button while submitting
          >
            {submitting ? (
              <Spinner />
            ) : (
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Update Job
              </span>
            )}
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>By posting this job, you agree to our terms of service and privacy policy.</p>
        </div>
      </form>
    </div>
  </div>
</section>
      </>
);

}

export default EditJobPage