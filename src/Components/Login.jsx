import React, { useRef, useState } from 'react';
import Header from './Header';
import { validateAuth } from '../utils/validateForm';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BANNER_IMG } from '../utils/constants';

const Login = () => {
    const [isLoginPage, setisLoginPage] = useState(true);
    const [errMessage, setErrMessage] = useState("");

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const toggleLogin = (e) => {
        e.preventDefault();
        setisLoginPage(!isLoginPage);
    }

    const handleLoginClick = () => {
        const { valid, message } = validateAuth(email.current.value, password.current.value)
        if (!valid) {
            setErrMessage(message)
            return;
        }
        if (!isLoginPage) {
            //registratin logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: "",
                    }).then(() => {
                        const { uid, email, displayName } = user;
                        dispatch(addUser({ uid, email, displayName }));
                    }).catch((error) => {
                        setErrMessage(error.message);
                    });
                    navigate("/browse");
                })
                .catch((error) => {
                   error? setErrMessage("Email already exists") : setErrMessage("")
                });



        } else {
            //login handleLoginClick
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate("/browse")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrMessage("User Not Found", errorCode, errorMessage)
                });

        }
    }


    return (
        <div className='relative'>
            <Header />
            <div>
                <img
                    className='bg-black bg-blend-color-burn absolute bg-gradient-to-b from-black to-gray-50'
                    src={BANNER_IMG}
                    alt='bg'
                />
            </div>

            <form className='absolute bg-black mt-24  w-[33vw] bg-opacity-85 rounded-lg shadow-lg transform -translate-x-1/2 top-1/2 left-1/2 flex flex-col text-white'>
                <h2 className='text-white text-4xl p-4 m-2 font-bold'>Sign In</h2>
                <div className='flex flex-col p-2 m-4 '>
                    {
                        !isLoginPage && <input
                            ref={name}
                            className='p-3 rounded-sm m-2 opacity-80 bg-gray-600 text-white'
                            type='text'
                            placeholder='Full Name'
                        />
                    }
                    <input
                        ref={email}
                        className='p-3 rounded-sm m-2 opacity-80 bg-gray-600 text-white'
                        type='email'
                        placeholder='Email Address'

                    />
                    <input
                        ref={password}
                        className='p-3 opacity-80 rounded-sm m-2 bg-gray-600 text-white'
                        type='password'
                        placeholder='Password'
                    />
                    <p className='text-red-700 m-3'>{errMessage}</p>
                    <button onClick={(e) => {
                        e.preventDefault()
                        handleLoginClick();
                    }} className='p-3 h-12 rounded-md m-2 text-lg cursor-pointer font-semibold bg-red-800 opacity-100'

                    >
                        {isLoginPage ? "Sign In" : "Register"}
                    </button>
                </div>
                <div className=' text-center p-2 mx-4 my-2'>
                    <p>Forgot password?</p>
                </div>

                {isLoginPage ?
                    <p className='p-2 mx-4 my-4 text-gray-400 '>New Here ? <button className='text-white font-bold' onClick={toggleLogin}>  Sign up Now !</button></p>
                    :
                    <p className='p-2 mx-4 my-4 text-gray-400 '>Already a user? <button className='text-white cursor-pointer font-bold' onClick={toggleLogin}>  Sign In Now !</button></p>
                }
            </form>

        </div>
    );
};

export default Login;
