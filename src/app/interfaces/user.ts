
export interface User {
    id : number;
    username : string;
    email : string;
    firstName :string;
    lastName : string;
    password: string;
    location: string;
    walletAddress:string;
    aboutMe : string;
    address:string;
    phone:string;
    title:string;
    role: number;
    birthday:Date|null;
}
