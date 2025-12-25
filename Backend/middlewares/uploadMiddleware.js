import multer from "multer"

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb) =>{
        cb(null,Date.now() + "-" + file.originalname)
    }
});

//file filter only img allowed
const fileFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith("image/")){
        cb(null,true);
    } else{
        cb(new Error("Only img file is allowed"),false);
    }
};

 const upload = multer({
    storage,
    fileFilter,
    limits:{
        fileSize:5 * 1024 * 1024
    }
})

export {upload};