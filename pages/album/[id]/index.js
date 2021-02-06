import Link from 'next/link';
import {useRouter} from 'next/router';
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
    const albumData = albums.filter(album => album._id === id)[0]

    return (
        <div className="pt-8">
            <h1 className="text-center text-4xl underline">{albumData.name}</h1>
            {/* Generate images */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-12">
            {albumData.images.map(image => 
                <ImageItem imageData={image} key={image.name} />
            )}
            </div>
        </div>
    )
}

export const ImageItem = ({imageData}) => {
    return (
        <div className="h-max">
            <div className="h-64">
                <img src={imageData.url} alt={imageData.name} className="w-full h-full object-cover" />
            </div>
            <div>
                <p className="text-2xl">{imageData.name}</p>
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