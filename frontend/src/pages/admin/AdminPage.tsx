import { useAuthStore } from "@/stores/useAuthStore";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumsTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";

const AdminPage = () => {
  // Kullanıcı admin olup olmadığını ve loading durumunu auth store'dan alıyoruz
  const { isAdmin, isLoading } = useAuthStore();

  // Müzik verilerini almak için music store'dan gerekli metodları alıyoruz
  const { fetchAlbums, fetchAllSongs, fetchStats } = useMusicStore();

  // Sayfa yüklendiğinde müzik verilerini alıyoruz
  useEffect(() => {
    fetchAlbums();
    fetchAllSongs();
    fetchStats();
  }, [fetchAlbums, fetchAllSongs, fetchStats]);

  // Eğer kullanıcı admin değilse ve yükleniyor değilse 'Unauthorized' mesajı gösteriyoruz
  if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900
   to-black text-zinc-100 p-8"
    >
      <Header /> {/* Header bileşeni render ediliyor */}
      <DashboardStats /> {/* Dashboard istatistik bileşeni render ediliyor */}
      {/* Sekmelerin düzenini oluşturuyoruz */}
      <Tabs defaultValue="songs" className="space-y-6">
        <TabsList className="p-1 bg-zinc-800/50">
          {" "}
          {/* Sekme listesi */}
          <TabsTrigger
            value="songs"
            className="data-[state=active]:bg-zinc-700" // Aktif sekme stilini belirliyoruz
          >
            <Music className="mr-2 size-4" /> {/* Şarkı sekmesi ikonu */}
            Songs
          </TabsTrigger>
          <TabsTrigger
            value="albums"
            className="data-[state=active]:bg-zinc-700" // Aktif sekme stilini belirliyoruz
          >
            <Album className="mr-2 size-4" /> {/* Albüm sekmesi ikonu */}
            Albums
          </TabsTrigger>
        </TabsList>

        {/* Sekmelerin içeriklerini tanımlıyoruz */}
        <TabsContent value="songs">
          <SongsTabContent /> {/* Şarkılar sekmesinin içeriği */}
        </TabsContent>
        <TabsContent value="albums">
          <AlbumsTabContent /> {/* Albümler sekmesinin içeriği */}
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default AdminPage;
