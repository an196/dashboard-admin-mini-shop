import React from 'react'
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logo.png';

function Login() {
  return (
    <div className='flex justify-start item-center flex-col  h-screen'>
            <div className='relative w-full h-full'>
                <video src={shareVideo}
                    type='video/mp4'
                    loop
                    controls={false}
                    muted
                    className='w-full h-full object-cover'
                    autoPlay
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width='130px' alt="logo" />
                    </div>
                    
                </div>
            </div>
        </div>
  )
}

export default Login