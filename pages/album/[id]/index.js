import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';
//redux
import {useSelector, useDispatch} from 'react-redux'
import {updateAlbumList} from '../../../actions'

export default function article({albums}) {
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
        <div className="pt-24">
            <h1 className="text-center text-4xl underline">{albumData.name}</h1>
            {/* Generate images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
            {albumData.images.map(image => 
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
    return (
        <div className="home_album_imageItem h-72 cursor-pointer"
            onClick={() => toggleImage(imageData)}>
            <div className="h-full">
                <img src={imageData.url} alt={imageData.name} className="w-full h-full object-cover" />
            </div>
            <div className="home_album_imageItem-overlay hidden h-12 relative bottom-12 bg-gradient-to-t from-gray-800 bg-opacity-75">
                <p className="text-2xl text-white pt-2 pl-2">{imageData.name}</p>
            </div>
        </div>
    )
}

export const ImageModal = ({imageData, toggleImage}) => {
    return (
        <div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen">
            <div className="w-full h-full bg-gray-50 bg-opacity-80"
                onClick={() => toggleImage()}></div>
            <div className="absolute p-5 rounded bg-gray-100 shadow">
                <img className="w-full object-cover" style={{'maxHeight': '75vh'}} src={imageData.url} alt={imageData.name} />
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    let res;
    if (process.env.NODE_ENV === 'development') {
        res = await fetch(`http://localhost:3333/api/albums/?email=legion@gmail.com`)
        } else {
        res = await fetch(`https://nextjs-sandbox-server.herokuapp.com/api/albums/?email=legion@gmail.com`)
        }

    const albums = await res.json()

    return {
        props: {
            albums
        }
    }
}