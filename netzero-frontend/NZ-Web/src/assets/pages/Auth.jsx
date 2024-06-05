import React, {useState} from 'react'
import { Link } from 'react-router-dom';

export default function Auth() {
    const [registration, setRegistration] = useState(false);

    const handleRegisterClick = () => {
      setRegistration(!registration);
    };
  
    return (
      <div className="w-full max-w-sm my-[100px] mx-auto overflow-hidden bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <Link to="#"><img src="images/logo.svg" alt="" /></Link>
          </div>
  
          <h3 className="mt-3 text-xl font-medium text-center text-gray-600">Welcome Back</h3>
  
          <p className="mt-1 text-center text-gray-500">Login or create account</p>
  
          <form>
            <div className="w-full mt-4">
              <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
            </div>
  
            <div className="w-full mt-4">
              <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
            </div>
  
            {registration && (
              <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Confirm Password" aria-label="Confirm Password" />
              </div>
            )}
  
            <div className="flex items-center justify-end gap-4 mt-4">
              {!registration && (
                <a href="#" className="text-sm text-gray-600 hover:text-gray-500">Forget Password?</a>
              )}
  
              <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                {registration ? 'Register' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
  
        <div className="flex items-center justify-center py-4 text-center bg-gray-50">
          <span className="text-sm text-gray-600">
              {registration ? 'Already have an account?' : 'Don\'t have an account?'}
              </span>
          <a href="#" onClick={handleRegisterClick} className="mx-2 text-sm font-bold text-blue-500 hover:underline">
              {registration ? 'Signup' : 'Register'}
          </a>
        </div>
      </div>
    );
}
