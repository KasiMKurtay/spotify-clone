import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();
//Projeye .env dosyasını dahil eder

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, //Cloudinary hesabının adı
  api_key: process.env.CLOUDINARY_API_KEY, ///Cloudinary hesabının API anahtarları
  api_secret: process.env.CLOUDINARY_API_SECRET, //Cloudinary hesabının API anahtarları
});

export default cloudinary;
