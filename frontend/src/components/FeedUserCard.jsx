import { DEFAULT_AVATAR } from "../utils/constants";

const FeedUserCard = ({ feed }) => {
  const { photoUrl, firstName, lastName, age, gender, about, skills } = feed;
  console.log(feed);
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
          <button className='btn flex-1 bg-purple-800 hover:bg-purple-600 text-white w-36 mt-3'>
            Ignore
          </button>
          <button className='btn flex-1 bg-pink-800 hover:bg-pink-600 text-white w-36 mt-3'>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedUserCard;
