import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, login, logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const isAuthenticated = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openLogin = () => {
    setIsLogin(true);
    setShowPopup(true);
  };

  const openSignup = () => {
    setIsLogin(false);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await dispatch(signup({ name, email, password })).unwrap();
      closePopup();
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/dashboard");
      closePopup();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex z-50 items-center justify-center">
      {isAuthenticated ? (
        <button onClick={handleLogout} className="bg-red-800 hover:bg-black text-white px-3 py-2 rounded">Logout</button>
      ) : (
        <div>
          <button onClick={openLogin} className="bg-green-800 hover:bg-black text-white px-3 py-2 rounded mr-4">Login</button>
          <button onClick={openSignup} className="bg-green-800 hover:bg-black text-white px-3 py-2 rounded">Signup</button>
        </div>
      )}
      {showPopup && (
        <div id="auth-popup-container" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-300 p-8 rounded shadow-lg relative w-full max-w-md">
            <button className="absolute top-2 right-2 text-black hover:text-gray-700" onClick={closePopup}>&times;</button>
            <h2 className="text-2xl text-black font-bold mb-4">{isLogin ? "Login" : "Signup"}</h2>
            <form onSubmit={isLogin ? handleLogin : handleSignup}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-black font-bold mb-2">Name</label>
                  <input type="text" id="name" name="name" className="border focus:outline-none text-black border-gray-300 p-2 rounded w-full" required />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-black font-bold mb-2">Email</label>
                <input type="email" id="email" name="email" className="border focus:outline-none text-black border-gray-300 p-2 rounded w-full" required />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-black font-bold mb-2">Password</label>
                <input type="password" id="password" name="password" className="border focus:outline-none text-black border-gray-300 p-2 rounded w-full" required />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-green-800 hover:bg-black text-white font-semibold px-4 py-2 rounded">{isLogin ? "Login" : "Signup"}</button>
                <button type="button" className="text-black hover:text-green-800" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
