import { AxiosInstance } from "@/lib/axios";
import { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
  // MusicStore interface'ini tanımlar
  songs: Song[]; //Şarkıların tutulacağı dizi
  albums: Album[]; //Albümlerin tutulacağı dizi
  isLoading: boolean; //Verilerin yüklenip yüklenmediğini belirten boolean değeri
  error: string | null; //Hata mesajı veya null
  currentAlbum: null | Album;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];

  fetchAlbums: () => Promise<void>; //Albümleri yükleme fonksiyonu
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  // Zustand store'unu oluşturur.
  albums: [], // Başlangıçta boş albüm dizisi.
  songs: [], // Başlangıçta boş şarkı dizisi.
  isLoading: false, // Başlangıçta yükleniyor durumu false.
  error: null, // Başlangıçta hata mesajı yok.
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],

  fetchAlbums: async () => {
    //Albümleri fetch eden asenkron fonksiyon
    set({ isLoading: true, error: null }); // Yükleniyor durumu true olacak.
    try {
      const response = await AxiosInstance("/albums"); //albüms enpotinden albümleri çeker
      set({ albums: response.data }); //Gelen verileri albümlere atar
    } catch (error: any) {
      set({ error: error.response.data.message }); //Hata mesajını store'a ekler
    } finally {
      set({ isLoading: false }); //Yükleniyor durumu false yapar
    }
  },

  fetchAlbumById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get(`/albums/${id}`);
      set({ currentAlbum: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/featured");
      set({ featuredSongs: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/made-for-you");
      set({ madeForYouSongs: response.data });
    } catch (error) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await AxiosInstance.get("/songs/trending");
      set({ trendingSongs: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
