const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "files"),  //Go to root folder and create folder files
        filename: (req, file, cb) =>{
            const ext = path.extname(file.originalname) //Take the original file name using api call to the browser
            const name = path.basename(file.originalname, ext); //Set the file name using original file name and the file extension

            cb(null, `${name.replace(/\s/g, "")}-${Date.now()}${ext}`); //Remove the space using REGEX and add date to make the files unique
        }
    })
}