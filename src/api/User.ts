import Cookies from "universal-cookie";
import Status from "./Status";


class UserData {
    name: string;
    username: string;
    email: string;

    constructor(username: string, name: string, email: string) {
        this.name = name;
        this.username = username;
        this.email = email;
    }
}


class User {
    static cookies = new Cookies();

    static async getUsers(): Promise<string[]> {
        try {
            const response = await fetch('http://localhost:8000/api/user');
            return await response.json();
        } catch (err: unknown) {
            throw new Error((err as Error).message);
        }
    }

    static async login(username: string, password: string): Promise<Status> {
        try {
            const response = await fetch('http://localhost:8000/api/session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (response.ok) {
                const data = await response.json();
                const { session_id } = data;
                this.cookies.set('session_id', session_id, { path: '/' });

                return Status.SUCCESS;
            } else {
                return Status.AUTHENTICATION_ERROR
            }
        } catch (err: unknown) {
            return Status.NETWORK_ERROR;
        }
    }

    static logout(): void {
        try {
            this.cookies.remove('session_id', { path: '/' });
        } catch (err: unknown) {
            throw new Error((err as Error).message);
        }
    }

    static async register(user: any, password: string): Promise<any> {
        try {
            user.password = password;
            const response = await fetch('http://localhost:8000/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                return Status.SUCCESS;
            } else {
                return Status.UNKNOWN_ERROR;
            }
        } catch (err: unknown) {
            throw new Error((err as Error).message);
        }
    }

    static async getData(): Promise<UserData | Status> {
        try {
            let session_id = this.cookies.get('session_id');
            if (!session_id) {
                return Status.AUTHENTICATION_ERROR
            }

            const response = await fetch('http://localhost:8000/api/session', {
                method: 'GET',
                headers: {session_id: session_id!}
            });

            if (response.ok) {
                const session = await response.json();

                const user = await fetch(`http://localhost:8000/api/user/${session.username}`, {
                    headers: {session_id: session_id!},
                });

                return await user.json() as UserData;
            }
            else {
                return Status.AUTHENTICATION_ERROR;
            }
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async update(username: string, password: string, updatedFields: any): Promise<any> {
        try {
            const response = await fetch(`http://localhost:8000/api/user/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password, ...updatedFields }),
            });
            return await response.json();
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async delete(username: string, password: string): Promise<void> {
        try {
            const response = await fetch(`http://localhost:8000/api/user/${username}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });
            return await response.json();
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }
}

export default User;
export { UserData };