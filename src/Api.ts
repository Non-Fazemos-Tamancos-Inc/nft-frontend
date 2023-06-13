import sha256 from "crypto-js/sha256";
import Cookies from "universal-cookie";
import {UserData, UserWallet} from "./User";
import NFT from "./NFT";

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

                    if (found_user.profile_img) {
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

    static async update_user(username: string | null = null, password: string | null = null, email: string | null = null, name: string | null = null) {
        let password_hash = password ? sha256(password).toString() : null;

        return fetch('/users/?username=' + username, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password_hash: password_hash,
                    email: email,
                    name: name,
                })
            })
            .then(() => {
                return Status.SUCCESS;
            }).catch(
                () => {
                    return Status.NETWORK_ERROR;
                }
            ).finally(
                () => {
                    return Status.FAILURE;
                }
            );
    }

    static async get_nft(id: number) {
        return fetch('/nfts/?id=' + id)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    return data[0] as NFT;
                } else {
                    return null;
                }
            });
    }

    static async get_wallet(username: string) {
        return fetch('/wallets/?owner=' + username)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let wallet: UserWallet = new UserWallet(username);
                    let array: NFT[] = [];
                    var fetches = [];

                    for (let nft_id of data[0].nfts) {
                        fetches.push(
                            this.get_nft(nft_id)
                                .then(res => {
                                    if (res) {
                                        array.push(res);
                                    }
                                })
                        );
                    }

                    return Promise.all(fetches).then(function () {
                        for (let nft of array) {
                            wallet.addNFT(nft);
                        }
                        return wallet;
                    });
                } else {
                    return null;
                }
            });
    }
}

export default API;
export {
    Status
};