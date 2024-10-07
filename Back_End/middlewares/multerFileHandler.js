const multer = require('multer');
const path=require("path");
const {makeDirectoryFunction }=require("../functions/functions")

// Multer setup
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let path="";
    if(req.type=='project'){
        if(file?.fieldname=='logo'){
            path = '../uploads/logo'
        }
    }
    await makeDirectoryFunction(path);
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now() + path.extname(file.originalname)}`);
  }
});

// Create the Multer instance
const upload =(type)=>{
    return multer({
        storage,
        // Filter for image files
        fileFilter(req, file, cb){
            req.type=type;
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
              cb(null, true);
            } else {
              cb(new Error('Invalid file type'), false);
            }
        },
        limits: { fileSize: 1024 * 1024 * 5 } // 5MB limit
    });
}

module.exports = upload;
