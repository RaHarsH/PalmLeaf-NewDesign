'use client'
import { useSearchParams } from "next/navigation";
import React from 'react';

const SearchDetails = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query');

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <h1 className='md:text-5xl text-3xl text-black/90'>Search Results for:</h1>
      <p className='md:text-3xl text-xl text-gray-700'>{searchTerm}</p>
      
      <div className='mt-5 p-5 border rounded-lg shadow-md bg-gray-100'>
        
        <h2 className='text-2xl font-bold'>Results:</h2>
        
        <ul className='w-[500px]'>
          <li>Result 1 for "{searchTerm}"</li>
        </ul>
      </div>

      <div className='follow-up-search-container flex flex-col justify-start items-start w-[90vw] mx-5 md:w-[700px] my-5 border border-gray-200 rounded-2xl h-28 bg-black/5 absolute bottom-0'>
        <input
        className='w-full h-16 text-black focus:outline-none placeholder:text-gray-500 bg-gray-50 px-5 py-3'
        placeholder='Ask follow up...'
        />
        <button 
            className={`bg-black text-white px-3 py-1 rounded-md absolute right-2 top-[70px]`}
        >
            Search
        </button>
      </div>
    </div>
  );
};

export default SearchDetails;