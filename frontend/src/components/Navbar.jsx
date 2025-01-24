import { useSelector } from "react-redux";

const Navbar = () => {
  // Subscribing to selector
  const userData = useSelector((store) => store.user);
  return (
    <nav className='navbar bg-base-300 px-10'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>DevVibe</a>
      </div>
      {userData && <p className='mr-6'>Hi, {userData?.user?.firstName}!</p>}
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
                src={userData?.user?.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
