
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import "./Signup.css"
import "./An.css"
import Nav from './Nav';



export default function Log() {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const navigatelog = useNavigate();
    const isLoggedIn = Boolean(localStorage.getItem('uid')); 
  
    useEffect(() => {
      if (isLoggedIn) {
        navigatelog('/view/tasks'); 
      }
    }, [isLoggedIn, navigatelog]);

    const formikSignIn = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {
                let res = await axios.get(`http://localhost:8000/users?email=${values.email}`);
                if (res.data.length === 0) {
                    setLoginError('Invalid email address');
                } else {
                    const user = res.data[0];
                    if (user.password !== values.password) {
                        setLoginError('Invalid email or password');
                    } else {
                        setLoginError('');
                        console.log('Login Successful:', user);
                        localStorage.setItem('uid',user.uid);
                        localStorage.setItem('username', user.name);
                        navigate('/view');
                    }
                }

            } 
        
            catch (err) {
                console.error('Error:', err.response?.status || err.message);
            }
        },
    });

    return (
        <>
     <Nav/>
      
        
        <div className='login-body'>
           

           
            <form onSubmit={formikSignIn.handleSubmit}>
                <h1>Sign In</h1>
                <label>
                    <input
                        type="email"
                        placeholder="Email"
                        {...formikSignIn.getFieldProps('email')}
                    />
                </label>
                {formikSignIn.touched.email && formikSignIn.errors.email ? <p className='error'>{formikSignIn.errors.email}</p> : null}
                <label>
                    <input
                        type="password"
                        placeholder="Password"
                        {...formikSignIn.getFieldProps('password')}
                    />
                </label>
                {formikSignIn.touched.password && formikSignIn.errors.password ? <p className='error'>{formikSignIn.errors.password}</p> : null}
                {loginError && <p className='error'>{loginError}</p>}
                
                <button type="submit">Sign In</button>
            </form>
          
        </div>
        </>
    );
}




