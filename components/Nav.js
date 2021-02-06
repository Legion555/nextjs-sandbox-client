import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="w-screen h-max flex justify-evenly content-center p-4">
            <div>
                <a href="#">Logo</a>
            </div>
            <div className="flex">
                <Link href="/"><p className="mx-2">Home</p></Link>
                <Link href="/about"><p className="mx-2">About</p></Link>
                <Link href="/blog"><p className="mx-2">Blog</p></Link>
                <Link href="/dashboard"><p className="mx-2">Dashboard</p></Link>
            </div>
            <div>
                <a href="#">Socials</a>
            </div>
        </nav>
    )
}