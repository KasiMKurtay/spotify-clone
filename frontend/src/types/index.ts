export interface Song {
  // Song adında bir interface tanımlar.
  _id: string; // Şarkının benzersiz ID'si (string türünde).
  title: string; // Şarkının başlığı (string türünde).
  artist: string; // Şarkıcının adı (string türünde).
  albumId: string | null; // Şarkının ait olduğu albümün ID'si (string veya null olabilir).
  imageUrl: string; // Şarkının resminin URL'si (string türünde).
  audioUrl: string; // Şarkının ses dosyasının URL'si (string türünde).
  duration: number; // Şarkının süresi (saniye cinsinden, number türünde).
  createdAt: Date; // Şarkının oluşturulma tarihi (Date türünde).
  updatedAt: Date; // Şarkının güncellenme tarihi (Date türünde).
}

export interface Album {
  // Album adında bir interface tanımlar.
  _id: string; // Albümün benzersiz ID'si (string türünde).
  title: string; // Albümün başlığı (string türünde).
  artist: string; // Albümün sanatçısı (string türünde).
  imageUrl: string; // Albümün kapağının URL'si (string türünde).
  releaseYear: number; // Albümün çıkış yılı (number türünde).
  songs: Song[]; // Albümdeki şarkılar (Song türünde bir dizi).
}
