const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurar almacenamiento con Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "transfers", // Carpeta en tu cuenta de Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => {
      return `receipt-${Date.now()}`;
    },
  },
});

const upload = multer({ storage });

module.exports = { upload, cloudinary };
