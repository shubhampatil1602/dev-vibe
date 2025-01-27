import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Navbar = () => {
  // Subscribing to selector
  const userData = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className='navbar bg-base-300 px-10'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>DevVibe</a>
      </div>
      {userData && (
        <p className='mr-6'>
          Hi, {userData.firstName || userData.user.firstName}!
        </p>
      )}
      {userData && (
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-10 rounded-full'>
              <img
                alt='Tailwind CSS Navbar component'
                src={userData.photoUrl || userData.user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <Link to='/'>Feed</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <Link to='/connections'>Connections</Link>
            </li>
            <li>
              <Link to='/requests'>Requests</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
