import multer from "multer";

const storage = multer.diskStorage({
    destination: function (reqest, file, cb) {
        cb(null, './public/temp');
    },
    filename: function (request, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.originalname + '-' + uniqueSuffix);
    }
});

export const upload = multer({ storage: storage });