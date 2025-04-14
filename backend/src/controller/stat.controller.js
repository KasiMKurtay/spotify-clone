import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";
// Tüm istatistikleri almak için kullanılan fonksiyon
export const getStats = async (req, res, next) => {
  try {
    // Promise.all ile tüm istatistikleri aynı anda almak için paralel istekler yapılır
    const [totalSongs, totalAlbums, totalUsers, uniqueArtist] =
      await Promise.all([
        // Tüm veriler paralel olarak alınır
        Song.countDocuments(), // Şarkı sayısını alır
        Album.countDocuments(), // Albüm sayısını alır
        User.countDocuments(), // Kullanıcı sayısını alır

        // Song ve Album koleksiyonlarından benzersiz sanatçı sayısını alır
        Song.aggregate([
          // Song koleksiyonunda aggregation işlemi yapılır
          {
            $unionWith: {
              // Song ve Album koleksiyonlarını birleştirir
              coll: "albums", // Album koleksiyonunu kullanır
              pipeline: [], // Herhangi bir ek işlem yapılmaz
            },
          },
          {
            $group: {
              // Veriyi gruplar
              _id: "artist", // Sanatçıyı gruplar
            },
          },
          {
            $count: "count", // Sanatçıların toplam sayısını alır
          },
        ]),
      ]);

    // İstatistikleri JSON formatında döndürür
    res.status(200).json({
      totalSongs, // Toplam şarkı sayısını döndürür
      totalAlbums, // Toplam albüm sayısını döndürür
      totalUsers, // Toplam kullanıcı sayısını döndürür
      totalArtist: uniqueArtist[0]?.count || 0, // Benzersiz sanatçı sayısını döndürür, yoksa 0 döner
    });
  } catch (error) {
    next(error); // Hata durumunda bir sonraki middleware'e geçer
  }
};
