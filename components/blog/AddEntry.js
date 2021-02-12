import axios from "axios";
import { useState } from "react"
import Image from 'next/image'
import imageCompression  from "browser-image-compression";
//components
import ThumbnailUpload from './AddEntry_ThumbnailUpload';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData } from '../../actions';
//icons
import { BsTextareaT, BsImages, BsCardImage } from 'react-icons/bs';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';



export default function AddEntry(props) {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userData)

    const [entryName, setEntryName] = useState('');
    const [entryThumbnail, setEntryThumbnail] = useState('');
    const [blogContent, setBlogContent] = useState([]);
    const [editData, setEditData] = useState('');
    const [addCounter, setAddCounter] = useState(0);

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

    const addTextField = () => {
        let newBlogContent = blogContent;
        newBlogContent.push({_id: genId(), type: 'text', content: 'insert text here'});
        setBlogContent(newBlogContent);
        //force re-render
        setAddCounter(addCounter + 1);
    }

    const submitData = () => {
        const payload = {
            userId: userData._id,
            entryId: genId(),
            entryName: entryName,
            entryThumbnail: entryThumbnail,
            entryContent: blogContent
        }
        console.log(payload)
        //get token
        let token = sessionStorage.getItem('token');
        axios.put(`${apiUrl}/api/blog/add`, payload, {
            headers: {
              'auth-token': token
            }
        })
        .then(res => {
            //update local user data
            const entryData = {
                _id: payload.entryId,
                name: payload.entryName,
                thumbnail: payload.entryThumbnail,
                content: payload.entryContent
            }
            let newUserData = userData;
            newUserData.blog.push(entryData);
            dispatch(updateUserData(newUserData));
            //close modal
            props.setFunctionView('')
        })
        .catch(err => {
            console.log(err);
        })
    }

    const addTextToArray = (itemId) => {
        //Update content in blogContent
        let newBlogContent = blogContent;
        let index = newBlogContent.map(item => item._id).indexOf(itemId);
        newBlogContent[index].content = editData;
        setBlogContent(newBlogContent);
        //reset editData
        setEditData('')
    }

    const removeTextField = (itemId) => {
        let newBlogContent = blogContent;
        let filteredBlogContent = newBlogContent.filter(item => item._id !== itemId);
        setBlogContent(filteredBlogContent);
        //force re-render
        setAddCounter(addCounter - 1);
    }


    const addImageField = () => {
        let newBlogContent = blogContent;
        newBlogContent.push({_id: genId(), type: 'image', content: ''});
        setBlogContent(newBlogContent);
        //force re-render
        setAddCounter(addCounter + 1);
    }

    


    return (
        <div className="w-full h-screen flex justify-center items-center fixed top-0 left-0">
            {/* Modal */}
            <div className="w-full h-full absolute flex flex-col justify-between px-5 py-3 rounded bg-white shadow overflow-y-scroll">
                <div>
                    <h1 className="text-center text-3xl">Create new entry</h1>
                    <div className="flex mb-8 justify-between">
                        <div className="flex">
                            {/* Add text button */}
                            <div className="flex items-center mr-4 p-2 rounded-xl bg-blue-400 hover:bg-blue-600 cursor-pointer"
                                onClick={addTextField}>
                                <BsTextareaT className="text-4xl" />
                                <p className="text-2xl">Add text</p>
                            </div>
                            {/* Add image button */}
                            {/* <div className="flex items-center p-2 rounded-xl bg-blue-400 hover:bg-blue-600 cursor-pointer"
                                onClick={addImageField}>
                                <BsImages className="text-4xl" />
                                <p className="text-2xl">Add image</p>
                            </div> */}
                        </div>
                        <GiCancel className="p-2 text-6xl text-red-800 rounded-2xl hover:bg-red-800 hover:text-gray-200" onClick={() => props.setFunctionView('')} />
                    </div>
                    <div className="p-4" style={{border: '1px solid gray'}}>
                        <div>
                            <label className="font-bold text-xl">Title:</label><br/>
                            <input className="w-full p-2 text-2xl" style={{borderBottom: '1px solid gray'}} type="text" placeholder="input title"
                                value={entryName} onChange={(e) => setEntryName(e.target.value)} />
                        </div>
                        <div>
                            <label className="font-bold text-xl">Thumbnail:</label>
                            <ThumbnailUpload entryThumbnail={entryThumbnail} setEntryThumbnail={setEntryThumbnail} />
                        </div>
                    </div>
                    <div className="mt-8">
                        {blogContent.map(item => 
                            item.type == 'text' ?
                            <TextField key={item._id} itemData={item}
                                editData={editData} setEditData={setEditData}
                                removeTextField={removeTextField} addTextToArray={addTextToArray} />
                            :
                            <ImageField key={item._id} itemData={item}
                                blogContent={blogContent} setBlogContent={setBlogContent}
                                editData={editData} setEditData={setEditData}
                                removeTextField={removeTextField} addTextToArray={addTextToArray} />
                        )}
                    </div>
                </div>
                {blogContent.length && blogContent[0].content !== 'insert text here' &&
                <button className="mt-8 p-2 text-2xl rounded-xl text-gray-200 bg-blue-800 hover:bg-blue-600"
                    onClick={submitData} >Confirm</button>
                }
            </div>
        </div>
    )
}

