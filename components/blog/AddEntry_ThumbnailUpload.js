import { useState } from 'react';
import Image from 'next/image'
import { storage } from '../../firebase/firebase'
import imageCompression  from "browser-image-compression";
//icons
import { BsCardImage } from 'react-icons/bs';

export default function ThumbnailUpload(props) {
    const [isUploaded, setIsUploaded] = useState(false);

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
        imageCompression(image, {maxSizeMB: 0.3, maxWidthOrHeight: 1080})
        .then(compressedFile => {
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
                    setIsUploaded(true);
                })
            })
        })
        .catch(err => {
            console.log(err)
        })
      }

    return (
        <div>
        {!isUploaded ?
            <div className="w-full md:w-6/12 xl:w-4/12 2xl:w-3/12 h-60 p-4 border-2 border-dashed rounded bg-gray-50" style={dropStyle}
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}>
                <BsCardImage className="text-9xl mx-auto" />
                <p className="text-center">Drag and drop your image</p>
            </div>
        :
        <div className="relative w-full md:w-6/12 xl:w-4/12 2xl:w-3/12 h-60 p-4 border-2 border-dashed rounded bg-gray-50">
            <Image className="object-cover" src={props.entryThumbnail} alt='thumbnail' layout='fill' />
            <button className="relative p-2 float-right rounded-xl bg-blue-200 opacity-50 hover:opacity-100"
                onClick={() => setIsUploaded(false)} >Change thumbnail</button>
        </div>
        }
        </div>
    )
}