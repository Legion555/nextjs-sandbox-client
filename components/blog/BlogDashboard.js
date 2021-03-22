import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'
//components
import AddEntry from './AddEntry';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateAlbumData, updateUserData } from '../../actions';
//icons
import { BsTrash } from 'react-icons/bs';
import { ImEye } from 'react-icons/im';

export default function BlogDashboard() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData);

    const [functionView, setFunctionView] = useState('');

    //api url
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:3333'
        } else {
        apiUrl = process.env.serverAPI
        }
    
    const deleteEntry = (entryData) => {
        const payload = {
            userId: userData._id,
            entryId: entryData._id
        }
        //get token
        let token = sessionStorage.getItem('token');
        axios.put(`${apiUrl}/api/blog/delete`, payload, {
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
                    onClick={() => setFunctionView('add')}>Create new entry</p>
            </div>
            <div className="grid justify-items-center w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-10">
                {userData.blog.map(entry => 
                    <EntryCard entryData={entry} deleteEntry={deleteEntry} />
                )}
            </div>
            {functionView === 'add' &&
                <AddEntry setFunctionView={setFunctionView} />
            }
        </div>
    )
}

function EntryCard({entryData, deleteEntry}) {
    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <>
        <div className="w-72 h-max flex flex-col justify-between shadow rounded-xl">
            <img src={entryData.thumbnail} alt="" className="w-full h-56 object-cover rounded-xl" />
            <p className="text-center py-2">{entryData.name}</p>
            <div className="flex justify-evenly p-2">
                <Link href="/blog/[id]" as={`/blog/${entryData._id}`}><ImEye className="text-5xl text-blue-600 p-2 rounded-2xl cursor-pointer hover:bg-blue-600 hover:text-white"/></Link>
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
                            onClick={() => deleteEntry(entryData)}>Yes</button>
                        <button className="px-4 py-2 rounded-xl bg-red-800 text-gray-200 hover:bg-red-600"
                            onClick={() => setDeleteModal(false)}>No</button>
                    </div>
                </div>
            </div>
        }
        </>
    )
}