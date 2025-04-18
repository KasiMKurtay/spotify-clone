import { AxiosInstance } from "@/lib/axios"; // Axios instance'ını içeri aktar
import { useAuth } from "@clerk/clerk-react"; // Clerk kütüphanesinden auth verilerini al
import { useEffect, useState } from "react"; // React Hook'larını içeri aktar
import { Loader } from "lucide-react"; // Yüklenme spinner ikonu
import { useAuthStore } from "@/stores/useAuthStore"; // Yetkilendirme kontrolü için store

// Token varsa Axios'a Authorization header olarak ekle, yoksa sil
const updateApiToken = (token: string | null) => {
  if (token) {
    AxiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete AxiosInstance.defaults.headers.common["Authorization"];
  }
};

// AuthProvider bileşeni (uygulamanın auth durumunu yönetiyor)
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth(); // Clerk'ten token al
  const [loading, setLoading] = useState(true); // Sayfa yükleniyor mu?
  const { checkAdmin } = useAuthStore(); // Kullanıcı admin mi kontrol et

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken(); // Token'i al
        updateApiToken(token); // Token'i Axios'a ekle

        if (token) {
          await checkAdmin(); // Token varsa admin kontrolü yap
        }
      } catch (error) {
        updateApiToken(null); // Hata varsa token'i sıfırla
        console.log("Error in initAuth", error); // Hata logla
      } finally {
        setLoading(false); // Yükleme bitti
      }
    };

    initAuth(); // useEffect çalışınca auth başlat
  }, [getToken]); // Sadece getToken değişirse tekrar çalışır

  if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );

  return <>{children}</>; // Yükleme bittiğinde çocukları göster
};

export default AuthProvider; // Bileşeni dışa aktar
