import { toast } from "react-hot-toast";

/** validat login page username */
export async function usernameValidate(values) {
    const error = usernameVerify({},values);
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