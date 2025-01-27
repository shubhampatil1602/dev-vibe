import { Check, X } from "lucide-react";

const DisplayRequest = ({ request, handleReviewRequest }) => {
  const { about, firstName, lastName, age, gender, photoUrl, skills } =
    request.fromUserId;

  return (
    <div className='rounded-xl p-4 flex md:flex-row items-center gap-4 bg-base-300 shadow-lg'>
      <div className='flex-shrink-0'>
        <img
          src={photoUrl}
          alt='Profile Photo'
          className='sm:w-20 sm:h-20 md:w-28 md:h-28 w-14 h-14 object-cover rounded-full border-2 border-gray-300'
        />
      </div>
      <div className='flex flex-col gap-0.5 flex-1'>
        <h2 className='md:text-lg text-sm font-semibold text-white/90'>
          {firstName} {lastName}
        </h2>
        <p className='sm:text-sm text-xs font-medium text-white/80'>
          {age}, {gender}
        </p>
        {skills.length > 0 && (
          <p className='sm:text-sm text-xs text-white/80'>
            <span className='font-semibold'>Skills:</span> {skills.join(", ")}
          </p>
        )}
        <p className='sm:text-sm text-xs text-white/80'>{about}</p>
      </div>
      <div className='flex gap-2 md:gap-4'>
        <button
          onClick={() => handleReviewRequest("rejected", request._id)}
          className='border hover:bg-opacity-70 border-red-700 bg-red-900 bg-opacity-50 rounded-md md:px-3 px-1.5 md:py-2 py-1'
        >
          <X />
        </button>
        <button
          onClick={() => handleReviewRequest("accepted", request._id)}
          className='border hover:bg-opacity-70 border-green-700 bg-green-900 bg-opacity-50 rounded-md md:px-3 px-1.5 md:py-2 py-1'
        >
          <Check />
        </button>
      </div>
    </div>
  );
};

export default DisplayRequest;
