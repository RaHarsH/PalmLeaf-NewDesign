import React from 'react'
import SideMenubar from '@/components/SideMenubar'

const layout = ({children}) => {
  return (
    <>
    <div className='flex'>
      <SideMenubar />
      {children}
    </div>
    </>
  )
}

export default layout