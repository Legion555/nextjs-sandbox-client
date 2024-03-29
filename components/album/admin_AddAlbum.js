import axios from "axios";
import { useState } from "react"
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../slices/userDataSlice';



export default function AddAlbum(props) {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData.value)

    const [albumName, setAlbumName] = useState('');

    //api url
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:3333'
        } else {
        apiUrl = process.env.serverAPI
        }

    const genId = () => {
        return Math.floor(Math.random() * 1000000000)
    }
    

    const createAlbum = (e) => {
        e.preventDefault();
        if (albumName === '') {
            return window.alert('Insert album name');
        }
        const payload = {
            userId: userData._id,
            albumId: genId(),
            albumName: albumName
        }
        //get token
        let token = sessionStorage.getItem('token');
        axios.put(`${apiUrl}/api/albums/create`, payload, {
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
                //set user data
                dispatch(updateUserData(res.data));
                props.setAlbumView('');
            })
            .catch(err => {
                console.log("Error: " + err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center absolute top-0 left-0">
            <div className="w-full h-full bg-gray-50 bg-opacity-80" onClick={() => props.setAlbumView('')}></div>
            <form className="w-max absolute px-5 py-3 rounded bg-gray-200 shadow">
                <h1 className="text-center text-2xl mb-5">Create new album</h1>
                <input className="w-full mb-5 px-2 py-1 rounded" autoFocus
                    type='text' placeholder='album name'
                    value={albumName} onChange={(e) => setAlbumName(e.target.value)} /> 
                <button className="w-max p-2 rounded bg-blue-200 hover:bg-blue-300"
                    onClick={(e) => createAlbum(e)}>Create</button>
            </form>
        </div>
    )
}