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

  if (!feed) {
    return;
  }

  if (feed.length <= 0) {
    return (
      <div className='h-[80vh] flex items-center justify-center'>
        <span className='text-xl md:text-2xl font-bold'>
          No more profiles to show!
        </span>
      </div>
    );
  }

  return (
    <div className='p-10 flex flex-wrap justify-center items-center gap-10'>
      <FeedUserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
