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
    <div className='h-screen lg:mx-[350px] flex flex-col justify-center items-center'>
      <h1 className='md:text-5xl text-3xl relative -top-5 md:-top-10 text-white/45'>Explore Vedas</h1>
      <div className='search-bar-container flex w-full justify-center items-center'>
        <div className='h-36 bg-zinc-950 flex flex-col w-[80vw] rounded-lg md:w-[700px] border shadow-sm shadow-black/20 border-white/25'>
          <input
            className='text-white focus:outline-none placeholder:text-gray-500 bg-black/20 px-5 py-3 w-[80vw] rounded-tl-lg rounded-tr-lg md:w-[700px]'
            placeholder='Ask anything...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className='w-full flex justify-end px-2 py-2'>
            <Link href={`search/searchDetails?query=${searchText}`}>
              <button 
                disabled={isSearchBtnDisabled}
                className={`${isSearchBtnDisabled ? 'bg-white/30' : 'bg-[#27DFB3]'} text-black px-3 py-1 rounded-md mr-2 mt-2`}
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