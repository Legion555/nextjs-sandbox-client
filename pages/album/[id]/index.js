import {useEffect, useState} from 'react';
import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import {useRouter} from 'next/router';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {updateAlbumList} from '../../../slices/albumListSlice';
//icons
import { BsCardImage } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';



export default function album() {
    const dispatch = useDispatch();
    const router = useRouter();

    const [albumData, setAlbumData] = useState(null);

    const albumId = parseInt(router.query.id, 10);
    const albumList = useSelector(state => state.albumList.value);

    useEffect(() => {
        if (albumList) {
            let tempAlbumData = albumList.filter(album => album._id == albumId)[0];
            setAlbumData(tempAlbumData);
        } else {
            axios.get('/api/albums/getAlbums')
            .then(result => {
                dispatch(updateAlbumList(result.data));
                let tempAlbumData = albumList.filter(album => album._id == albumId)[0];
                setAlbumData(tempAlbumData);
            }).catch(err => console.log(err))
        }
    }, [])

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
                <title>{albumData && albumData.name}</title>
            </Head>
            <h1 className="text-center text-4xl underline">{albumData && albumData.name}</h1>
            {/* Generate images */}
            {albumData &&
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
                    {albumData.images && albumData.images.map(image => 
                        <ImageItem imageData={image} toggleImage={toggleImage} key={image.name} />
                    )}
                </div>
            }
            {imageView &&
                <ImageModal imageData={imageData} toggleImage={toggleImage} />
            }
        </div>
    )
}

export const ImageItem = ({imageData, toggleImage}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    
    return (
        <div className={`home_album_imageItem relative w-full h-72 cursor-pointer ${isLoaded ? 'bg-none animate-none' : 'bg-gray-400 animate-pulse'}`}
            onClick={() => toggleImage(imageData)}>
            <Image className="object-cover" src={imageData.url} alt={imageData.name} layout='fill'
            onLoad={() => setIsLoaded(true)} />
            <div className="home_album_imageItem-overlay hidden h-12 relative bg-gradient-to-b from-gray-800 bg-opacity-75">
                <p className="text-2xl text-white pt-2 pl-2">{imageData.name}</p>
            </div>
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