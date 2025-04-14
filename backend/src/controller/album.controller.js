import { Album } from "../models/album.model.js";

//Tüm albümleri listeler
export const getAllAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find(); //Veritabanından tüm albümleri alır
    res.status(200).json(albums); //ALbümleri JSON formatında döndürür
  } catch (error) {
    next(error); //Hata durumunda bir sonraki middleware'ye gecirir
  }
};

//Belirli bir albümü ID'ye göre bulur
export const getAlbumById = async (req, res, next) => {
  try {
    const { albumId } = req.params; //URL parametresinden albüm ID'sini alır

    const album = await Album.findById(albumId).populate("songs"); //Albüm ID'sine göre albümü bulur ve albümdeki şarkı listesini döndürür
    if (!album) {
      return res.status(404).json({ message: "Album not found" }); //Albüm bulunamazsa hata mesajı döndürür
    }
    res.stauts(200).json(album); //Albümü JSON formatında döndürür
  } catch (error) {
    next(error); //Hata durumunda bir sonraki middleware'ye gecirir
    console.log("Error in getAlbumById", error); //Hata mesajını konsola yazdırır
  }
};
