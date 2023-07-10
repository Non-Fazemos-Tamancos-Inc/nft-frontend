interface NftData {
    name: string;
    hash: string;
    creator: string;
    price: number;
    src: string;
    on_market: boolean;
}

class Nft {
    static async getNfts(): Promise<NftData[]> {
        try {
            const response = await fetch('http://localhost:8000/api/nft/');
            if (!response.ok) {
                throw new Error('Failed to fetch NFTs');
            }
            return response.json();
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async getNft(hash: string): Promise<Nft | null> {
        try {
            const response = await fetch(`http://localhost:8000/api/nft/${hash}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch NFT with hash ${hash}`);
            }
            return await response.json() as Nft;
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async createNft(name: string, creator: string, image: File, price: any): Promise<Nft> {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('creator', creator);
            formData.append('image', image);
            formData.append('price', price);

            const response = await fetch('http://localhost:8000/api/nft/', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to create NFT');
            }
            return response.json();
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }

    static async deleteNft(hash: string): Promise<void> {
        try {
            const response = await fetch(`http://localhost:8000/api/nft/${hash}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete NFT with hash ${hash}`);
            }
        } catch (error: unknown) {
            throw new Error((error as Error).message);
        }
    }
}

export default Nft;
export type { NftData };