function TextField(props) {
    const [editStatus, setEditStatus] = useState(true)

    return (
        <div className="admin__AddEntry-textfield mb-8">
            {!editStatus ?
                <div>
                    <p className="w-full pt-4 pl-4 text-xl whitespace-pre-line">{props.itemData.content}</p>
                    <div className="admin__AddEntry-textfield-overlay flex mt-4 opacity-25">
                        <FaPencilAlt className="p-2 text-4xl text-green-800 hover:bg-green-800 hover:text-gray-200"
                            onClick={() => {setEditStatus(true); props.setEditData(props.itemData.content)}} />
                        <FaTrashAlt className="p-2 text-4xl text-red-800 hover:bg-red-800 hover:text-gray-200"
                            onClick={() => props.removeTextField(props.itemData._id)} />
                    </div>
                </div>
                :
                <div>
                    <textarea rows={8} className="w-full pt-4 pl-4 text-xl" placeholder="type stuff here" autoFocus
                        value={props.editData} onChange={(e) => props.setEditData(e.target.value)} ></textarea>
                    <div className="flex h-12">
                        <button className="h-full px-2 text-gray-200 focus:outline-none bg-blue-800 hover:bg-blue-600"
                            onClick={() => {props.addTextToArray(props.itemData._id); setEditStatus(false)}} >Submit</button>
                        <GiCancel className="h-full px-2 text-4xl text-red-800 hover:bg-red-800 hover:text-gray-200"
                            onClick={() => setEditStatus(false)} />
                        <FaTrashAlt className="h-full px-2 text-4xl text-red-800 hover:bg-red-800 hover:text-gray-200"
                            onClick={() => props.removeTextField(props.itemData._id)} />
                    </div>
                </div>
            }
        </div>
    )
}



// function ImageField(props) {
    // const [dropStyle, setDropStyle] = useState({borderColor: 'gray'})

    // const dragOver = (e) => {
    //     e.preventDefault();
    //     setDropStyle({borderColor: 'blue'})
    //   }
    //   const dragEnter = (e) => {
    //       e.preventDefault();
    //       setDropStyle({borderColor: 'blue'})
    //   }
    //   const dragLeave = (e) => {
    //       e.preventDefault();
    //       setDropStyle({borderColor: 'gray'})
    //   }
    //   const fileDrop = (e) => {
    //     e.preventDefault();
    //     const image = e.dataTransfer.files[0];
    //     imageCompression(image, {maxSizeMB: 1, maxWidthOrHeight: 1080})
    //     .then(compressedFile => {
    //         console.log(compressedFile)
    //         imageCompression.getDataUrlFromFile(compressedFileDataUrl)
    //         .then(() => {
    //             console.log(compressedFileDataUrl)
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    //   }

      

//     return (
//         <div className="w-full md:w-9/12 xl:w-6/12 h-48 m-auto p-4 border-2 border-dashed rounded bg-gray-50 mt-5 mb-3" style={dropStyle}
//           onDragOver={dragOver}
//           onDragEnter={dragEnter}
//           onDragLeave={dragLeave}
//           onDrop={fileDrop}>
//             <BsCardImage className="text-9xl mx-auto" />
//             <p className="text-center">Drag and drop your image</p>
//         </div>
//     )
// }