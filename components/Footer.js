import React from 'react'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="footer bg-transparent text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center">
                <span>
                    <Image src="/weeknd.jfif" height={50} width={50} alt='logo' className='rounded-full' />
                </span>
                <span className='flex flex-col' >
                    <p>Just a Fun Project made by Mad Max</p>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                </span>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <Link href="https://github.com/MadMax-067" >
                    <FaGithub size={30} />
                </Link>
            </nav>
        </footer>
    )
}

export default Footer
