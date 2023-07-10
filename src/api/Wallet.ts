import Status from "./Status";

class WalletData {
    owner: string;
    individualNfts: object;
    collections: object;

    constructor(owner: string, individualNfts: object, collections: object) {
        this.owner = owner;
        this.individualNfts = individualNfts;
        this.collections = collections;
    }
}

class Wallet {
    static async addNft(wallet: string, nft: string): Promise<any> {
        const response = await fetch(`'http://localhost:8000/api/wallet/${wallet}/nft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({nft}),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return await response.json();
    }

    static async get(owner: string): Promise<WalletData | Status> {
        try {
            const response = await fetch(`http://localhost:8000/api/wallet/${owner}`);
            if (response.ok) {
                return await response.json() as WalletData;
            } else {
                return Status.AUTHENTICATION_ERROR;
            }
        } catch (err: unknown) {
           return Status.NETWORK_ERROR;
        }
    }

    static async removeNft(wallet: string, nft: string): Promise<any> {
        const response = await fetch(`'http://localhost:8000/api/wallet/${wallet}/nft/${nft}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        return await response.json();
    }
}

export default Wallet;
export {WalletData}