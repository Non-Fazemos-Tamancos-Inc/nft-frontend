class NFT {
    public id: number;
    public owner: string;
    public name: string;
    public price: number;
    public creator: string;
    public description: string;
    public img_path: string;

    constructor(id: number, owner: string, name: string, price: number, creator: string, description: string, img_path: string) {
        this.id = id;
        this.owner = owner;
        this.name = name;
        this.price = price;
        this.creator = creator;
        this.description = description;
        this.img_path = img_path;
    }
}

export default NFT;