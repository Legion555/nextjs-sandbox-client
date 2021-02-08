import { useState } from 'react';
import axios from 'axios';
import { storage } from '../firebase/firebase';
//components
import AddAlbum from '../components/admin_AddAlbum';
import AlbumView from '../components/admin_AlbumView';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateAlbumData, updateUserData } from '../actions';
//icons
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import { ImEye } from 'react-icons/im';

export default function Dashboard() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);
    
    const [albumView, setAlbumView] = useState('');

    //api url
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:3333'
        } else {
        apiUrl = 'https://nextjs-sandbox-server.herokuapp.com'
        }

    const viewAlbum = (albumId) => {
        dispatch(updateAlbumData(userData.albums.filter(album => album._id === albumId)[0]));
        setAlbumView('view');
    }
    
    const deleteAlbum = (albumId, albumImages) => {
        const payload = {
            userId: userData._id,
            albumId: albumId
        }
        axios.put(`${apiUrl}/api/albums/delete`, payload)
        .then(res => {
            axios.get(`${apiUrl}/api/users`, {
                params: {
                    email: userData.email
                }
            })
            .then(res => {
                albumImages.forEach(image => {
                    //delete on firebase storage
                    let imageRef = storage.ref(`/images/${image.name}`);
                    imageRef.delete()
                    .then(() => {
                    
                    })
                    .catch(err => {
                        console.log(err);
                    })
                })
                //set user data
                dispatch(updateUserData(res.data));
            })
            .catch(err => {
                console.log("Error: " + err)
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="pt-24">
            <div className="text-center">
                <h1 className="text-6xl mb-5">Albums</h1>
                <p className="w-max mx-auto p-2 rounded-xl text-xl bg-green-200 cursor-pointer hover:bg-green-400"
                    onClick={() => setAlbumView('add')}>Create</p>
            </div>
            <div className="grid justify-items-center w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-10">
                {userData.albums.map(album => 
                    <Album name={album.name} key={album._id}
                        albumId={album._id} albumImages={album.images}
                        thumbnailUrl={album.images && album.images[0] && album.images[0].url}
                        viewAlbum={viewAlbum} deleteAlbum={deleteAlbum} />
                )}
            </div>
            {albumView === 'add' &&
                <AddAlbum setAlbumView={setAlbumView} />
            }
            {albumView === 'view' &&
                <AlbumView setAlbumView={setAlbumView} />
            }
        </div>
    )
}


function Album(props) {
    return (
        <div className="w-72 h-max flex flex-col justify-between shadow rounded-xl">
            <img src={props.thumbnailUrl} alt="" className="w-full h-56 object-cover rounded-xl" />
            <p className="text-center py-2">{props.name}</p>
            <div className="flex justify-evenly p-2">
                <ImEye className="text-5xl text-blue-600 p-2 rounded-2xl cursor-pointer hover:bg-blue-600 hover:text-white"
                    onClick={() => props.viewAlbum(props.albumId)} />
                <BsTrash className="text-5xl text-red-600 p-2 rounded-2xl cursor-pointer hover:bg-red-600 hover:text-white"
                    onClick={() => props.deleteAlbum(props.albumId, props.albumImages)} />
            </div>
        </div>
        
    )
}