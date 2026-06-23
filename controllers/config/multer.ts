import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import CloudinaryStorage from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = CloudinaryStorage({
  cloudinary,
  folder: 'tupia-manager-produtos',
  allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  public_id: (_req: any, file: any) => file.originalname.split('.')[0] + '-' + Date.now(),
});

const upload = multer({ storage });
export default upload;
