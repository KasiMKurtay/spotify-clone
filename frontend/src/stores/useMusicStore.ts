/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "@/lib/axios"; // Axios ile API istekleri atmak için özel instance
import { Album, Song, Stats } from "@/types"; // Tip tanımlamaları içe aktarılıyor
import toast from "react-hot-toast"; // React'ta toast bildirimleri için kullanılıyor
import { create } from "zustand"; // Zustand store oluşturmak için gerekli fonksiyon

interface MusicStore {
  songs: Song[]; // Şarkıları tutan dizi
  albums: Album[]; // Albümleri tutan dizi
  isLoading: boolean; // Yüklenme durumu
  error: string | null; // Hata mesajı ya da null
  currentAlbum: null | Album; // Seçili albüm (detayları gösterilecek olan)
  featuredSongs: Song[]; // Öne çıkan şarkılar
  madeForYouSongs: Song[]; // Kullanıcıya özel şarkılar
  trendingSongs: Song[]; // Trend olan şarkılar
  stats: Stats; // İstatistikler

  fetchAlbums: () => Promise<void>; // Albüm listesini getiren fonksiyon
  fetchAlbumById: (id: string) => Promise<void>; // Belirli bir albümü ID ile getiren fonksiyon
  fetchFeaturedSongs: () => Promise<void>; // Öne çıkan şarkıları getiren fonksiyon
  fetchMadeForYouSongs: () => Promise<void>; // Kullanıcıya özel şarkıları getiren fonksiyon
  fetchTrendingSongs: () => Promise<void>; // Trend şarkıları getiren fonksiyon
  fetchStats: () => Promise<void>; // Tüm istatistikleri getiren fonksiyon
  fetchAllSongs: () => Promise<void>; // Tüm şarkıları getiren fonksiyon
  deleteSong: (id: string) => Promise<void>; // Şarkıyı silen fonksiyon
  deleteAlbum: (id: string) => Promise<void>; // Albümü silen fonksiyon
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [], // Başlangıçta boş albüm listesi
  songs: [], // Başlangıçta boş şarkı listesi
  isLoading: false, // Yükleme işlemi başta false
  error: null, // Hata mesajı başta yok
  currentAlbum: null, // Seçili albüm yok
  madeForYouSongs: [], // Başlangıçta boş kullanıcıya özel şarkı listesi
  featuredSongs: [], // Başlangıçta boş öne çıkan şarkı listesi
  trendingSongs: [], // Başlangıçta boş trend şarkı listesi
  stats: {
    totalAlbums: 0, // Toplam albüm sayısı
    totalArtists: 0, // Toplam sanatçı sayısı
    totalSongs: 0, // Toplam şarkı sayısı
    totalUsers: 0, // Toplam kullanıcı sayısı
  },

  deleteAlbum: async (id) => {
    // Albüm silme fonksiyonu
    set({ isLoading: true, error: null }); // Yükleme başlatılır, hata sıfırlanır
    try {
      await AxiosInstance.delete(`/admin/albums/${id}`); // API isteği ile albüm silinir
      set((state) => ({
        albums: state.albums.filter((album) => album._id !== id), // Silinen albüm listeden çıkarılır
        songs: state.songs.map((song) =>
          song.albumId === state.albums.find((a) => a._id === id)?.title
            ? { ...song, album: null } // Albüm silindiyse, şarkının albümü null yapılır
            : song
        ),
      }));
      toast.success("Album deleted successfully"); // Başarılı mesajı
    } catch (error: any) {
      toast.error("Failed to delete album: " + error.message); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme durumu false yapılır
    }
  },

  fetchAlbums: async () => {
    // Albümleri getiren fonksiyon
    set({ isLoading: true, error: null }); // Yükleme başlatılır, hata sıfırlanır
    try {
      const response = await AxiosInstance("/albums"); // Albüm listesini alır
      set({ albums: response.data }); // Gelen albümler state'e aktarılır
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata olursa mesaj state'e yazılır
    } finally {
      set({ isLoading: false }); // Yükleme tamamlanır
    }
  },

  fetchAlbumById: async (id) => {
    // ID ile albüm detaylarını getiren fonksiyon
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get(`/albums/${id}`); // Albüm detayını alır
      set({ currentAlbum: response.data }); // Albüm detayını state'e aktarır
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme durumu false yapılır
    }
  },

  fetchFeaturedSongs: async () => {
    // Öne çıkan şarkıları getiren fonksiyon
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/featured"); // Öne çıkan şarkıları alır
      set({ featuredSongs: response.data }); // State'e aktarılır
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme tamamlanır
    }
  },

  fetchMadeForYouSongs: async () => {
    // Kullanıcıya özel şarkıları getiren fonksiyon
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/made-for-you"); // Kullanıcıya özel şarkılar
      set({ madeForYouSongs: response.data }); // State'e aktarılır
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme tamamlanır
    }
  },

  fetchTrendingSongs: async () => {
    // Trend olan şarkıları getiren fonksiyon
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/trending"); // Trend şarkılar
      set({ trendingSongs: response.data }); // State'e aktarılır
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme tamamlanır
    }
  },

  fetchAllSongs: async () => {
    // Tüm şarkıları getiren fonksiyon
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs"); // Tüm şarkıları alır
      set({ songs: response.data }); // State'e aktarılır
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme tamamlanır
    }
  },

  fetchStats: async () => {
    // İstatistikleri getiren fonksiyon
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/stats"); // İstatistikleri alır
      set({ stats: response.data }); // State'e aktarılır
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme tamamlanır
    }
  },

  deleteSong: async (id) => {
    // Şarkıyı silen fonksiyon
    set({ isLoading: true, error: null });
    try {
      await AxiosInstance.delete(`/admin/songs/${id}`); // API isteği ile şarkı silinir
      set((state) => ({
        songs: state.songs.filter((song) => song._id !== id), // Silinen şarkı listeden çıkarılır
      }));
      toast.success("Song deleted successfully"); // Başarılı mesajı
    } catch (error: any) {
      set({ error: error.response.data.message }); // Hata mesajı
    } finally {
      set({ isLoading: false }); // Yükleme durumu false yapılır
    }
  },
}));
