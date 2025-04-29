import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import PlayButton from "./PlayButton";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const ShowAllSongs = () => {
  const { songs, isLoading, fetchAllSongs } = useMusicStore(); // Store'dan şarkılar, yükleniyor durumu ve şarkıları çekme fonksiyonu alıyoruz

  useEffect(() => {
    fetchAllSongs(); // Sayfa yüklendiğinde şarkıları çekiyoruz
  }, [fetchAllSongs]); // fetchAllSongs fonksiyonu değiştiğinde tekrar çalıştırıyoruz

  if (isLoading) return null; // Eğer şarkılar yükleniyorsa hiçbir şey göstermiyoruz
  return (
    <div>
      <Topbar />{" "}
      {/* Sayfanın üst kısmında bulunan Topbar bileşenini render ediyoruz */}
      <ScrollArea className="h-[calc(100vh-100px)] mt-4">
        {" "}
        {/* Scrollable alan oluşturuyoruz */}
        <div className="flex items-center justify-between">
          {" "}
          {/* Header kısmı, şuan boş */}
          <Button
            variant="link"
            className="text-sm text-zinc-400 hover:text-white"
          ></Button>{" "}
          {/* Buton, gelecekte başka işlevler için kullanılabilir */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {" "}
          {/* Şarkıları grid halinde düzenliyoruz */}
          {songs.map(
            (
              song // songs dizisi üzerinden her bir şarkıyı render ediyoruz
            ) => (
              <div
                key={song._id}
                className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer" // Şarkı kartı tasarımı
              >
                <div className="relative mb-4">
                  {" "}
                  {/* Şarkının görsel kısmı */}
                  <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                    {" "}
                    {/* Görselin oranını koruyoruz ve ona gölge ekliyoruz */}
                    <img
                      src={song.imageUrl} // Şarkının görseli
                      alt={song.title} // Görselin alt metni, şarkı başlığı
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // Görselin stilini ve hover efektini ayarlıyoruz
                    />
                  </div>
                  <PlayButton song={song} />{" "}
                  {/* Şarkıya ait PlayButton bileşenini render ediyoruz */}
                </div>
                <h3 className="font-medium mb-2 truncate">{song.title}</h3>{" "}
                {/* Şarkı adı */}
                <p className="text-sm text-zinc-400 truncate">
                  {song.artist}
                </p>{" "}
                {/* Sanatçının adı */}
              </div>
            )
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShowAllSongs;
