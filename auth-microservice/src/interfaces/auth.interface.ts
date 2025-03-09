

interface ICreateAccount {
    email : string
    password : string
    username : string
}


interface ILoginAccount {
    email : string;
    password : string
}

interface IJWTPayload {
    email : string;
    username : string;
    _id : any;
}


export {
    ICreateAccount,
    ILoginAccount,
    IJWTPayload
}