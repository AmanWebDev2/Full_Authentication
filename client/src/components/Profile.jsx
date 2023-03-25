import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';

import { profileValidation } from '../helper/validate';
import avatar from '../assets/profile.png';
import convertToBase64 from '../helper/convert';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';

const Profile = () => {
  const [file,setFile] = useState();

  const formik = useFormik({
    initialValues: {
      firstName:'',
      lastName:'',
      address:'',
      email: 'amanrawat.ar321@gmail.com',
      mobile: '',
      password: 'admin@123',
    },
    validate: profileValidation,
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
      <div className={`${styles.glass} ${extend.glass}`}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Profile</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            You can update the details
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>
          <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
              <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
            </label>
            <input type="file" name="profile" id="profile" onChange={onUpload}/>
          </div>

          <div className="textbox flex flex-col items-center gap-6">
            <div className="name flex w-3/4 gap-10">
            <input {...formik.getFieldProps('firstName')} type="text" placeholder='First Name' className={`${styles.textbox} ${extend.textbox}`}/>
            <input {...formik.getFieldProps('lastName')} type="text" placeholder='Last Name' className={`${styles.textbox} ${extend.textbox}`}/>
            </div>
            <div className="name flex w-3/4 gap-10">
            <input {...formik.getFieldProps('mobile')} type="text" placeholder='Mobile' className={`${styles.textbox} ${extend.textbox}`}/>
            <input {...formik.getFieldProps('email')} type="email" placeholder='Email' className={`${styles.textbox} ${extend.textbox}`}/>
            </div>
            
            <input {...formik.getFieldProps('address')} type="text" placeholder='Address' className={`${styles.textbox} ${extend.textbox}`}/>
            <button  className={styles.btn} type="submit">Sign In</button>
            
           
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500'>come back later?
            <Link className='text-red-500' to="/"> Logout</Link></span>
          </div>
        </form>


      </div>
      </div>
    </div>
    </>
  )
}

export default Profile;