import { Song } from "../models/song.model.js";

// Tüm şarkıları veritabanından alır ve yeni eklenen şarkıları üstte sıralar
export const getAllSongs = async (req, res, next) => {
  try {
    // -1 = En yenisi en üstte, 1 = En eski en altta
    const songs = await Song.find().sort({ createdAt: -1 }); // Şarkıları createdAt'a göre azalan sırayla alır
    res.json(songs); // Şarkıları JSON formatında döndürür
  } catch (error) {
    next(error); // Hata durumunda bir sonraki middleware'e geçer
  }
};

// Öne çıkan 6 şarkıyı almak için kullanılan fonksiyon
export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      // Song koleksiyonunda aggregation işlemi yapar
      {
        $sample: {
          // Rastgele şarkıları alır
          size: 6, // 6 şarkı alır
        },
      },
      {
        $project: {
          // Yalnızca gerekli alanları döndürür
          _id: 1, // ID'yi döndür
          title: 1, // Başlığı döndür
          artist: 1, // Sanatçıyı döndür
          imageUrl: 1, // Görsel URL'sini döndür
          audioUrl: 1, // Audio URL'sini döndür
        },
      },
    ]);

    res.json(songs); // Şarkıları JSON formatında döndürür
  } catch (error) {
    next(error); // Hata durumunda bir sonraki middleware'e geçer
  }
};

// "Sizin İçin Yapılmış" 4 şarkıyı almak için kullanılan fonksiyon
export const getMadeForYou = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      // Song koleksiyonunda aggregation işlemi yapar
      {
        $sample: {
          // Rastgele şarkıları alır
          size: 4, // 4 şarkı alır
        },
      },
      {
        $project: {
          // Yalnızca gerekli alanları döndürür
          _id: 1, // ID'yi döndür
          title: 1, // Başlığı döndür
          artist: 1, // Sanatçıyı döndür
          imageUrl: 1, // Görsel URL'sini döndür
          audioUrl: 1, // Audio URL'sini döndür
        },
      },
    ]);

    res.json(songs); // Şarkıları JSON formatında döndürür
  } catch (error) {
    next(error); // Hata durumunda bir sonraki middleware'e geçer
  }
};

// Popüler 4 şarkıyı almak için kullanılan fonksiyon
export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      // Song koleksiyonunda aggregation işlemi yapar
      {
        $sample: {
          // Rastgele şarkıları alır
          size: 4, // 4 şarkı alır
        },
      },
      {
        $project: {
          // Yalnızca gerekli alanları döndürür
          _id: 1, // ID'yi döndür
          title: 1, // Başlığı döndür
          artist: 1, // Sanatçıyı döndür
          imageUrl: 1, // Görsel URL'sini döndür
          audioUrl: 1, // Audio URL'sini döndür
        },
      },
    ]);

    res.json(songs); // Şarkıları JSON formatında döndürür
  } catch (error) {
    next(error); // Hata durumunda bir sonraki middleware'e geçer
  }
};
