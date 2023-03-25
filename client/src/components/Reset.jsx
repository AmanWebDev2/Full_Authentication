import React from 'react';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidation } from '../helper/validate';
import avatar from '../assets/profile.png';

import styles from '../styles/Username.module.css';

const Reset = () => {
  const formik = useFormik({
    initialValues: {
      password: 'admin@123',
      confirm_pwd: 'admin@123'
    },
    validate: resetPasswordValidation,
    // only validate when click on submit button
    validateOnBlur:false,
    validateOnChange: false,
    onSubmit: async (values) => {
      //trim
      console.log(values)
    }

  })
  return (
    <>
    <div className="container mx-auto">

    <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
      <div className={styles.glass}>

        <div className="title flex flex-col items-center">
          <h4 className='text-5xl font-bold'>Reset</h4>
          <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
            Explore More by connecting with us
          </span>
        </div>

        <form className='py-1' onSubmit={formik.handleSubmit}>

          <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('password')} type="password" placeholder='New Password' className={styles.textbox}/>
            <input {...formik.getFieldProps('confirm_pwd')} type="password" placeholder='Repeat Password' className={styles.textbox}/>
            <button  className={styles.btn} type="submit">Reset</button>
          </div>

          <div className="text-center py-4">
            <span className='text-gray-500'>Forgot Password 
            <Link className='text-red-500' to="/recovery"> Recover Now</Link></span>
          </div>
        </form>


      </div>
      </div>
    </div>
    </>
  )
}

export default Reset;