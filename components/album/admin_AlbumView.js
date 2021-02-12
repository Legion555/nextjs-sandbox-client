import axios from "axios";
import { useState } from 'react';
import Upload from './Upload';
import { storage } from '../../firebase/firebase';
import Image from 'next/image'
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, updateAlbumData} from '../../actions';
//icons
import { BsTrash, BsCardImage } from 'react-icons/bs';
import { GiCancel } from 'react-icons/gi';

export default function AddAlbum(props) {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    const albumData = useSelector(state => state.albumData);

    //api url
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:3333'
        } else {
        apiUrl = process.env.serverAPI
        }

    const deleteImage = (imageid, imageName) => {
        const payload = {
            userId: userData._id,
            albumId: albumData._id,
            imageId: imageid
        }
        //get token
        let token = sessionStorage.getItem('token');
        axios.put(`${apiUrl}/api/images/delete`, payload, {
            headers: {
                'auth-token': token
            }
        })
        .then(res => {
            //get token
            let token = sessionStorage.getItem('token');
            //update local user data
            axios.get(`${apiUrl}/api/users`, {
                params: {
                    email: userData.email
                },
                headers: {
                    'auth-token': token
                }
            })
            .then(res => {
                //delete on firebase storage
                let imageRef = storage.ref(`/images/${imageName}`);
                imageRef.delete()
                .then(() => {
                    //set user data
                    dispatch(updateUserData(res.data));
                    //set album data
                    dispatch(updateAlbumData( res.data.albums.filter(album => album._id === albumData._id)[0]))
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0">
            <div className="w-full h-full fixed bg-gray-400 bg-opacity-95" onClick={() => props.setAlbumView('')}></div>
            <div className="w-full md:w-10/12 h-5/6 fixed px-5 py-3 rounded bg-gray-100 shadow overflow-y-scroll">
                <div>
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl text-gray-400">Album name</h1>
                            <div className="w-full h-0.5 bg-gray-400" />
                            <h1 className="text-4xl">{albumData.name}</h1>
                        </div>
                        <GiCancel className="text-3xl text-red-800" onClick={() => props.setAlbumView('')} />
                    </div>
                    <Upload />
                </div>
                <div className="grid w-full h-max justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
                {albumData.images && albumData.images.map(image => 
                    <ImageItem img={image.url} key={image.name} imageId={image._id} imageName={image.name} deleteImage={deleteImage} />
                )}
                </div>
            </div>
        </div>
    )
}

function ImageItem(props) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative h-64 xl:h-80">
            {!isLoaded &&
                <SkeletonImageItem />
            }
            <Image className="object-cover" src={props.img} alt={props.imageName} layout='fill'
                onLoad={() => setIsLoaded(true)} />
            <div className="w-full h-full relative opacity-0 hover:opacity-100">
                <BsTrash className="float-right text-5xl text-red-600 bg-gray-200 mt-2 mr-2 p-2 rounded-xl cursor-pointer hover:bg-red-600 hover:text-gray-200"
                    onClick={() => props.deleteImage(props.imageId, props.imageName)} />
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