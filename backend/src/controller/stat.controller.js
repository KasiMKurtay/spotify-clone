import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

// İstatistik verilerini almak için kullanılan fonksiyon
export const getStats = async (req, res, next) => {
  try {
    // Promise.all ile paralel olarak tüm veriler alınıyor
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        // Song koleksiyonundaki toplam şarkı sayısı
        Song.countDocuments(),

        // Album koleksiyonundaki toplam albüm sayısı
        Album.countDocuments(),

        // User koleksiyonundaki toplam kullanıcı sayısı
        User.countDocuments(),

        // Song koleksiyonunda sanatçıları gruplayıp toplam sanatçı sayısını almak için aggregation işlemi
        Song.aggregate([
          {
            $unionWith: {
              // Song ve Album koleksiyonlarını birleştiriyor
              coll: "albums", // Album koleksiyonunu kullanıyoruz
              pipeline: [], // Albüm koleksiyonunda herhangi bir işlem yapılmaz
            },
          },
          {
            $group: {
              // Song koleksiyonundaki sanatçılar gruplanır
              _id: "$artist", // Sanatçılar `_id` alanında gruplanır
            },
          },
          {
            $count: "count", // Sanatçılar gruplandıktan sonra toplam sayısı alınır
          },
        ]),
      ]);

    // Sonuçları JSON formatında döndür
    res.status(200).json({
      totalAlbums, // Toplam albüm sayısını döndürür
      totalSongs, // Toplam şarkı sayısını döndürür
      totalUsers, // Toplam kullanıcı sayısını döndürür
      totalArtists: uniqueArtists[0]?.count || 0, // Benzersiz sanatçı sayısını döndürür, yoksa 0 döner
    });
  } catch (error) {
    // Hata durumunda bir sonraki middleware'e geçer
    next(error);
  }
};
