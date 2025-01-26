import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TriangleAlert } from "lucide-react";

import { addUser } from "../redux/slices/userSlice";

import { BASE_URL } from "../utils/constants";
import ErrorMessage from "../components/ErrorMessage";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const userData = useSelector((store) => store.user);

  const navigate = useNavigate();

  if (userData) {
    return navigate("/");
  }

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
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <div className='card bg-base-300 w-96 shadow-xl'>
        <div className='card-body flex justify-center items-center'>
          <h2 className='card-title'>Welcome back!</h2>
          <p>Login to your account to find your vibe.</p>
          <div className='card-actions w-full'>
            {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Email ID</span>
              </div>
              <input
                type='email'
                placeholder='Email'
                className='input input-bordered w-full max-w-xs'
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className='form-control w-full max-w-xs'>
              <div className='label'>
                <span className='label-text'>Password</span>
              </div>
              <input
                type='text'
                placeholder='Password'
                className='input input-bordered w-full max-w-xs'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              onClick={handleLogin}
              className='btn bg-orange-600 hover:bg-orange-500 text-white w-full mt-6'
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
