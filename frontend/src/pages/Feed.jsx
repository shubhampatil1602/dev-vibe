import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { addFeed } from "../redux/slices/feedSlice";
import { BASE_URL } from "../utils/constants";
import FeedUserCard from "../components/FeedUserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    <>
      {feed && (
        <div className='p-10 flex flex-wrap justify-center items-center gap-10'>
          {feed?.map((user) => (
            <FeedUserCard key={user._id} feed={user} />
          ))}
        </div>
      )}
    </>
  );
};

export default Feed;
