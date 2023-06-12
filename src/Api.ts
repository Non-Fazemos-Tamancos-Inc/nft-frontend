import sha256 from "crypto-js/sha256";
import Cookies from "universal-cookie";
import UserData from "./views/User";

enum Status {
    SUCCESS,
    FAILURE,
    AUTHENTICATION_ERROR,
    NETWORK_ERROR
}

class API {
    static async login(username: string, password: string) {
        let password_hash = sha256(password).toString();

        return fetch('/users/?username=' + username + '&password_hash=' + password_hash)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let found_user = data[0];
                    const cookies = new Cookies();
                    let user = new UserData(found_user.username, found_user.password_hash, found_user.email, found_user.name);

                    if (found_user.profile_img !== null) {
                        user.profile_img = found_user.profile_img;
                    }

                    cookies.set('session', user, {path: '/'});
                    return Status.SUCCESS;
                } else {
                    return Status.AUTHENTICATION_ERROR;
                }
            }).catch(() => {
                return Status.NETWORK_ERROR;
            }).finally(() => {
                return Status.FAILURE;
            });
    }

    static async register(username: string, password: string, email: string, name: string) {
        let password_hash = sha256(password).toString();

        return fetch('/users/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password_hash: password_hash,
                email: email,
                name: name
            })
        });
    }

    static async exists(username: string) {
        return fetch('/users/?username=' + username)
            .then(response => response.json())
            .then(data => {
                return data.length > 0;
            });
    }
}

export default API;
export {
    Status
};