import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../redux/actions/LoginAction';

function LoginPage({setIsLoggedIn}) {
    const [gmail, setGmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector((state)=> state.Loginstore)
    const handleLogin = async () => {
        try {
            const response = await axios.post('https://6da5-2405-201-e059-b805-e5d0-6c8c-c766-33be.ngrok-free.app/api/v1/login', {
                email: gmail,
                password: password,
            });


            if (response.status === 200 ) {
                let payload= {
                    email: gmail,
                    password: password,
                }  
                dispatch(LoginAction({gmail,password}))
                // LoginAction(dispatch);
                 setIsLoggedIn(true);
                 Navigate('/fetchdata');
                 console.log(payload);
            }


        
          

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Invalid...",
                text: "Please enter a valid email & Password.!",
            });
        }
    };


    return (
        <div className="login-background">

            <div>
                <h1 className="login-heading form-">Login</h1>
                <input
                    type="text"
                    placeholder="Email"
                    value={gmail}
                    onChange={(e) => setGmail(e.target.value)}
                    className="input-field"
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                />
                <br />
                <button onClick={handleLogin} className="login-button">Login</button>
            </div>
        </div>
    );
}

export default LoginPage;
