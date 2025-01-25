const FeedUserCard = ({ feed }) => {
  return (
    <div className='card bg-base-300 w-96 shadow-xl'>
      <figure className='px-2 pt-2'>
        <img
          src={feed[1]?.photoUrl}
          alt='Shoes'
          className='rounded-xl w-full object-cover h-56'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>
          {feed[1]?.firstName} {feed[1]?.lastName} | {feed[1]?.age},{" "}
          {feed[1]?.gender}
        </h2>
        <p>{feed[1]?.about}</p>
        <div className='flex justify-between itenms-center'>
          <button className='btn bg-red-800 hover:bg-red-600 text-white w-36 mt-3'>
            Ignore
          </button>
          <button className='btn bg-green-800 hover:bg-green-600 text-white w-36 mt-3'>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedUserCard;
