import { useState } from 'react';
import axios from 'axios';
import { storage } from '../../firebase/firebase';
//components
import AddAlbum from './admin_AddAlbum';
import AlbumView from './admin_AlbumView';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../slices/userDataSlice';
import { updateAlbumData } from '../../slices/albumDataSlice';
//icons
import { BsTrash } from 'react-icons/bs';
import { ImEye } from 'react-icons/im';



export default function AlbumsDashboard() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData.value);
    
    const [albumView, setAlbumView] = useState('');

    //api url
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:3333'
        } else {
        apiUrl = process.env.serverAPI
        }

    const viewAlbum = (albumId) => {
        dispatch(updateAlbumData(userData.albums.filter(album => album._id === albumId)[0]));
        setAlbumView('view');
    }
    
    const deleteAlbum = (albumData) => {
        const payload = {
            userId: userData._id,
            albumId: albumData._id
        }
        //get token
        let token = sessionStorage.getItem('token');
        axios.put(`${apiUrl}/api/albums/delete`, payload, {
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
                //check if any images exist
                if (albumData.images) {
                    albumData.images.forEach(image => {
                        //delete on firebase storage
                        let imageRef = storage.ref(`/images/${image.name}`);
                        imageRef.delete()
                        .then(() => {
                        
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    })
                }
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
        <div className="min-h-screen mt-8">
            <div className="text-center">
                <p className="w-max mx-auto p-2 rounded-xl text-xl bg-green-200 cursor-pointer hover:bg-green-400"
                    onClick={() => setAlbumView('add')}>Create new album</p>
            </div>
            <div className="grid justify-items-center w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-10">
                {userData && userData.albums.map(album => 
                    <Album name={album.name} key={album._id}
                        albumData={album}
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


function Album({albumData, viewAlbum, deleteAlbum}) {
    const [deleteModal, setDeleteModal] = useState(false);
    
    return (
        <>
        <div className="w-72 h-max flex flex-col justify-between shadow rounded-xl">
            <img src={albumData.images && albumData.images[0].url} alt="" className="w-full h-56 object-cover rounded-xl" />
            <p className="text-center py-2">{albumData.name}</p>
            <div className="flex justify-evenly p-2">
                <ImEye className="text-5xl text-blue-600 p-2 rounded-2xl cursor-pointer hover:bg-blue-600 hover:text-white"
                    onClick={() => viewAlbum(albumData._id)} />
                <BsTrash className="text-5xl text-red-600 p-2 rounded-2xl cursor-pointer hover:bg-red-600 hover:text-white"
                    onClick={() => setDeleteModal(true)} />
            </div>
        </div>
        {deleteModal &&
            <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
                <div className="w-full h-full bg-gray-50 bg-opacity-80" onClick={() => setDeleteModal(false)}></div>
                <div className="w-max absolute px-5 py-3 rounded bg-gray-200 shadow">
                    <p className="text-center text-2xl mb-5">Are you sure you want to delete this album?</p>
                    <div className="flex justify-center">
                        <button className="mr-8 px-4 py-2 rounded-xl bg-blue-800 text-gray-200 hover:bg-blue-600"
                            onClick={() => deleteAlbum(albumData)}>Yes</button>
                        <button className="px-4 py-2 rounded-xl bg-red-800 text-gray-200 hover:bg-red-600"
                            onClick={() => setDeleteModal(false)}>No</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}