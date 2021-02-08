import { useState } from "react";
import axios from 'axios';
//icons
import {FaFacebookF, FaTwitter} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import {ImPhone} from 'react-icons/im';
//images
import Image from 'next/image'


export default function Contact() {
    const [status, setStatus] = useState('Send message')

    //Form values
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('Enter your name...');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('Enter your email...');
    const [message, setMessage] = useState('');
    const [messageError, setMessageErro] = useState('Enter message...');

    //api url
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:3333'
        } else {
        apiUrl = 'https://nextjs-sandbox-server.herokuapp.com'
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail()) {
            return null
        }
        setStatus('Sending...')
        let payload = {
            name: name,
            email: email,
            message: message
        }
        axios.post(`${apiUrl}/api/emails/contact`, payload, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .then(res => {
            setStatus('Success');
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const validateEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            return true
        }
        setEmailError('Email is invalid')
        setEmail('')
        return false
    }

    return (
        <div className="contact w-full h-screen lg:flex lg:justify-center lg:items-center pt-16">
            <div className="text-gray-200 px-4 py-8">
                <h1 className="text-6xl">Contact me</h1>
                <div className="w-full h-0.5 my-1 bg-gray-300" />
                <p className="mb-12">I want to hear from you.</p>

                <div className="flex items-center mb-8">
                    <ImPhone  className="mr-4 text-2xl" />
                    <p className="text-xl">+12 345 6789</p>
                </div>
                <div className="flex items-center mb-16">
                    <MdEmail className="mr-4 text-2xl" />
                    <p className="text-xl">test@email.com</p>
                </div>
                <div className="flex justify-center">
                    <FaFacebookF className="mr-4 p-2 text-6xl rounded-3xl hover:bg-gray-200 hover:text-blue-800" />
                    <FaTwitter className="mr-4 p-2 text-6xl rounded-3xl hover:bg-gray-200 hover:text-blue-800" />
                </div>
            </div>
            <form className="w-full lg:w-6/12 lg:ml-12 xl:w-4/12 p-10 lg:rounded-xl shadow bg-gray-50" onSubmit={handleSubmit}>
                <label className="font-bold">Your name</label>
                <input className="contact_input w-full mb-8 px-2 py-4 outline-none rounded-xl"
                    type="text" placeholder={nameError} required
                    value={name} onChange={(e) => setName(e.target.value)} />
                <label className="font-bold">Your email</label>
                <input className="contact_input w-full mb-8 px-2 py-4 outline-none rounded-xl"
                    type="text" placeholder={emailError} required
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="font-bold">Message</label>
                <textarea className="contact_input w-full mb-8 px-2 py-2 outline-none rounded-xl bg-gray-100"
                    type="text" placeholder={messageError} required rows='5'
                    value={message} onChange={(e) => setMessage(e.target.value)} />
                <button className="p-4 rounded bg-blue-800 text-white hover:bg-blue-600" type="submit">{status}</button>
            </form>
            
        </div>
    )
}