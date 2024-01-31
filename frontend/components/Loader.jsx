import React from 'react'

const Loader = () => {
    return (
        <div className='fixed top-0 left-0 flex justify-center items-center min-h-screen min-w-[100vw] bg-gray-500/50 z-10'>
            <span className="loader"></span>
        </div>
    )
}

export default Loader