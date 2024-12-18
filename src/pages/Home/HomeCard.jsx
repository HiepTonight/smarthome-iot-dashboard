import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import deleteHome from '../../apis/Homes/DeleteHome';

const HomeCard = ({ home, removeHome, isEditMode }) => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/home/${home.id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteHome(home.id);
      removeHome(home.id);
    } catch (error) {
      console.error('Error deleting home:', error);
    }
  };

  return (
    <div className='flex flex-col relative justify-between gap-4 bg-gray-800 rounded-lg shadow-lg p-5 cursor-pointer transition-transform transform hover:scale-[104%] mt-4' onClick={handleHomeClick}>
      <button
        onClick={handleDelete}
        className={`flex justify-center items-center absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-700 transition-opacity duration-300 ${isEditMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <IoTrashOutline />
      </button>
      <div className='flex justify-between items-center pb-4'>
        <h1 className='text-xl font-semibold text-white'>{home.title}</h1>
        <IoHome className='text-gray-400 text-3xl' />
      </div>
      <div className='flex justify-between items-center text-gray-400'>
        <p>{home.description}</p>
      </div>
    </div>
  );
};

export default HomeCard;