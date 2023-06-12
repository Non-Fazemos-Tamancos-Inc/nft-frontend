import Cookies from "universal-cookie";

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

function getCurrentUser(): UserData | null {
    const cookies = new Cookies();
    let session = cookies.get("session");

    if (!session) {
        return null;
    } else {
        return session as UserData;
    }
}

export default UserData;
export { getCurrentUser }