import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Nav from './Nav';

export default function Signup() {
    const navigate = useNavigate();

    const formikSignUp = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .required('Username is required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            repeatPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Repeat Password is required'),
        }),
        onSubmit: async (values, { setFieldError }) => {
            try {
                const checkEmail = await axios.get(`http://localhost:8000/users?email=${values.email}`);
                if (checkEmail.data.length > 0) {
                    setFieldError('email', 'Email is already taken');
                    return;
                }
                const uid = uuidv4();
                let res = await axios.post("http://localhost:8000/users", {
                    name: values.username,
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.repeatPassword,
                    uid: uid
                });
                console.log('Registration Successful:', res.data);
                localStorage.setItem('uid', uid);
                localStorage.setItem('username', values.username);

                navigate('/log');
            } catch (err) {
                console.error('Error:', err.response?.status || err.message);
            }
        },
    });

    return (
        <>
            <Nav/>

            <div className='signup-body'>
                <form onSubmit={formikSignUp.handleSubmit}>
                    <h1>Sign Up</h1>
                    <label>
                        <input
                            type="text"
                            placeholder="Username"
                            {...formikSignUp.getFieldProps('username')}
                        />
                    </label>
                    {formikSignUp.touched.username && formikSignUp.errors.username ? <p className='error'>{formikSignUp.errors.username}</p> : null}
                    <label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...formikSignUp.getFieldProps('email')}
                        />
                    </label>
                    {formikSignUp.touched.email && formikSignUp.errors.email ? <p className='error'>{formikSignUp.errors.email}</p> : null}
                    <label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...formikSignUp.getFieldProps('password')}
                        />
                    </label>
                    {formikSignUp.touched.password && formikSignUp.errors.password ? <p className='error'>{formikSignUp.errors.password}</p> : null}
                    <label>
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            {...formikSignUp.getFieldProps('repeatPassword')}
                        />
                    </label>
                    {formikSignUp.touched.repeatPassword && formikSignUp.errors.repeatPassword ? <p className='error'>{formikSignUp.errors.repeatPassword}</p> : null}
                    <button type="submit" style={{ marginTop: '9px' }}>Sign Up</button>
                </form>
            </div>
        </>
    );
}


