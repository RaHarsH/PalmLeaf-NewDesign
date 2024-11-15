import React from 'react'

const SideMenubar = () => {
  return (
    <>
        <div className="sidebar-container hidden lg:flex flex-col w-[250px] h-screen bg-zinc-200/50 px-4 fixed mt-[64.8px] ">
            <div className='flex justify-center mb-5 items-center cursor-pointer mt-5 px-5 py-2 bg-black/80 text-white shadow-md shadow-black/7 rounded-md'>
                <h2>New Chat +</h2>
            </div><div className='search-history-container overflow-scroll no-scrollbar flex flex-col justify-center items-center gap-5'>
                <div>
                    <p>Search history goes here</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
                <div className='flex justify-center items-center cursor-pointer w-full px-2 py-2 bg-white/95 text-black shadow-md shadow-black/7 rounded-md'>
                    <p>Previous chats</p>
                </div>
            </div>
        </div>

        {/* Hamburger menu to toggle the sidemenu bar on smaller devices like mobile phones */}
        <div className='flex lg:hidden flex-col mt-20 relative left-5 cursor-pointer gap-2'>
            <span className='w-7 h-[1.5px] bg-black'></span>
            <span className='w-5 h-[1.5px] bg-black'></span>
        </div>
    </>
  )
}

export default SideMenubar