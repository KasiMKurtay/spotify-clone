import { User } from "../models/user.model.js";
// Tüm kullanıcıları almak için kullanılan fonksiyon
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId; // Şu anki kullanıcının ID'sini alır
    // clerckId'si şu anki kullanıcı ID'sine eşit olmayan kullanıcıları bulur
    const users = await User.find({ clerckId: { $ne: currentUserId } });

    res.status(200).json(users); // Kullanıcıları JSON formatında döndürür
  } catch (error) {
    next(error); // Hata durumunda bir sonraki middleware'e geçer
  }
};
