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
  const [errMsg, setErrMsg] = useState("");
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [login, {isLoading}] = useLoginMutation();

  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
   setErrMsg('')
  },[email, mot_de_passe])

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const {accessToken} = await login({email, mot_de_passe}).unwrap()
      console.log("access token", accessToken);
      dispatch(setCredentials({accessToken}))
      setEmail('')
      setMot_de_passe('')
      const decodedToken = jwtDecode(accessToken);
      console.log("decoded token", decodedToken);
      //navigate('')

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

      if (roleName === 'admin') {
        navigate('/hr/demandes'); // Redirect to admin dashboard
      } else if (roleName === 'employé') {
        navigate(`/employee/demandes/${id}`); // Redirect to employee dashboard
      } else {
        navigate(`/chef_depart/demandes/${id}`) // Redirect to a default route
      }
      
    } catch (error) {
      console.log(error);
      if(!err.status){
        setErrMsg('No server Response');
      }else if (err.status === 400){
        setErrMsg('Missing Username or Password');
      }else if (err.status === 401){
        setErrMsg('Unauthorized');
      }else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const errClass = errMsg ? "errmsg" : "offscreen"

  if(isLoading) return <h2>Loading...</h2>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <p ref={errRef} className="errClass" aria-live="assertive">{errMsg}</p>

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
                  ref={userRef}
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
