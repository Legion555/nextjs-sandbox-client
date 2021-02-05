import Link from 'next/link'

export default function Nav() {
    return (
        <nav className="w-screen h-12 bg-gray-200">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </nav>
    )
}