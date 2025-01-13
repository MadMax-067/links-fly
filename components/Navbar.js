import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <Link href="/" className="btn btn-ghost text-xl">
                    <span className='w-8' ><img src="/URL.gif" /></span>
                    <span>Fly Links</span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar
