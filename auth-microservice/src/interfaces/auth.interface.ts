

interface ICreateAccount {
    email : string
    password : string
    username : string
}


interface ILoginAccount {
    email : string;
    password : string
}


export {
    ICreateAccount,
    ILoginAccount
}