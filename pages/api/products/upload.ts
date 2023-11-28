import fs from "fs";
import multer from "multer";
import type { NextApiHandler } from "next";

const uploadDir = "./public/uploads/products";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("fotoFile");

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadHandler: NextApiHandler = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Upload error", error: err.message });
    }
    res
      .status(200)
      .json({ message: "File uploaded successfully", file: req.file });
  });
};

export default uploadHandler;
