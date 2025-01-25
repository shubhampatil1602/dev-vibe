import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { addUser } from "../redux/slices/userSlice";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <Navbar />
      <div className='h-full min-h-[calc(100vh-130px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
