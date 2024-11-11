import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="fixed backdrop-blur-md flex justify-between top-0 left-0 w-full py-5 px-20">
        <h3>logo.co</h3>

        <div className="flex text-sm justify-between items-center gap-8">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Services</a>
          <a href="#">Contact</a>
        </div>
      </nav>
    </>
  )
}

export default Navbar
