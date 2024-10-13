import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
const Home = () => {

    const [loggedInUser, setLoggedInUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, [])

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess("Logout Successfully");
        setTimeout(()=> {
            navigate('/login');
        }, 1000)
    }
  return (
    <div className='container'>
        <h1 className='text-center mt-5'>Welcome , <span className='text-primary'>Mr. {loggedInUser}</span></h1>
        <div className="d-flex justify-content-center mx-4 mt-3 mb-lg-4">
            <button type="submit" className="btn btn-primary" onClick={handleLogout}>Logout</button>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Home
