import axios from 'axios';
import { useState } from 'react';
import { storage } from '../firebase/firebase'
import 'firebase/storage';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, updateAlbumData } from '../actions'
//icons
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsCardImage } from 'react-icons/bs';



const genId = () => {
  return Math.floor(Math.random() * 1000000);
}

export default function Upload() {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.userData);
  const albumData = useSelector(state => state.albumData);
  const [view, setView] = useState('upload');

  const [imageAsFile, setImageAsFile] = useState('');

  const [dropStyle, setDropStyle] = useState({borderColor: 'gray'})

  //api url
  let apiUrl;
  if (process.env.NODE_ENV === 'development') {
      apiUrl = 'http://localhost:3333'
    } else {
      apiUrl = process.env.serverAPI
    }

  const handleImageAsFile = (e) => {
    const image = e.target.files;
    let newArray = Object.values(image)
    setImageAsFile(newArray);
  }

  //Client-Firebase
  const handleFirebaseUpload = e => {
    e.preventDefault();
    imageAsFile.forEach(image => {
      console.log('start of upload');
      if(image === '') {
        return console.error('Not an image');
      }
      console.log(imageAsFile[0]);
      setView('uploading');
      //Upload image
      const uploadTask = storage.ref(`/images/${image.name}`).put(image)
      uploadTask.on('state_changed',
      (snapShot) => {
        // console.log(snapShot)
      }, (err) => {
        console.log(err)
      }, () => {
        storage.ref('images').child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
          image.imgUrl = fireBaseUrl;
          addImage(image);
          setView('uploaded');
        })
      })
    })
  }
  
  //Client-MongoDB
  const addImage = (imageData) => {
    const payload = {
        userId: userData._id,
        albumId: albumData._id,
        _id: genId(),
        name: imageData.name,
        url: imageData.imgUrl
    }
    console.log(payload)
    axios.put(`${apiUrl}/api/images/add`, payload)
    .then(res => {
        console.log(res)
        //update local user data
        axios.get(`${apiUrl}/api/users`, {
            params: {
                email: userData.email
            }
        })
        .then(res => {
            //set user data
            dispatch(updateUserData(res.data));
            dispatch(updateAlbumData(res.data.albums.filter(album => album._id === albumData._id)[0]));
        })
        .catch(err => {
            console.log("Error: " + err);
        })
    })
    .catch(err => {
        console.log(err);
    })
  }
  
  //Drag to uplaod
  const dragOver = (e) => {
    e.preventDefault();
    setDropStyle({borderColor: 'blue'})
  }
  const dragEnter = (e) => {
      e.preventDefault();
      setDropStyle({borderColor: 'blue'})
  }
  const dragLeave = (e) => {
      e.preventDefault();
      setDropStyle({borderColor: 'gray'})
  }
  const fileDrop = (e) => {
    e.preventDefault();
    const image = e.dataTransfer.files;
    let newArray = Object.values(image)

    newArray.forEach(image => {
      if(image === '') {
        return console.error('Not an image');
      }
      console.log('start of upload');
      setView('uploading');
      //Upload image
      const uploadTask = storage.ref(`/images/${image.name}`).put(image)
      uploadTask.on('state_changed',
      (snapShot) => {
        console.log(snapShot)
      }, (err) => {
        console.log(err)
      }, () => {
        storage.ref('images').child(image.name).getDownloadURL()
        .then(fireBaseUrl => {
          image.imgUrl = fireBaseUrl;
          addImage(image);
          setView('uploaded');
        })
      })
    })
  }
  
  const reset = () => {
    setView('upload');
    setImageAsFile('');
  }

  return (
    <div className="flex mt-10 justify-center">
      {view === 'upload' &&
      <div className="w-80 p-4 rounded shadow">
        <h1 className="text-center text-3xl">Upload your images</h1>
        <p className="text-center">Files should be in image format</p>
        <div className="h-48 p-4 border-2 border-dashed rounded bg-gray-50 mt-5 mb-3" style={dropStyle}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={fileDrop}>
            <BsCardImage className="text-9xl mx-auto" />
            <p className="text-center">Drag and drop your images here</p>
        </div>
        <p className="text-center text-2xl mb-3">or</p>
        <form className="flex flex-col">
          <input className="mb-5 bg-gray-100 rounded" type='file' onChange={handleImageAsFile} multiple />
          <button className="w-max mx-auto px-5 py-2 rounded bg-blue-100 hover:bg-blue-300" onClick={handleFirebaseUpload}>Upload</button>
        </form>
      </div>
      }
      {view === 'uploading' &&
      <div className="w-80 p-4 rounded shadow">
        <p className="text-center mb-6">Uploading...</p>
        <div className="w-60 h-2 mx-auto rounded bg-gray-200">
            <div className="progbar relative w-8 h-full rounded bg-blue-400"></div>
        </div>
      </div>
      }
      {view === 'uploaded' &&
      <div className="w-80 p-4 rounded shadow">
        <AiOutlineCheckCircle className="mx-auto text-5xl text-green-400" />
        <h1 className="text-center text-xl">Uploaded successfully</h1>
        <p className="w-max mx-auto mt-10 p-4 rounded-xl bg-green-100 cursor-pointer hover:bg-green-300"
            onClick={reset}>Upload more images</p>
      </div>
      }
    </div>
  );
}