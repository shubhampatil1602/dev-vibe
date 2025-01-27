import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addUser } from "../redux/slices/userSlice";

import { BASE_URL } from "../utils/constants";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId || !password) {
      return setErrorMessage("Enter Credentials");
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleRegister = async () => {
    if (!emailId || !password || !firstName || !lastName) {
      return setErrorMessage("Enter Credentials");
    }
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          emailId,
          password,
          firstName,
          lastName,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.user));
      console.log(res);
      return navigate("/profile");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='h-[90vh] bg-base-300 md:bg-base-100 flex justify-center items-center'>
      <div className='card md:bg-base-300 w-full sm:w-2/3 md:w-2/4 lg:w-[430px]'>
        <div className='card-body flex justify-center items-center'>
          <h2 className='card-title'>
            {isLogin ? "Welcome back!" : "Welcome!"}
          </h2>
          <p>Ready to find your vibe?</p>
          <div className='card-actions w-full'>
            {!isLogin && (
              <>
                <label className='form-control w-full'>
                  <div className='label'>
                    <span className='label-text'>First name</span>
                  </div>
                  <input
                    type='text'
                    placeholder='John'
                    className='input input-bordered w-full'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className='form-control w-full'>
                  <div className='label'>
                    <span className='label-text'>Last name</span>
                  </div>
                  <input
                    type='text'
                    placeholder='Doe'
                    className='input input-bordered w-full'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </>
            )}
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Email ID</span>
              </div>
              <input
                type='email'
                placeholder='john01@gmail.com'
                className='input input-bordered w-full'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Password</span>
              </div>
              <input
                type='text'
                className='input input-bordered w-full'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <button
              onClick={isLogin ? handleLogin : handleRegister}
              className='btn bg-orange-600 hover:bg-orange-500 text-white w-full mt-3'
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <div className='flex gap-1 ml-1 mt-2 text-sm font-medium'>
              <span>
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </span>
              <span
                className='cursor-pointer hover:underline text-orange-500'
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register now!" : "Login now!"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
