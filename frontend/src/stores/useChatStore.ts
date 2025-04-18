import { AxiosInstance } from "@/lib/axios";
import { useChatStore } from "./useChatStore";
import { create } from "zustand";

interface ChatStore {
  users: any[]; //Kullanıcı listesini tutar (tipi any)
  fetchUsers: () => Promise<void>; //Kullanıcıları çeken async fonksiyon
  isLoading: boolean; //Yükleme duruumunu  tutar
  error: string | null; //Hata mesajını tutar
}

export const useChatStore = create<ChatStore>((set) => ({
  users: [], //Başlangıçta kullanıcı listesi boş
  isLoading: false, //Yüklenme başlangıcında false
  error: null, //Hata başlangıçta yok

  fetchUsers: async () => {
    set({ isLoading: true, error: null }); //Yüklenme başlatıulır ve hata sıfırlanır
    try {
      const response = await AxiosInstance.get("/users"); //Apı'den gelkeen verileri alır
      set({ users: response.data }); //Gelen verileri kullanıcı listesine atar
    } catch (error) {
      set({ error: error.response.data.message }); //Hata varsa hata mesajını atar
    } finally {
      set({ isLoading: false }); //Yüklenme tamamlandı
    }
  },
}));
