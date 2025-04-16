import { Card, CardContent } from "@/components/ui/card";
import { AxiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser(); //Kullanıcı bilgilerini almak için useUser hook'unu kullanırız
  const navigate = useNavigate(); //Sayfa yönlendirme işlemleri için navigate fonksiyonunu kullanırız
  const syncAttempted = useRef(false); //Sync işleminin daha önce yapılıp yapılmadığını kontrol etmek için

  useEffect(() => {
    //Kullanıcı verisi yüklendikten sonra çalışacak bir effeckt hook'u tanımlar
    const syncUser = async () => {
      //Kullanıcı verisi yüklendikten sonra çalışacak bir effeckt hook'u tanımlar
      if (!isLoaded || !user || syncAttempted.current) return; //Eğer kullanıcı verisi yüklenmemişse kullanıcı yoksa ya da senkronizasyon zaten yapılmışsa fonksiyonu sonlandırır
      try {
        syncAttempted.current = true; //Senkronizasyonun yapıldığını işaret eder

        await AxiosInstance.post("/auth/callback", {
          //Sunucuya kullanıcı bilgilerini gönderir
          id: user.id, //Kullanıcının ID'sini sunucuya gonderir
          firstName: user.firstName, //Kullanıcının adını sunucuya gonderir
          lastName: user.lastName, //Kullanıcının soyadını sunucuya gonderir
          imageUrl: user.imageUrl, //Kullanıcının profil resmini sunucuya gonderir
        });
      } catch (error) {
        //Hata yakalamak için
        console.log("Error in auth callback", error); //Hata mesajını konsola yazdırır
      } finally {
        navigate("/"); //Ana sayfaya yonlendirir
      }
    };
    syncUser(); //Kullanıcı verisi yüklendikten sonra syncUser fonksiyonunu calistir
  }, [isLoaded, user, navigate]); //useEffect , isLoaded , user veya navigate değiştiğinde yeniden çalışır

  return (
    <div className="h-screen w-full bg-black flex item-center justify-center">
      {" "}
      {/* Sayfa tam ekran olacak şekilde stilize edilir */}
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        {" "}
        {/* Card bileşeni, stilize edilir */}
        <CardContent className="flex flex-col items-center gap-4 pt-6" />
        {/* Card'in icerigi, stilize edilir */}
        <Loader className="size-6 text-emerald-500 animate-spin" />
        {/* Loader bileşeni, stilize edilir */}
        <h3 className="text-zinc-400 text-xl font-bold">Logging you in</h3>
        {/* Kullanıcı girisini gosteren metin, stilize edilir */}
        <p className="text-zinc-400 text-sm">Redirecting...</p>
        {/* Yonlendirme mesaji, stilize edilir */}
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
