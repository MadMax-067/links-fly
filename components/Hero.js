import React from 'react'
import Shorten from './Shorten'

const Hero = () => {
    return (
        <div className="flex flex-col justify-center gap-6 my-20">
            <div className='w-full flex flex-col gap-3 justify-center items-center'>
                <div className='flex justify-center items-center' >
                    <img className='w-11 h-11' src="/URL.gif" />
                    <h1 className='font-bold sm:text-lg text-[1.75rem] md:text-5xl' >Reimagine Link Sharing</h1>
                </div>
                <h2 className='text-center  md:text-xl w-[75%] ' >Fly Links simplifies your digital strategy by shortening URLs quickly and effortlessly.</h2>
            </div>
            <Shorten />
        </div>
    )
}

export default Hero
