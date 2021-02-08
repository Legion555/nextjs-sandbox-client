import Link from 'next/link'
import {FaFacebookF, FaTwitter} from 'react-icons/fa'

export default function Nav() {
    return (
        <nav className="absolute w-screen h-max bg-gray-100 flex justify-evenly content-center p-4">
            <div>
                <p className="p-2">Legion Photography</p>
            </div>
            <div className="flex">
                <Link href="/"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">Home</p></Link>
                <Link href="/about"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">About</p></Link>
                <Link href="/contact"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">Contact</p></Link>
                <Link href="/admin"><p className="mx-2 p-2 cursor-pointer rounded-xl hover:bg-gray-200">Dashboard</p></Link>
            </div>
            <div className="flex">
                <FaFacebookF className="mx-2 p-2 text-4xl cursor-pointer rounded-xl hover:bg-gray-200"/>
                <FaTwitter className="mx-2 p-2 text-4xl cursor-pointer rounded-xl hover:bg-gray-200"/>
            </div>
        </nav>
    )
}