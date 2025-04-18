import { AxiosInstance } from "@/lib/axios"; // Axios ile API istekleri atmak için özel instance
import { Album, Song } from "@/types"; // Tip tanımlamaları içe aktarılıyor
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

  fetchAlbums: () => Promise<void>; // Albüm listesini getiren fonksiyon
  fetchAlbumById: (id: string) => Promise<void>; // Belirli bir albümü ID ile getiren fonksiyon
  fetchFeaturedSongs: () => Promise<void>; // Öne çıkan şarkıları getiren fonksiyon
  fetchMadeForYouSongs: () => Promise<void>; // Kullanıcıya özel şarkıları getiren fonksiyon
  fetchTrendingSongs: () => Promise<void>; // Trend şarkıları getiren fonksiyon
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

  fetchAlbums: async () => {
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
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get(`/albums/${id}`); // ID ile albüm detayını getirir
      set({ currentAlbum: response.data }); // Albüm detayını state'e aktarır
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/featured"); // Öne çıkan şarkıları alır
      set({ featuredSongs: response.data }); // State'e aktarılır
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/made-for-you"); // Kullanıcıya özel şarkılar
      set({ madeForYouSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/trending"); // Trend şarkılar
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
