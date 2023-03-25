import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helper/validate';
import avatar from '../assets/profile.png';

import styles from '../styles/Username.module.css';
import convertToBase64 from '../helper/convert';

const Register = () => {
  const [file,setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: 'amanrawat.ar321@gmail.com',
      username: 'example123',
      password: 'admin@123',
    },
    validate: registerValidation,
    // only validate when click on submit button
    validateOnBlur:false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values,{ profile: file || '' });
      console.log(values);
    }
  });
  /** formik does not support file upload */
  const onUpload=async(e)=>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <>
    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Register</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            Happy to join you!
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>
          <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
              <img src={file || avatar} className={styles.profile_img} alt="avatar" />
            </label>
            <input type="file" name="profile" id="profile" onChange={onUpload}/>
          </div>

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('email')} type="password" placeholder='Email*' className={styles.textbox}/>
            <input {...formik.getFieldProps('username')} type="password" placeholder='Username*' className={styles.textbox}/>
            <input {...formik.getFieldProps('password')} type="password" placeholder='Password' className={styles.textbox}/>
            <button  className={styles.btn} type="submit">Sign In</button>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500'>Already Register ?
            <Link className='text-red-500' to="/"> Login Now</Link></span>
          </div>
        </form>


      </div>
      </div>
    </div>
    </>
  )
}

export default Register;