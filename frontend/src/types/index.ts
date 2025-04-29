export interface Song {
  _id: string; // Şarkının benzersiz ID'si (string türünde)
  title: string; // Şarkının başlığı (string türünde)
  artist: string; // Şarkıcının adı (string türünde)
  albumId: string | null; // Şarkının ait olduğu albümün ID'si (string veya null olabilir)
  imageUrl: string; // Şarkının resminin URL'si (string türünde)
  audioUrl: string; // Şarkının ses dosyasının URL'si (string türünde)
  duration: number; // Şarkının süresi (saniye cinsinden, number türünde)
  createdAt: Date; // Şarkının oluşturulma tarihi (Date türünde)
  updatedAt: Date; // Şarkının güncellenme tarihi (Date türünde)
}

export interface Album {
  _id: string; // Albümün benzersiz ID'si (string türünde)
  title: string; // Albümün başlığı (string türünde)
  artist: string; // Albümün sanatçısı (string türünde)
  imageUrl: string; // Albümün kapağının URL'si (string türünde)
  releaseYear: number; // Albümün çıkış yılı (number türünde)
  songs: Song[]; // Albümdeki şarkılar (Song türünde bir dizi)
}

export interface Stats {
  totalSongs: number; // Toplam şarkı sayısı (number türünde)
  totalAlbums: number; // Toplam albüm sayısı (number türünde)
  totalUsers: number; // Toplam kullanıcı sayısı (number türünde)
  totalArtists: number; // Toplam sanatçı sayısı (number türünde)
}

export interface Message {
  _id: string; // Mesajın benzersiz ID'si (string türünde)
  senderId: string; // Gönderenin ID'si (string türünde)
  receiverId: string; // Alıcının ID'si (string türünde)
  content: string; // Mesajın içeriği (string türünde)
  createdAt: string; // Mesajın oluşturulma tarihi (string türünde, tarih formatında)
  updatedAt: string; // Mesajın güncellenme tarihi (string türünde, tarih formatında)
}

export interface User {
  _id: string; // Kullanıcının benzersiz ID'si (string türünde)
  clerkId: string; // Kullanıcının görevli ID'si (string türünde)
  fullName: string; // Kullanıcının tam adı (string türünde)
  imageUrl: string; // Kullanıcının profil resminin URL'si (string türünde)
}
