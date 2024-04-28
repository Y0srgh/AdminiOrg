import React from "react";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";

const LoginFrom = () => {
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform login logic
    // After successful login, dispatch 'LOGIN' action with the access token
    //dispatch({ type: 'LOGIN', payload: { accessToken: 'your_access_token_here' } });
    try {
      const response = await axios.post('http://localhost:5000/employee/auth', {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      // If login is successful, obtain the access token from the response
      const accessToken = response.data.accessToken;

      // Dispatch the 'LOGIN' action with the obtained access token
      dispatch({ type: 'LOGIN', payload: { accessToken } });

      // Optionally, you can redirect the user to a different page
      // window.location.href = '/dashboard';
    } catch (error) {
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
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true"/>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <div className="relative">
                <input name="email" type="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email"/>
                <AiOutlineUser className="absolute top-0 right-0 mt-2 mr-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div>
              <div className="relative">
                <input name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Mot de passe"/>
                <AiOutlineLock className="absolute top-0 right-0 mt-2 mr-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
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
