import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeftCircle } from "lucide-react";
import FeedUserCard from "./FeedUserCard";
import { BASE_URL } from "../utils/constants";
import ErrorMessage from "./ErrorMessage";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/userSlice";

const EditProfile = ({ userData }) => {
  const [profile, setProfile] = useState({
    firstName: userData?.user?.firstName || userData?.firstName,
    lastName: userData?.user?.lastName || userData?.lastName,
    age: userData?.user?.age || userData?.age,
    gender: userData?.user?.gender || userData?.gender,
    about: userData?.user?.about || userData?.about,
    photoUrl: userData?.user?.photoUrl || userData?.photoUrl,
    skills: [],
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { about, age, firstName, gender, lastName, photoUrl } = profile;

  const navigate = useNavigate();

  const handleSaveProfile = async () => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          about,
          age,
          firstName,
          gender,
          lastName,
          photoUrl,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='min-h-[90vh] py-10 flex flex-col md:flex-row gap-10 justify-center items-center'>
      <div className='card bg-base-300 w-[90%] md:w-1/3 shadow-xl'>
        <div className='card-body flex justify-center items-center'>
          <div className='w-full flex items-center mb-3'>
            <button onClick={handleBack}>
              <ArrowLeftCircle />
            </button>
            <h2 className='text-xl font-semibold text-center flex-1'>
              Edit your profile
            </h2>
          </div>

          <div className='card-actions w-full'>
            <div className='md:flex justify-between gap-5 w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>First Name</span>
                </div>
                <input
                  name='firstName'
                  type='text'
                  placeholder='John'
                  className='input input-bordered w-full'
                  value={firstName}
                  onChange={handleChange}
                />
              </label>

              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Last Name</span>
                </div>
                <input
                  name='lastName'
                  type='text'
                  placeholder='Doe'
                  className='input input-bordered w-full'
                  value={lastName}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className='flex justify-between gap-5 w-full'>
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text'>Age</span>
                </div>
                <input
                  name='age'
                  type='number'
                  placeholder='23'
                  min={16}
                  className='input input-bordered w-full'
                  value={age}
                  onChange={handleChange}
                />
              </label>

              <label className='form-control w-full max-w-xs'>
                <div className='label'>
                  <span className='label-text'>Gender</span>
                </div>
                <select
                  name='gender'
                  className='select select-bordered'
                  onChange={handleChange}
                >
                  <option value=''>Select</option>
                  <option value='male'>male</option>
                  <option value='female'>female</option>
                  <option value='others'>others</option>
                </select>
              </label>
            </div>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>About</span>
              </div>
              <textarea
                name='about'
                type='text'
                placeholder='About'
                className='textarea textarea-bordered w-full'
                value={about}
                onChange={handleChange}
              />
            </label>

            <label className='form-control w-full'>
              <div className='label'>
                <span className='label-text'>Photo Url</span>
              </div>
              <input
                name='photoUrl'
                type='text'
                className='input input-bordered w-full'
                value={photoUrl}
                onChange={handleChange}
              />
            </label>

            {error && <ErrorMessage errorMessage={error} />}

            <button
              onClick={handleSaveProfile}
              className='btn bg-orange-600 hover:bg-orange-500 text-white w-full mt-2'
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <div className=''>
        <h2 className='text-2xl font-semibold px-3 mb-2'>Preview</h2>
        <FeedUserCard
          user={{
            firstName,
            lastName,
            age,
            gender,
            about,
            photoUrl,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
