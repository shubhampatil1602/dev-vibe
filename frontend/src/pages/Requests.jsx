import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { addRequests, removeRequest } from "../redux/slices/requestsSlice";
import { BASE_URL } from "../utils/constants";
import DisplayRequest from "../components/DisplayRequest";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res.data);
      dispatch(addRequests(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) {
    return (
      <div className='h-[80vh] mb-4 px-6 py-8 flex flex-col justify-center items-center gap-2'>
        <span className='text-base sm:text-xl md:text-2xl text-center font-bold '>
          Looks like you did&apos;t received any requests yet 😔
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
      <h1 className='text-xl md:text-2xl font-bold mb-4'>Pending Requests</h1>
      {requests.length > 0 && (
        <div className='flex flex-col gap-4'>
          {requests.map((request) => (
            <DisplayRequest
              key={request._id}
              request={request}
              handleReviewRequest={handleReviewRequest}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
