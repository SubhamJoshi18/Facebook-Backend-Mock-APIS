
interface IChangePassword {
    password : string
}

interface IFileContent {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype:string,
    destination: string,
    filename: string,
    path: string,
    size: number
  }


export {
    IChangePassword,
    IFileContent
}