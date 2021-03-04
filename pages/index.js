import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
//redux
import { useDispatch, useSelector } from 'react-redux'
import { updateAlbumList } from '../actions'
import { useEffect } from 'react'

export default function Home({albums}) {
  //Get album data
  const dispatch = useDispatch();
  const albumList = useSelector(state => state.albumList);

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
        {albumList.map(album => 
          <AlbumItem albumData={album} key={album._id} /> 
        )}
      </div>
    </div>
  )
}

export const AlbumItem = ({albumData}) => {
  return (
    <Link href="/album/[id]" as={`/album/${albumData._id}`} >
    <div className="home_albumItem relative w-full h-max cursor-pointer">
      <div className="relative w-full h-72">
      {albumData.images &&
        <Image className="home_albumItem_image object-cover" src={albumData.images[0].url} alt={albumData.name} layout='fill' />
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