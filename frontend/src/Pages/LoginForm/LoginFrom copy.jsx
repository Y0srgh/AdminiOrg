import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";
//import jwt_decode from 'jwt-decode';
import { jwtDecode } from "jwt-decode";
import { setCredentials } from "../../features/auth/authSlice.js";
import { useLoginMutation } from "../../features/auth/authApiSlice.js";

const LoginFrom = () => {
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      mot_de_passe,
    }

    // Perform login logic
    // After successful login, dispatch 'LOGIN' action with the access token
    //dispatch({ type: 'LOGIN', payload: { accessToken: 'your_access_token_here' } });
    try {
      const response = await axios.post('http://localhost:5000/employee/auth', data);

      // If login is successful, obtain the access token from the response
      const accessToken = response.data.accessToken;
      console.log("response", response);
      console.log('accessToken', accessToken);

      // Decode the JWT token to extract user information
      const decodedToken = jwtDecode(accessToken);
      console.log("decoded token", decodedToken);
      // Get the user's role from the decoded token
      const { role } = decodedToken.UserInfo;
      console.log("role : ", role);
      let id = role ;
      const roleResponse = await axios.get(`http://localhost:5000/role/${id}`);
      if (!roleResponse) {
        throw new Error('Failed to fetch role details');
      }
      console.log("roleResponse", roleResponse);
      /*const roleData = await roleResponse.json();*/

      // Get the name of the role from the response
      const roleName = roleResponse.data.nom;
      console.log("role Name", roleName);
      id = decodedToken.UserInfo.id;
      console.log("id", id);

      enqueueSnackbar("L'employé a été ajouté avec succès", {
        variant: "success",
      });
      // Dispatch the 'LOGIN' action with the obtained access token
      dispatch({ type: 'LOGIN', payload: { accessToken } });

      console.log("role name 1", roleName);
      // Navigate based on the user's role name
    if (roleName === 'admin') {
      navigate('/hr/demandes'); // Redirect to admin dashboard
    } else if (roleName === 'employé') {
      navigate(`/employee/demandes/${id}`); // Redirect to employee dashboard
    } else {
      navigate(`/chef_depart/demandes/${id}`) // Redirect to a default route
    }
      // Optionally, you can redirect the user to a different page
      // window.location.href = '/dashboard';
    } catch (error) {
      //enqueueSnackbar(error.response, { variant: "error" });

      console.error('Login error:', error);
      // Handle login error (e.g., display error message to the user)
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
