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