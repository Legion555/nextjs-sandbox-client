import Link from 'next/link';
import {useRouter} from 'next/router';

export default function article() {
    const router = useRouter()
    const {id} = router.query

    return (
        <div>
            <h1>Hello world. I am article {id}</h1>
            <Link href="/" >Back to home</Link>
        </div>
    )
}

// export const getStaticProps = async (context) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

//     const article = await res.json()

//     return {
//         props: {
//             article
//         }
//     }
// }

// export const getStaticPaths = async () => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

//     const articles = await res.json()

//     const ids = articles.map(article => article.id)
//     const paths = ids.map(id => ({params: {id: id.toString()}}))

//     return {
//         paths,
//         fallback: false
//     }
// }