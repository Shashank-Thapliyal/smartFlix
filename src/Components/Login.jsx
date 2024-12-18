import React, { useRef, useState } from 'react';
import Header from './Header';
import { validateAuth } from '../utils/validateForm';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLoginPage, setisLoginPage] = useState(true);
    const [errMessage, setErrMessage] = useState("");

    const navigate = useNavigate(); //routing 

    const name = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const toggleLogin = (e) => {
        e.preventDefault();
        setisLoginPage(!isLoginPage);
    }

    const handleLoginClick = () =>{
        const {valid,message} = validateAuth(email.current.value, password.current.value)
        if(!valid){
            setErrMessage(message)
            return ;
        } 
        if(!isLoginPage){
            //registratin logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrMessage("Email already Exists")
            });


        }else{
            //login handleLoginClick
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    setErrMessage("User Not Found")
                });

        }
    }


    return (
        <div className='relative'>
            <Header />
            <div>
                <img
                    className='bg-black bg-blend-color-burn absolute bg-gradient-to-b from-black to-gray-50'
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/729ce5c2-d831-436a-8c9d-f38fea0b99b3/web/IN-en-20241209-TRIFECTA-perspective_4aef76eb-7d5b-4be0-93c0-5f67320fd878_large.jpg'
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
                    <button onClick={(e)=>{
                            e.preventDefault()
                            handleLoginClick();
                        }} className='p-3 h-12 rounded-md m-2 text-lg cursor-pointer font-semibold bg-red-800 opacity-100'
                            
                        >
                        {isLoginPage?  "Sign In" : "Register"} 
                        </button> 
                    
                    <p className='text-center'>OR </p>

                    <button className='p-3 cursor-pointer h-12 bg-opacity-80 rounded-md m-2 text-lg bg-gray-500 '>
                        Use a sign-in Code
                    </button>
                </div>
                <div className=' text-center p-2 mx-4 my-2'>
                    <p>Forgot password?</p>
                </div>

                {isLoginPage ?
                    <p className='p-2 mx-4 my-4 text-gray-400 '>New to Netflix? <button className='text-white font-bold' onClick={toggleLogin}>  Sign up Now !</button></p>
                    :
                    <p className='p-2 mx-4 my-4 text-gray-400 '>Already a user? <button className='text-white cursor-pointer font-bold' onClick={toggleLogin}>  Sign In Now !</button></p>
                }
            </form>

        </div>
    );
};

export default Login;
