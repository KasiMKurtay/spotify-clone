/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance } from "@/lib/axios"; // Özel yapılandırılmış Axios örneğini içe aktarıyoruz
import { Message, User } from "@/types"; // Mesaj ve kullanıcı tiplerini alıyoruz
import { create } from "zustand"; // Zustand ile global state yönetimi sağlıyoruz
import { io } from "socket.io-client"; // socket.io-client ile gerçek zamanlı bağlantı kuruyoruz

// ChatStore arayüzü, store'da hangi verilerin ve fonksiyonların olduğunu tanımlar
interface ChatStore {
  users: User[]; // Tüm kullanıcılar
  isLoading: boolean; // Yükleniyor durumu
  error: string | null; // Hata mesajı
  socket: any; // Socket nesnesi
  isConnected: boolean; // Socket bağlantı durumu
  onlineUsers: Set<string>; // Çevrimiçi kullanıcıların ID’leri
  userActivities: Map<string, string>; // Kullanıcı aktiviteleri (örn: yazıyor)
  messages: Message[]; // Aktif kullanıcıyla olan mesajlar
  selectedUser: User | null; // Seçilen kullanıcı

  fetchUsers: () => Promise<void>; // Kullanıcı listesini çeker
  initSocket: (userId: string) => void; // Socket bağlantısını başlatır
  disconnectSocket: () => void; // Socket bağlantısını koparır
  sendMessage: (receiverId: string, senderId: string, content: string) => void; // Mesaj gönderme
  fetchMessages: (userId: string) => Promise<void>; // Mesaj geçmişini alır
  setSelectedUser: (user: User | null) => void; // Aktif kullanıcıyı ayarlar
}

const baseURL = "http://localhost:5000"; // API ve socket bağlantı adresi

// Socket nesnesini oluşturuyoruz (ilk başta bağlantı kurmuyor)
const socket = io(baseURL, {
  autoConnect: false, // Otomatik bağlanmasın, manuel bağlayacağız
  withCredentials: true, // Çerez bilgileri gönderilsin (kimlik doğrulama için)
});

// Zustand store’unu oluşturuyoruz
export const useChatStore = create<ChatStore>((set, get) => ({
  users: [], // Başlangıçta kullanıcı listesi boş
  isLoading: false, // Yüklenme durumu kapalı
  error: null, // Hata yok
  socket: null, // Socket başlangıçta tanımsız
  isConnected: false, // Bağlantı yok
  onlineUsers: new Set(), // Başlangıçta çevrimiçi kullanıcı yok
  userActivities: new Map(), // Başlangıçta kimse yazmıyor
  messages: [], // Başlangıçta mesaj yok
  selectedUser: null, // Başlangıçta kullanıcı seçilmemiş

  // API'den kullanıcıları çeken fonksiyon
  fetchUsers: async () => {
    set({ isLoading: true, error: null }); // Yüklenme başlıyor, hata sıfırlanıyor
    try {
      const response = await AxiosInstance.get("/users"); // API isteği
      console.log("Fetched Users: ", response.data); // Kullanıcı verisini logla
      set({ users: response.data }); // Kullanıcılar store'a aktarılıyor
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Kullanıcılar alınamadı", // Hata mesajı ayarlanıyor
      });
    } finally {
      set({ isLoading: false }); // Yükleme durumu kapanıyor
    }
  },

  // Socket bağlantısını başlatan fonksiyon
  initSocket: (userId) => {
    if (!get().isConnected) {
      // Zaten bağlıysa tekrar bağlanma
      socket.auth = { userId }; // Kullanıcı ID’siyle kimlik tanımı yapılır
      socket.connect(); // Socket bağlantısı kurulur
      socket.emit("user_connected", userId); // Sunucuya kullanıcı bağlandı bilgisi gönderilir

      // Sunucudan çevrimiçi kullanıcı listesi geldiğinde store'a aktarılır
      socket.on("users_online", (users: string[]) => {
        set({ onlineUsers: new Set(users) });
      });

      // Tüm kullanıcı aktiviteleri alınıp store'a aktarılır
      socket.on("activities", (activities: [string, string][]) => {
        set({ userActivities: new Map(activities) });
      });

      // Yeni bir kullanıcı bağlandığında çevrimiçi listesine eklenir
      socket.on("user_connected", (userId: string) => {
        set((state) => ({
          onlineUsers: new Set([...state.onlineUsers, userId]),
        }));
      });

      // Bir kullanıcı bağlantıyı kestiğinde listeden çıkarılır
      socket.on("user_disconnected", (userId: string) => {
        set((state) => {
          const newOnlineUsers = new Set(state.onlineUsers);
          newOnlineUsers.delete(userId);
          return { onlineUsers: newOnlineUsers };
        });
      });

      // Kullanıcı bize mesaj gönderdiğinde store'a eklenir
      socket.on("receiver_message", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      // Biz mesaj gönderdiğimizde store'a eklenir
      socket.on("message_sent", (message: Message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      // Bir kullanıcının aktivitesi güncellendiğinde store güncellenir
      socket.on("activity_updated", ({ userId, activity }) => {
        set((state) => {
          const newActivities = new Map(state.userActivities);
          newActivities.set(userId, activity);
          return { userActivities: newActivities };
        });
      });

      set({ isConnected: true, socket }); // Socket ve bağlantı durumu store'a yazılır
    }
  },

  // Socket bağlantısını koparma
  disconnectSocket: () => {
    if (get().isConnected) {
      // Bağlıysa işlem yapılır
      socket.removeAllListeners(); // Tüm event dinleyicileri kaldırılır
      socket.disconnect(); // Bağlantı kesilir
      set({ isConnected: false, socket: null }); // Store sıfırlanır
    }
  },

  // Mesaj gönderme fonksiyonu
  sendMessage: async (receiverId, senderId, content) => {
    const socket = get().socket; // Güncel socket alınır
    if (!socket) return; // Socket yoksa işlem yapma
    socket.emit("send_message", { receiverId, senderId, content }); // Sunucuya mesaj gönderilir
  },

  // Seçilen kullanıcıyla olan geçmiş mesajları çekme
  fetchMessages: async (userId: string) => {
    set({ isLoading: true, error: null }); // Yüklenme başlar
    try {
      const response = await AxiosInstance.get(`/users/messages/${userId}`); // API'den mesajları al
      set({ messages: response.data }); // Store'a mesajları yaz
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Mesajlar alınamadı", // Hata varsa mesaj ver
      });
    } finally {
      set({ isLoading: false }); // Yükleme bitti
    }
  },

  // Aktif kullanıcıyı belirleme
  setSelectedUser: (user) => set({ selectedUser: user }), // Seçilen kullanıcıyı store’a aktar
}));
