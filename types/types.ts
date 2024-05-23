export interface UserData {
    _id : string;
    uid : string;
    phoneNumber : string | null;
    email?:string;
    name?:string;
    family?:string;
    avatar?:string;
    bio?:string;
    language?:string[];
}
