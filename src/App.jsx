import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import React from 'react'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage from './pages/JobPage'
import AddJobPage from './pages/AddJonPage'
import EditJobPage from './pages/EditJobPage'


const App = () => {
  
  // Add New Job
  const addJob = async (newJob)=>{
    // console.log(newJob);
    const res = await fetch('/api/jobs',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newJob)
    });
    return;
  }

  // Delete Job
const deleteJob = async (id)=>{
    // console.log('delete' , id);
    const res = await fetch(`/api/jobs/${id}`,{
      method: 'DELETE',
    });
    return;
  }


   const editJob = async (newJob)=>{
    // console.log(newJob);
    const res = await fetch('/api/jobs',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newJob)
    });
    return;
  }
const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<MainLayout/>}>
     {/* This route will apply layout any route added here will apply layout */}
    <Route index element={<HomePage />} />
    <Route path='/jobs-page' element={<JobsPage />} />
    <Route path='/job/:id' element={<JobPage  deleteJob={deleteJob}/>} />
    <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />} />
    <Route path='/edit-job/:id' element={<EditJobPage editJob={editJob} />} />
    <Route path='*' element={<NotFoundPage />} />
    {/* This page component for catch any page that is not exist then show not found page */}
  </Route>
  )
);
  return <RouterProvider router={router}></RouterProvider>
}

export default App