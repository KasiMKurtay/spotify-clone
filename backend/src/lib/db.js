import { log } from "console";
import mongoose from "mongoose"; // veritabanına bağlanma

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI); //MONGODB_URI, .env dosyasındaki MongoDB bağlantı URI'sini alır
    console.log(`Connected to MongoDB ${conn.connection.host}`);
    //Bağlantı başarılıysa, veritabanı bağlantı host bilgilisin konsola yazdırır
  } catch (error) {
    console.log("Failed to coonect to MongoDB", error);
    process.exit(1); //1 hata mesajı , 0 doğru
  }
};
