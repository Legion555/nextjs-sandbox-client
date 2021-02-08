import Link from 'next/link'
import { useState } from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {FaFacebookF, FaTwitter} from 'react-icons/fa'

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        if (!showMenu) {
            setShowMenu(true)
        } else {
            setShowMenu(false)
        }
    }

    return (
        <nav className="absolute w-screen h-max bg-gray-100 flex justify-between md:justify-evenly content-center p-4">
            <div>
                <p className="p-2">Legion Photography</p>
            </div>
            {/* Screen: Mobile */}
            <div className="block md:hidden">
                <AiOutlineMenu className="p-2 text-4xl" onClick={toggleMenu} />
                {showMenu &&
                    <div className="absolute left-0 mt-4 w-full h-max bg-gray-200">
                        <Link href="/"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200" onClick={toggleMenu}>Home</p></Link>
                        <Link href="/about"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200" onClick={toggleMenu}>About</p></Link>
                        <Link href="/contact"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200" onClick={toggleMenu}>Contact</p></Link>
                        <Link href="/admin"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200" onClick={toggleMenu}>Dashboard</p></Link>
                    </div>
                }
            </div>
            {/* Screen: Tablet+ */}
            <div className="hidden md:flex">
                <Link href="/"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">Home</p></Link>
                <Link href="/about"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">About</p></Link>
                <Link href="/contact"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">Contact</p></Link>
                <Link href="/admin"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">Dashboard</p></Link>
            </div>
            <div className="hidden md:flex">
                <FaFacebookF className="mx-2 p-2 text-4xl cursor-pointer rounded-xl hover:bg-gray-200"/>
                <FaTwitter className="mx-2 p-2 text-4xl cursor-pointer rounded-xl hover:bg-gray-200"/>
            </div>
        </nav>
    )
}