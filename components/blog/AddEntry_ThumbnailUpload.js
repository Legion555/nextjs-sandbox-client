import { useState } from 'react';
import Image from 'next/image'
import { storage } from '../../firebase/firebase'
import imageCompression  from "browser-image-compression";
//icons
import { BsCardImage } from 'react-icons/bs';

export default function ThumbnailUpload(props) {
    const [uploadStatus, setUploadStatus] = useState('ready');

    const [dropStyle, setDropStyle] = useState({borderColor: 'gray'})

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
        const image = e.dataTransfer.files[0];
        imageCompression(image, {maxSizeMB: 0.5, maxWidthOrHeight: 1080})
        .then(compressedFile => {
            setUploadStatus('uploading');
            //Upload image
            const uploadTask = storage.ref(`/images/${compressedFile.name}`).put(compressedFile)
            uploadTask.on('state_changed',
            (snapShot) => {
                console.log(snapShot)
            }, (err) => {
                console.log(err)
            }, () => {
                storage.ref('images').child(compressedFile.name).getDownloadURL()
                .then(fireBaseUrl => {
                    props.setEntryThumbnail(fireBaseUrl)
                    setUploadStatus('uploaded');
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
      }

    return (
        <div className="w-full mb-8">
            <label className="font-bold text-xl">Thumbnail:</label>
        {uploadStatus === 'ready' &&
            <div className="w-full h-60 p-4 border-2 border-dashed rounded bg-gray-50" style={dropStyle}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}>
                <BsCardImage className="text-9xl mx-auto" />
                <p className="text-center">Drag and drop your image</p>
            </div>
        }
        {uploadStatus === 'uploading' &&
            <div className="w-full h-60 p-4 border-2 border-dashed rounded bg-gray-50">
                <BsCardImage className="text-9xl mx-auto" />
                <p className="text-center">Uploading...</p>
            </div>
        }
        {uploadStatus === 'uploaded' &&
            <div className="relative w-full h-60 p-4 border-2 border-dashed rounded bg-gray-50">
                <Image className="object-cover" src={props.entryThumbnail} alt='thumbnail' layout='fill' />
                <button className="relative p-2 float-right rounded-xl bg-blue-200 opacity-50 hover:opacity-100"
                    onClick={() => setIsUploaded(false)} >Change thumbnail</button>
            </div>
        }
        </div>
    )
}