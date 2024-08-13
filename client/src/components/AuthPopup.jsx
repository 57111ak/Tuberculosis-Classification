import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { signup, login } from '../redux/authSlice';
// import { useNavigate } from 'react-router-dom';

const AuthPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [image, setImage] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const authStatus = useSelector((state) => state.auth.status);

//   useEffect(() => {
//     if (authStatus === 'succeeded') {
//       closePopup();
//       navigate('/deeplab');
//     }
//   }, [authStatus, navigate]);

  const openLogin = () => {
    setIsLogin(true);
    setShowPopup(true);
  };

  const openSignup = () => {
    setIsLogin(false);
    setShowPopup(true);
  };

  const closePopup = () => setShowPopup(false);

  const handleOutsideClick = (e) => {
    if (e.target.id === 'auth-popup-container') {
      closePopup();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (image) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', image);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      try {
        await dispatch(signup(formData)).unwrap();
        setImage(null);
      } catch (error) {
        console.error('Signup error:', error);
      }
    } else {
      console.error('Please upload an image.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className="flex items-center  justify-center">
      <div>
        
        <button
          onClick={openLogin}
          className="bg-green-800 hover:bg-black text-white px-3 py-2 rounded mr-4"
        >
          Login
        </button>
        <button
          onClick={openSignup}
          className="bg-green-800 hover:bg-black text-white px-3 py-2 rounded"
        >
          Signup
        </button>
      </div>

      {showPopup && (
        <div
          id="auth-popup-container"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        //   onClick={handleOutsideClick}
        >
          <div
            className=" bg-gray-300 p-8 rounded shadow-lg relative w-full max-w-md"
            // onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-black  hover:text-gray-700"
              onClick={closePopup}
            >
              &times;
            </button>
            <h2 className="text-2xl text-black font-bold mb-4">
              {isLogin ? "Login" : "Signup"}
            </h2>
            <form  onSubmit={isLogin ? handleLogin : handleSignup}>
              {!isLogin && (
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-black font-bold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="border  focus:outline-none text-black border-gray-300 p-2 rounded w-full"
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-black font-bold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border  focus:outline-none text-black border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-black font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border focus:outline-none text-black border-gray-300 p-2 rounded w-full"
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-4">
                  {/* <label
                    htmlFor="image"
                    className="block text-white font-bold mb-2"
                  >
                    Profile Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border border-gray-300 focus:outline-blue-500 p-2 rounded w-full"
                    required
                  /> */}
                </div>
              )}
              <div className="flex  justify-between">
                <button
                  type="submit"
                  className="bg-green-800 hover:bg-black text-white font-semibold px-4 py-2 rounded"
                >
                  {isLogin ? "Login" : "Signup"}
                </button>
                <button
                  type="button"
                  className="text-black  hover:text-green-800"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin
                    ? "Don't have an account? Signup"
                    : "Already have an account? Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPopup;
