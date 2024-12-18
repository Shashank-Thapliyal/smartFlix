import React from 'react'
import Header from './Header'

const Browse = () => {
  console.log("browse rndred");

  
  return (
    <div className='w-[100vw]'>
      <Header />
      <div className='relative'>
        <img
          className=' h-auto bg-black relative bg-gradient-to-b from-black to-gray-50'
          src='https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg'
          alt='bg'
        />
        <div className='before:absolute before:inset-0 before:bg-black before:opacity-50'></div>
      </div>


    </div>
  )
}

export default Browse