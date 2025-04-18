import { AxiosInstance } from "@/lib/axios";
import { create } from "zustand";
interface AuthStore {
  isAdmin: boolean; // Kullanıcının admin olup olmadığını tutar
  error: string | null; // Hata mesajını tutar
  isLoading: boolean; // Yüklenme durumunu tutar

  checkAdmin: () => Promise<void>; // Admin kontrolünü yapan async fonksiyon
  reset: () => void; // State'i sıfırlayan fonksiyon
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Zustand ile AuthStore tipi bir store oluşturulur
  isAdmin: false, // Başlangıçta admin değil
  isLoading: false, // Başlangıçta yüklenme yok
  error: null, // Başlangıçta hata yok

  checkAdmin: async () => {
    // Admin olup olmadığını kontrol eden fonksiyon
    set({ isLoading: true, error: null }); // Yüklenme başlatılır ve hata sıfırlanır
    try {
      const response = await AxiosInstance.get("/admin/check"); // API'den admin kontrolü yapılır
      set({ isAdmin: response.data.admin }); // Gelen veriye göre admin durumu güncellenir
    } catch (error: any) {
      set({ isAdmin: false, error: error.response.data.message }); // Hata varsa admin false ve hata mesajı yazılır
    } finally {
      set({ isLoading: false }); // Yüklenme tamamlandı
    }
  },

  reset: () => {
    // Store'daki tüm verileri sıfırlar
    set({ isAdmin: false, isLoading: false, error: null });
  },
}));
