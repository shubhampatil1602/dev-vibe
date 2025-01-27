import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../redux/slices/connectionsSlice";
import DisplayConnections from "../components/DisplayConnections";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length <= 0) {
    return (
      <div className='h-[80vh] mb-4 px-6 py-8 flex flex-col justify-center items-center gap-2'>
        <span className='text-base sm:text-xl md:text-2xl text-center font-bold '>
          Looks like you don&apos;t have any connections 😔
        </span>
        <span className='text-sm md:text-lg text-center font-medium'>
          <Link to='/' className='hover:underline'>
            Let&apos;s make new friends
          </Link>{" "}
          ☺️
        </span>
      </div>
    );
  }
  return (
    <div className='p-4 md:p-8'>
      <h1 className='text-xl md:text-2xl font-bold mb-4'>Connections</h1>
      {connections && (
        <div className='flex flex-col gap-4'>
          {connections.map((connection) => (
            <DisplayConnections key={connection._id} connection={connection} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Connections;
