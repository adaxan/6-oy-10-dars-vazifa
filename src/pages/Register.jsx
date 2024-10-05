import axios, { Axios } from 'axios';
import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const surnameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const rePasswordRef = useRef();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    
      function validatePassword(pw) {

        return /[A-Z]/       .test(pw) &&
               /[a-z]/       .test(pw) &&
               /[0-9]/       .test(pw) &&
               /[^A-Za-z0-9]/.test(pw) &&
               pw.length > 4;
    }

    function validate() {
        if(usernameRef.current.value.length < 3) {
            alert("User is not valid");
            usernameRef.current.focus();
            usernameRef.current.style.outlineColor = "red"
            return false;
        }
        if(surnameRef.current.value.length < 3) {
            alert("Surname is not valid");
            surnameRef.current.focus();
            surnameRef.current.style.outlineColor = "red"
            return false;
        }
        if(!validateEmail(emailRef.current.value)) {
            alert("Email is not valid");
            emailRef.current.focus();
            emailRef.current.style.outlineColor = "red";
            return false;
        }
        if(!validatePassword(passwordRef.current.value)) {
            alert("Password is not valid. It must be at least 5 characters long");
            passwordRef.current.focus();
            passwordRef.current.style.outlineColor = "red";
            return false;
        }
        if(passwordRef.current.value != rePasswordRef.current.value) {
            alert("Passwords do not match!");
            return false;
        }

        return true;
    }

    function handRegister(event) {
        event.preventDefault();

        const isValid = validate()
        if(!isValid) {
            return;
        }

        const registerUser = {
            "email": emailRef.current.value,
            "firstName": usernameRef.current.value,
            "lastName": surnameRef.current.value,
            "password": passwordRef.current.value,
            "confirmPassword": rePasswordRef.current.value
        }
        setLoading(true)
        axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, registerUser, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => {
                if(data.data.message == "Ro'yxatdan muvaffaqiyatli o'tdingiz! Email tasdiqlash uchun havola yuborildi.") {
                    navigate("/login");
                    usernameRef.current.value = '';
                    surnameRef.current.value = '';
                    emailRef.current.value = '';
                    passwordRef.current.value = '';
                    rePasswordRef.current.value = '';
                }
            })
            .catch(err => {console.log(err);})
            .finally(() => {
                setLoading(false)
            })




    }
  return (
    <div className='border rounded-md mx-auto border-gray-800 shadow-lg w-1/2 mt-24'>
        <h2 className='text-center text-custom-green text-6xl mb-5 font-extrabold py-5'>Register</h2>
      <form className='flex flex-col items-center py-5'>
        <input ref={usernameRef} className='p-3 mb-3 border rounded-md w-1/2  input input-bordered' type="text" placeholder='Enter name...'/>
        <input ref={surnameRef} className='p-3 mb-3 border rounded-md w-1/2  input input-bordered' type="text" placeholder='Enter surname...'/>
        <input ref={emailRef} className='p-3 mb-3 border rounded-md w-1/2  input input-bordered' type="email" placeholder='Enter email...'/>
        <input ref={passwordRef} className='p-3 mb-3 border rounded-md w-1/2  input input-bordered' type="password" placeholder='Create password...'/>
        <input ref={rePasswordRef} className='p-3 mb-3 border rounded-md w-1/2  input input-bordered' type="password" placeholder='Confirm password...'/>
        <button disabled={loading} onClick={handRegister} className='btn btn-active btn-ghost w-1/2' >{loading ? "Registering" : "Register"}</button>
        <Link className='mx-auto mt-2 hover:text-green-400' to="/login">Akkaunt bormi? Login</Link>
      </form>
    </div>
  )
}

export default Register
