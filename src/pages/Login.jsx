import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [loading, setLoading] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    };

    function validate() {
        if(!validateEmail(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        return true;
    }

    function handLogin(event) {
        event.preventDefault();

        const isValid = validate();
        if(!isValid) {
            return;
        }

        const loginUser = {
            "email": emailRef.current.value,
            "password": passwordRef.current.value,
        };
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, loginUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if(response.data.message == "success") {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));   
                    navigate("/");
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                }
            })
            .catch(err => {
                console.log(err.response);      
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className='border rounded-md mx-auto border-gray-800 shadow-lg w-1/2 mt-24'>
            <h2 className='text-center text-custom-green text-6xl mb-5 font-extrabold py-5'>Login</h2>
          <form className='flex flex-col items-center py-5'>
            <input ref={emailRef} className='p-3 mb-3 border rounded-md w-1/3  input input-bordered' type="email" placeholder='Enter email...'/>
            <input ref={passwordRef} className='p-3 mb-3 border rounded-md w-1/3  input input-bordered' type="password" placeholder='Enter password...'/>
            <button disabled={loading} onClick={handLogin} className='btn btn-active btn-ghost w-1/3'>{loading ? "Logging in" : "Login"}</button>
            <Link className='mx-auto mt-2 hover:text-green-400' to="/register">Akkaunt yo'qmi? Register</Link>
          </form>
        </div>
    );
}

export default Login;
