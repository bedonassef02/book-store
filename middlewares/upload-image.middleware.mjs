import multer from 'multer';
import sharp from 'sharp';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({storage: storage});

const uploadImage = (req, res, next) => {
    upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(500).json({error: 'Multer Error: ' + err.message});
        } else if (err) {
            // An unknown error occurred when uploading
            return res.status(500).json({error: 'Unknown Error: ' + err.message});
        }

        // Add the image name to req.body
        req.body.image = req.file.filename;

        // Resize the uploaded image using sharp
        try {
            await sharp(req.file.path)
                .resize(800, 600) // Set your desired dimensions here
                .toFile(req.file.path.replace(/\.\w+$/, '.jpg')); // Convert to JPEG (optional)
        } catch (resizeErr) {
            return res.status(500).json({error: 'Error resizing image.'});
        }

        next();
    });
};

export {uploadImage};
