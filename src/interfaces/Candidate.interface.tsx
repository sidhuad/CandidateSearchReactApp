// TODO: Create an interface for the Candidate objects returned by the API
export interface User {
    login:string
}

export interface UserData{
    avatar_url?:string;
    name:string;
    id:number;
    login:string;
    location:string;
    email:string;
    company:string;
    bio:string;
}