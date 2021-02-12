import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { updateAlbumList } from '../actions'

export default function Home({blog}) {
  //Get album data
//   const dispatch = useDispatch();
//   dispatch(updateAlbumList(albums));
//   const albumList = useSelector(state => state.albumList);

  return (
    <div className="min-h-screen w-full pt-12">
      <Head>
        <title>Legion Photography</title>
        <meta name="Gallery" content='gallery' />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
        {blog.map(entry => 
          <EntryCard key={entry._id} entryData={entry} />
        )}
      </div>
    </div>
  )
}

export const EntryCard = ({entryData}) => {
  return (
    <Link href="/blog/[id]" as={`/blog/${entryData._id}`} >
    <div className="home_albumItem relative w-full h-max cursor-pointer">
      <div className="relative w-full h-72">
      {entryData.thumbnail &&
        <Image className="home_albumItem_image object-cover" src={entryData.thumbnail} alt={entryData.name} layout='fill' />
      }
      </div>
      <div className="w-max">
        <p className="text-2xl">{entryData.name}</p>
        <div className="w-full h-0.5 bg-gray-300" />
      </div>
    </div>
    </Link>
  )
}

export async function getServerSideProps(context) {
  let res;
  if (process.env.NODE_ENV === 'development') {
      res = await fetch(`http://localhost:3333/api/blog/?email=legion@gmail.com`)
    } else {
      res = await fetch(`${process.env.serverAPI}/api/blog/?email=legion@gmail.com`)
    }
  const blog = await res.json()

  if (!blog) {
    return {
      notFound: true,
    }
  }
  
  return {
    props: {
      blog
    }
  }
}