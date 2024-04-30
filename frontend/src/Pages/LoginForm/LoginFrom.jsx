import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from "notistack";
import { jwtDecode } from "jwt-decode";


const LoginFrom = () => {
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        email,
        mot_de_passe,
      };
  
      // Sending login request to backend
      const response = await axios.post('http://localhost:5000/employee/auth', data);
      // If login is successful, navigate to the dashboard or any other desired page
      if (response.status === 200) {
        const decodedToken = jwtDecode(response.data.accessToken);
        console.log("hello",decodedToken.UserInfo.role);
        const role = await axios.get(`http://localhost:5000/role/${decodedToken.UserInfo.role}`);
        console.log("role mel login",role.data.nom);
        
        const { accessToken } = response.data;
        console.log("helooooooooooooooooooo",response.data);
        localStorage.setItem('accessToken', accessToken); // Store the access token in local storage
        localStorage.setItem('userRole',role.data.nom);
        console.log(localStorage.getItem('userRole'));
        localStorage.setItem('refreshToken',response.data.refreshToken);
        console.log("acceeeess token",decodedToken);
        enqueueSnackbar('Logged in successfully!', { variant: 'success' });
      
      if(role.data.nom==="admin")
      window.location.href ='/hr/demandes'; // Navigate to the dashboard or any other desired page
    
      if(role.data.nom==="employé")
      window.location.href ="/employee/demandes"; // Navigate to the dashboard or any other desired page
    
      if(role.data.nom==="depChief")
      window.location.href =`/chef_depart/demandes/${decodedToken.UserInfo.id}`; // Navigate to the dashboard or any other desired page
    }
    } catch (error) {
      // If there's an error, show an error message
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connectez vous !</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email" />
                <AiOutlineUser className="absolute top-0 right-0 mt-2 mr-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  name="mot_de_passe"
                  type="password"
                  value={mot_de_passe}
                  onChange={(e) => setMot_de_passe(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mot de passe" />
                <AiOutlineLock className="absolute top-0 right-0 mt-2 mr-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Mot de passe oublié ?
              </Link>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center mt-4 text-sm">
          <p className="text-gray-600">Vous n'avez pas un compte? contacter votre manager ! </p>
        </div>
      </div>
    </div>
  );
};

export default LoginFrom;
