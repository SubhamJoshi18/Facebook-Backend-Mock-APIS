import multer from 'multer'



const multerConfig = {
    destination : (req : any,file : any,cb : any) => {
        cb(null,'uploads/')
    },
    filename : (req:any,file:any,cb:any) => {
        cb(null,Date.now() + '-' + file.originalname)
    }
}


const storage = multer.diskStorage(multerConfig)


export default storage

