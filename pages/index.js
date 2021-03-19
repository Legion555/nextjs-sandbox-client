import { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { updateAlbumList } from '../slices/albumListSlice'



export default function Home({albums}) {
  //Get album data
  const dispatch = useDispatch();
  const albumList = useSelector(state => state.albumList.value);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      axios.get('http://localhost:3333/api/albums/?email=legion@gmail.com')
      .then(result => {
        dispatch(updateAlbumList(result.data));
      }).catch(err => console.log(err))
    } else {
      axios.get(`${process.env.serverAPI}/api/albums/?email=legion@gmail.com`)
      .then(result => {
        dispatch(updateAlbumList(result.data));
      }).catch(err => console.log(err))
    }
  }, [])
  
  return (
    <div className="min-h-screen w-full pt-12">
      <Head>
        <title>Legion Photography</title>
        <meta name="Gallery" content='gallery' />
      </Head>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
        {albumList ?
          albumList.map(album => 
            <AlbumItem albumData={album} key={album._id} /> 
          )
        :
        <>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </>
        }
      </div>
    </div>
  )
}

export const AlbumItem = ({albumData}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link href="/album/[id]" as={`/album/${albumData._id}`} >
    <div className="home_albumItem relative w-full h-max cursor-pointer">
      <div className={`relative w-full h-72 bg-gray-400 ${isLoaded ? 'animate-none' : 'animate-pulse'}`}>
      {albumData.images &&
        <Image className="home_albumItem_image object-cover" src={albumData.images[0].url} alt={albumData.name} layout='fill' onLoad={() => setIsLoaded(true)} />
      }
      </div>
      <div className="w-max">
        <p className="text-2xl">{albumData.name}</p>
        <div className="w-full h-0.5 bg-gray-300" />
      </div>
    </div>
    </Link>
  )
}

export const SkeletonCard = () => {
  return (
    <div className="w-full p-4 bg-gray-400 animate-pulse">
      <div className="relative w-full h-64 bg-gray-600" />
      <div className="w-max pt-4">
        <p className="w-64 h-8 bg-gray-600"></p>
      </div>
    </div>
  )
}

// export async function getServerSideProps(context) {
//   let res;
//   if (process.env.NODE_ENV === 'development') {
//       res = await fetch(`http://localhost:3333/api/albums/?email=legion@gmail.com`)
//     } else {
//       res = await fetch(`${process.env.serverAPI}/api/albums/?email=legion@gmail.com`)
//     }
//   const albums = await res.json()

//   if (!albums) {
//     return {
//       notFound: true,
//     }
//   }
  
//   return {
//     props: {
//       albums
//     }
//   }
// }