import axios from "axios";
import { BASE_URL, DEFAULT_AVATAR } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../redux/slices/feedSlice";
import { useLocation } from "react-router-dom";

const FeedUserCard = ({ feed }) => {
  const dispatch = useDispatch();
  const path = useLocation();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(removeFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  const { _id, photoUrl, firstName, lastName, age, gender, about, skills } =
    feed;

  return (
    <div className='card bg-base-300 w-96 min-h-[525px] shadow-xl'>
      <figure>
        <img
          src={photoUrl ? photoUrl : DEFAULT_AVATAR}
          alt='Profile Photo'
          className='rounded-t-xl w-full object-cover h-[300px]'
        />
      </figure>
      <div className='px-4 py-3 h-[225px] flex flex-col justify-between'>
        <h2 className='card-title'>
          {firstName} {lastName} | {age}, {gender}
        </h2>
        {skills && <p className='text-sm'>{skills.join(", ")}</p>}
        <p className='overflow-scroll h-[100px]'>{about}</p>
        <div className='flex justify-center gap-2 items-center'>
          <button
            onClick={() => handleSendRequest("ignored", _id)}
            className={`${
              path.pathname === "/profile" && "opacity-80 pointer-events-none"
            } btn flex-1 bg-purple-800 hover:bg-purple-600 text-white w-36 mt-3`}
          >
            Ignore
          </button>
          <button
            onClick={() => handleSendRequest("interested", _id)}
            className={`${
              path.pathname === "/profile" && "opacity-80 pointer-events-none"
            } btn flex-1 bg-pink-800 hover:bg-pink-600 text-white w-36 mt-3`}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedUserCard;
