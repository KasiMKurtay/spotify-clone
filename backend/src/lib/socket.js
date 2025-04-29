import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

export const initializeSocket = (server) => {
  // Socket sunucusunu baslatır
  const io = new Server(server, {
    // Socket sunucusunu olusturur
    cors: {
      // CORS ayarlarını ayarlar
      origin: "http://localhost:3000", // Sadece belirli bir URL'de istekleri kabul eder
      credentials: true, // Kimlik dogrulama isteklerini kabul eder
    },
  });

  const userSockets = new Map(); // Kullanıcılar icin socket map
  const userActivities = new Map(); // Kullanıcılar icin aktifliği map

  io.on("connection", (socket) => {
    // Kullanıcılar arasındaki baglantıyı dinler
    socket.on("user_connected", (userId) => {
      //
      userSockets.set(userId, socket.id); // Kullanıcının socket ID'sini map'e ekler
      userActivities.set(userId, "Idle"); // Kullanıcının aktiflik durumunu map'e ekler

      // Belirli bir ID'ye sahip kullancının oturum açtığını belirtir
      io.emit("user_connected", userId);

      socket.emit("users_online", Array.from(userSockets.keys())); // Aktif kullanıcıların listesini gonderir

      io.emit("activities", Array.from(userActivities.entries())); // Aktif kullanıcıların aktiflik durumunu gonderir
    });

    socket.on("update_activity", (userId, activity) => {
      console.log("Activity updated", userId, activity);
      userActivities.set(userId, activity); // Kullanıcının aktiflik durumunu gunceller
      io.emit("activity_updated", { userId, activity });
    });
    socket.on("send_message", async (data) => {
      // Mesaj gonderildigini dinler
      try {
        const { senderId, receiverId, content } = data; // Gelen verileri destructuring ile alır

        const message = await Message.create({
          // Mesajı veritabanına kaydeder
          senderId, // Gonderen kullanıcının ID'sini kaydeder
          receiverId, // Alıcı kullanıcının ID'sini kaydeder
          content, // Mesajı kaydeder
        });

        const receiverSocketId = userSockets.get(receiverId); // Alıcı kullanıcının socket ID'sini alır

        if (receiverSocketId) {
          // Alıcı kullanıcının socket ID'si varsa
          io.to(receiverSocketId).emit("new_message", message); // Alıcıya mesaj gonderir
        }

        socket.emit("message_sent", message); // Gonderen kullanıcıya mesaj gonderir
      } catch (error) {
        console.log("Error sending message", error);
        socket.emit("message_error", error);
      }
    });
    socket.on("disconnect", () => {
      // Kullanıcı oturumu kapattıgında dinler
      let disconnectedUserId;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId; // Oturumu kapatan kullanıcının ID'sini alır
          userSockets.delete(userId); // Oturumu kapatan kullanıcının socket ID'sini siler
          userActivities.delete(userId); // Oturumu kapatan kullanıcının aktiflik durumunu siler
          break;
        }
      }
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId); // Oturumu kapatan kullanıcıya mesaj gonderir
      }
    });
  });
};
