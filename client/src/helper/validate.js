import { toast } from "react-hot-toast";

/** validat login page username */
export async function usernameValidate(values) {
    const error = usernameVerify({},values);
    return error;
}

/** validate password */
export async function passwordValidate(values) {
    const error = passwordVerify({},values);
    return error;
}

export async function resetPasswordValidation(values) {
    const error = passwordVerify({},values);

    if(values.password !== values.confirm_pwd) {
        error.exit = toast.error('Password not match...!');
    }

    return error;
}

/** validate register form */
export async function registerValidation(values) {
    const error = usernameVerify({},values);
    passwordVerify(error,values);
    emailVerify(error,values);
    return error;
}

/****************************************************** */

function passwordVerify(error={},values) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if(!values.password) {
        error = toast.error('Password Required...!');
    }else if(values.password.trim().includes(' ')) {
        error.password = toast.error('Wrong Password...!');
    }else if(values.password.trim().length < 4) {
        error.password = toast.error('Passord must be more than 4 character...!');
    }else if(!specialChars.test(values.password)) {
        error.password = toast.error('Password must have a special character...!');
    }

    return error;

}

/** validate username */
function usernameVerify(error={},values) {
    if(!values.username) {
        error.username = toast.error("Username Required...!")
    }else if(values.username.trim().includes(" ")) {
        error.username = toast.error("Invalid username...!");
    }

    return error;
}

/** validate email */
function emailVerify(error={},values) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if(!values.email) {
        error.email = toast.error("Email Required...!");
    }else if(values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!");
    }else if(!emailRegex.test(values.email)) {
        error.email = toast.error("Invalid email address...!");
    };

    return error;
}