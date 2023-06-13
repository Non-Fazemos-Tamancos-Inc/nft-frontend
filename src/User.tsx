import Cookies from "universal-cookie";
import NFT from "./NFT";

class UserData {
    public name: string;
    public username: string;
    public email: string;
    public password: string;
    public profile_img: string = "/img/default-profile.png"

    constructor(username: string, password: string, email: string = "", name: string = "") {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
    }
}

class UserWallet {
    public username: string;
    public nfts: { [id: number]: NFT } = { };

    constructor(username: string) {
        this.username = username;
    }

    public addNFT(nft: NFT) {
        if (nft.owner === this.username) {
            this.nfts[nft.id] = nft;
        }
    }
}

function getCurrentUser(): UserData | null {
    const cookies = new Cookies();
    let session = cookies.get("session");

    if (!session) {
        return null;
    } else {
        return session as UserData;

    }
}

function logoutUser() {
    const cookies = new Cookies();
    cookies.remove("session");
}

export {UserData, UserWallet, getCurrentUser, logoutUser}