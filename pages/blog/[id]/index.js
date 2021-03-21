import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router';
import {useState} from 'react';
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateAlbumList} from '../../../slices/albumListSlice'
//icons
import { BsCardImage } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';



export default function album({blog}) {
    const router = useRouter();
    const id = parseInt(router.query.id, 10);
    

    //set local albumData
    const entryData = blog.filter(entry => entry._id === id)[0];

    return (
        <div className="w-full md:w-9/12 lg:w-6/12 min-h-screen m-auto pt-24">
            <Head>
                <title>{entryData.name}</title>
                <meta name={entryData.name} content={entryData.name} />
            </Head>
            <div>
              <div className="relative w-full h-80 m-auto">
                <Image className="object-cover" src={entryData.thumbnail} alt="thumbnail" layout="fill" />
              </div>
              <h1 className="max-w-full w-11/12 md:w-9/12 relative bottom-4 m-auto px-2 rounded text-center text-4xl font-bold bg-white">{entryData.name}</h1>
              <div className="w-full m-auto p-4 text-xl">
                <p className="whitespace-pre-line">{entryData.content}</p>
              </div>
            </div>
        </div>
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