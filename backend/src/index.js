import express from "express"; // Express framework'ünü projeye dahil eder
import dotenv from "dotenv"; // .env dosyasındaki ortam değişkenlerini kullanmak için
import { clerkMiddleware } from "@clerk/express"; // Clerk kimlik doğrulama middleware’i
import fileUpload from "express-fileupload"; // Dosya yüklemeyi sağlayan middleware
import path from "path"; // Dosya ve dizin yollarını yönetmek için Node modülü
import cors from "cors";

// Route dosyalarını içe aktarıyor
import adminRoutes from "./routes/admin.route.js"; // Adminle ilgili API rotaları
import userRoutes from "./routes/user.route.js"; // Kullanıcıyla ilgili API rotaları
import authRoutes from "./routes/auth.route.js"; // Kimlik doğrulama rotaları
import songRoutes from "./routes/song.route.js"; // Şarkılarla ilgili API rotaları
import albumRoutes from "./routes/album.routes.js"; // Albümlerle ilgili API rotaları
import statRoutes from "./routes/stat.route.js"; // İstatistiklerle ilgili API rotaları
import { connectDB } from "./lib/db.js"; // Veritabanı bağlantı fonksiyonu

dotenv.config(); // .env dosyasındaki değişkenleri process.env’ye yükler

const __dirname = path.resolve(); // Proje dizininin yolunu alır
const app = express(); // Express uygulamasını başlatır
const PORT = process.env.PORT; // Ortam değişkeninden port numarasını alır
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json()); // Gelen isteklerde JSON body'leri işleyebilmek için
app.use(clerkMiddleware()); // Clerk kimlik doğrulamasını global olarak uygular

app.use(
  fileUpload({
    useTempFiles: true, // Dosyaları geçici olarak depolar
    tempFileDir: path.join(__dirname, "tmp"), // Geçici dosyalar için klasör
    createParentPath: true, // Eksik klasörleri otomatik oluşturur
    limits: {
      fileSize: 10 * 1024 * 1024, // Maksimum dosya boyutu: 10MB
    },
  })
);

// API endpoint'lerini ilgili route dosyalarına yönlendiriyor
app.use("/api/users", userRoutes); // Kullanıcı API’lerini bu route’a yönlendir
app.use("/api/auth", authRoutes); // Kimlik doğrulama API’lerini bu route’a yönlendir
app.use("/api/admin", adminRoutes); // Admin API’lerini bu route’a yönlendir
app.use("/api/songs", songRoutes); // Şarkı API’lerini bu route’a yönlendir
app.use("/api/albums", albumRoutes); // Albüm API’lerini bu route’a yönlendir
app.use("/api/stats", statRoutes); // İstatistik API’lerini bu route’a yönlendir

// Hata yönetimi middleware’i
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error" // Prod ortamında genel mesaj döner
        : err.message, // Geliştirme ortamında hata mesajını gösterir
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT); // Sunucu başlatıldığında terminale mesaj yazdırır
  connectDB(); // Veritabanına bağlanır
});
