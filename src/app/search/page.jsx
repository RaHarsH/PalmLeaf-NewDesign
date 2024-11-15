'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const SearchPage = () => {
  const [searchText, setSearchText] = useState('');
  const [isSearchBtnDisabled, setIsSearchBtnDisabled] = useState(true);

  useEffect(() => {
    setIsSearchBtnDisabled(searchText === '');
  }, [searchText]);

  return (
    <div className='h-screen w-full lg:mx-[350px] flex flex-col justify-center items-center'>
      <h1 className='md:text-5xl text-3xl relative -top-5 md:-top-10 text-black/90'>Search</h1>
      <div className='search-bar-container flex w-full justify-center items-center'>
        <div className='h-36 bg-black/8 flex flex-col w-[80vw] rounded-lg md:w-[700px] border shadow-sm shadow-black/20 border-black/20'>
          <input
            className='text-black focus:outline-none placeholder:text-gray-500 bg-black/5 px-5 py-3 w-[80vw] rounded-tl-lg rounded-tr-lg md:w-[700px]'
            placeholder='Ask anything...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className='w-full flex justify-end px-2 py-2'>
            <Link href={`search/results?query=${searchText}`}>
              <button 
                disabled={isSearchBtnDisabled}
                className={`${isSearchBtnDisabled ? 'bg-black/30' : 'bg-black'} text-white px-3 py-1 rounded-md`}
              >
                Search
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;