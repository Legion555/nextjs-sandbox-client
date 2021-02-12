import Head from 'next/head'
import Image from 'next/image'
import {useRouter} from 'next/router';
import {useState} from 'react';
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateAlbumList} from '../../../actions'
//icons
import { BsCardImage } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';



export default function album({albums}) {
    const router = useRouter();
    const id = parseInt(router.query.id, 10);

    //update global albumList
    const dispatch = useDispatch();
    dispatch(updateAlbumList(albums));

    //set local albumData
    const albumData = albums.filter(album => album._id === id)[0];
    console.log(albumData)

    const [imageView, setImageView] = useState(false);
    const [imageData, setImageData] = useState({});

    const toggleImage = (imageData) => {
        if (!imageView) {
            setImageData(imageData);
            setImageView(true);
        } else {
            setImageData({});
            setImageView(false);
        }
    }

    return (
        <div className="min-h-screen pt-24">
            <Head>
                <title>{albumData.name}</title>
                <meta name={albumData.name} content={albumData.name} />
            </Head>
            <h1 className="text-center text-4xl underline">{albumData.name}</h1>
            {/* Generate images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
            {albumData.images && albumData.images.map(image => 
                <ImageItem imageData={image} toggleImage={toggleImage} key={image.name} />
            )}
            </div>
            {imageView &&
                <ImageModal imageData={imageData} toggleImage={toggleImage} />
            }
        </div>
    )
}

export const ImageItem = ({imageData, toggleImage}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    return (
        <div className="home_album_imageItem relative w-full h-72 cursor-pointer"
            onClick={() => toggleImage(imageData)}>
            {!isLoaded &&
                <SkeletonImageItem />
            }
            <Image className="object-cover" src={imageData.url} alt={imageData.name} layout='fill'
                onLoad={() => setIsLoaded(true)} />
            {isLoaded &&
                <div className="home_album_imageItem-overlay hidden h-12 relative bg-gradient-to-b from-gray-800 bg-opacity-75">
                    <p className="text-2xl text-white pt-2 pl-2">{imageData.name}</p>
                </div>
            }
            
        </div>
    )
}

export const SkeletonImageItem = () => {
    return (
        <div className="flex justify-center items-center flex-col w-full h-full bg-gray-200">
            <BsCardImage className="text-6xl" />
            <p>Image is loading...</p>
        </div>
    )
}

export const ImageModal = ({imageData, toggleImage}) => {
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen">
            <div className="w-full h-full bg-gray-50 bg-opacity-80"
                onClick={() => toggleImage()}></div>
            <div className="fixed w-6/12 h-max p-4 rounded bg-gray-100 shadow">
                <div className="flex justify-between mb-4">
                    <h1>{imageData.name}</h1>
                    <GiCancel className="text-3xl text-red-800" onClick={() => toggleImage()} />
                </div>
                <Image className="object-cover" src={imageData.url} alt={imageData.name} width={640} height={360} layout="responsive" />
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    let res;
    if (process.env.NODE_ENV === 'development') {
        res = await fetch(`http://localhost:3333/api/albums/?email=legion@gmail.com`)
        } else {
        res = await fetch(`${process.env.serverAPI}/api/albums/?email=legion@gmail.com`)
        }

    const albums = await res.json()

    return {
        props: {
            albums
        }
    }
}