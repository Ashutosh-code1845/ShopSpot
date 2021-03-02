import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

//1. initializing storage engine i.e multer.diskStorage
//2. destination sets the folder where files needs to be get uploaded
//3. filename gets us the filename and we want file extension not to be of one type
//   so we get it by using path
//4. null passed in function is error value and cb stands for call backs here

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "upload/profilepicture/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.filename}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//Below function is to check whether given file is an of image extension

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!! ");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/profile/upload", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
