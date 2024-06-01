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
    emergencyContact:{
        name:string
        relationship :string ,
        phoneNumber : string,
    },
    emergencyNumber : string,
}

export interface UserAddress {
    _id?:string;
    userId?:string;
    city?:string ;
    country?:string;
    state?:string ;
    province?:string ;
    zipcode?:string ;
    plate?:string ;
    apartment?:string ;
    houseNumber?:string ;
    doorColor?: string ;
    details?:string ;
}
