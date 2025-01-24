import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Body = () => {
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
