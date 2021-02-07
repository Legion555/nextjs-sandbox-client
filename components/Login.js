import { useState } from 'react';
import axios from 'axios';
//redux
import { useDispatch } from 'react-redux';
import { updateUserData, updateIsLoggedIn } from '../actions'



export default function Login() {
    const dispatch = useDispatch();
    
    const [errorHandle, setErrorHandle] = useState([]);
    //Login
    const [loginEmail, setLoginEmail] = useState('legion@gmail.com');
    const [loginPassword, setLoginPassword] = useState('legion123');

    //api url
    let apiUrl;
    if (process.env.NODE_ENV === 'development') {
        apiUrl = 'http://localhost:3333'
      } else {
        apiUrl = 'https://nextjs-sandbox-server.herokuapp.com'
      }

    //Login existing user - pass
    const login = (e, email, password) => {
        e.preventDefault();
        const details = {
            email: email,
            password: password
        }
        axios.post(`${apiUrl}/api/users/login`, details)
        .then(res => {
            if (res.data === 'success') {
                axios.get(`${apiUrl}/api/users`, {
                    params: {
                        email: loginEmail
                    }
                })
                .then(res => {
                    //set user data
                    dispatch(updateUserData(res.data))
                    console.log(res.data)
                    //redirect to dashboard
                    dispatch(updateIsLoggedIn(true))
                })
                .catch(err => {
                    console.log("Error: " + err);
                })
            } else {
                let match = res.data.match(/"([^"]*)"/);
                let error = [];
                switch (match[1]) {
                    case 'email':
                        error = ['login-email', res.data];
                        setErrorHandle(error);
                        setLoginEmail('');
                        break;
                    case 'password':
                        error = ['login-password', res.data];
                        setErrorHandle(error);
                        setLoginPassword('');
                        break;
                    default:
                        console.log('something went wrong...');
                }
            }
            console.log(res.data)
        })
    }



    return (
        <div  className="flex w-screen h-screen justify-center items-center">
            <div className="w-max h-max p-10 bg-gray-50 rounded shadow">
                <h1 className="mb-10 text-center text-4xl">
                    <span className='text-black-400'>Login</span>
                </h1>
                <form className="w-full">
                    <input className="w-full mb-5 p-2 rounded"
                        type="text" required placeholder={errorHandle[0] === 'login-email' ? errorHandle[1] : 'Email'}
                        value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}></input>
                    <input className="w-full mb-5 p-2 rounded"
                        type="password" required placeholder={errorHandle[0] === 'login-password' ? errorHandle[1] : 'Password'}
                        value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}></input>

                    <button className="p-3 bg-blue-300 hover:bg-blue-400 rounded"
                        onClick={(e) => login(e, loginEmail, loginPassword)}>Login</button>
                    {errorHandle === 'registered' &&
                    <p>Successfully registered!<br/>Please login.</p>
                    }
                </form>
            </div>
        </div>
    )
}