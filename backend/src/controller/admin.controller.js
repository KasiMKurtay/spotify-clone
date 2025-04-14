import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";

const uploadToCloudinary = async (file) => {
  try {
    const result = await uploadToCloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", //Dosya türünü otomatik olarak belirler
    });
    return result.secure_url; //Yükleme başarılıysa, dosyanın güvenli URL'sini döndürür
  } catch (error) {
    console.log("Error in uploadtToCloudinary", error); //Hata mesajını konsola yazdırır
    throw new Error("Error uploading to cloudinary"); //Hata mesajını bir sonraki middleware'a gönderir
  }
};

export const createSong = async (req, res, next) => {
  try {
    //Eğer gerekli dosylara yüklenmemişse hata mesajı döner
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files" });
    }
    //Şarkı verilerini alır
    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile; //Ses dosyasını al
    const imageFile = req.files.imageFile; //Resim dosyasını al

    //Dosyaları Cloudinary'e yükle
    const audioUrl = await uploadToCloudinary(audioFile); //Ses dosyasını Cloudinary'e yükle
    const imageUrl = await uploadToCloudinary(imageFile); //Resim dosyasını Cloudinary'e yükle

    //Şarkı veritabanına kaydedilir
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null, //Albüm varsa albüm ID'sini kayderder
    });

    await song.save(); //Şarkıyı veritabanına kaydeder

    //Eğer albüme aitse albümdeki şarkı listesine eklenir
    if (albumId) {
      await Album.findById(albumId, {
        $push: { songs: song._id },
      });
    }
    return res.status(201).json(song); //Yeni şarkıyı döndürür
  } catch (error) {
    console.log("Error in createSong", error); //Hata mesajını konsola yazdırır
    next(error); //Hata ile devam eder
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params; //URL parametresinden Şarkı ID'sini al

    const song = await Song.findById(id); //Şarkıyı veritabanında bulur

    //Eğer şarkı albüme aitse , albümdeki Şarkı listesinden silinir
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        //Aalbüm ID'sine göre albuımı bulur
        $pull: { songs: song._id }, //Şarkıyı albümden çıkartır
      });
    }
    await Song.findByIdAndDelete(id); //Şarkıyı siler

    res.status(200).json({ message: "Song deleted successfully" }); //Başarı mesajı döndürür
  } catch (error) {
    next(error); //Hata ile devam eder
    console.log("Error in deleteSong", error); //Hata mesajını konsola yazdırır
  }
};

//Yeni albüm oluşturma işlemi
export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body; //Albüm bilgilerini al
    const imageFile = req.files; //Resim dosyasını al

    const imageUrl = await uploadToCloudinary(imageFile); //Resim dosyasını Cloudinary'e yükle

    //Albüm veritabanına kaydedilir
    const album = new Album({
      title, //Albüm başlığını kaydeder
      artist, //Albüm sanatçısını kaydeder
      imageUrl, //Albüm resmini kaydeder
      releaseYear, //Albüm yayın tarihini kaydeder
    });

    await album.save(); //Albüm veritabanına kaydeder

    res.status(201).json(album); //Yeni albüm döndürür
  } catch (error) {
    console.log("Error in createAlbuım", error); //Hata mesajını konsola yazdırır
    next(error); //Hata ile devam eder
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params; //URL parametresinden albüm ID'sini alır
    await Song.deleteMany({ albumId: id }); //Albüme ait tüm şarkıları siler
    await Album.findByIdAndDelete(id); //Albümü siler
    res.status(200).json({ message: "Album deleted successfully" }); //Başarı mesajı döndürür
  } catch (error) {
    console.log("Error in deleteAlbum", error); //Hata durumunda konsola yazdırır
    next(error); //Hata ile devam eder
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true }); //Admin olup olmadığını döndürür
};
