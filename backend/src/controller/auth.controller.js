import { User } from "../models/user.model.js";

//Kullanıcıyı doğrulama ve veritabanına kaydetme işlemi yapan auth callback fonksiyon

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body; //Request body'den kullanıcı bilgilerini alır

    const user = await User.findOne({ clerckId: id }); //Veritabanında kullanıcı "clerckId" ile arar

    if (!user) {
      //Eğer kullanıcı bulunamazsa
      await User.create({
        //Yeni bir kullanıcı oluşturur
        clerckId: id, //Kullanıcının clerckId'sini kaydeder
        fullName: `${firstName} ${lastName}`, //Kullanıcının tam adını kaydeder
      });
    }

    res.status(200).json({ success: true }); //Başarılı yanıt döndürür
  } catch (error) {
    console.log("Error in auth callback", error); //Hata mesajını konsola yazdırır
    next(error); //Hata durumunda bir sonraki middleware'ye gecirir
  }
};
