import Topbar from "@/components/Topbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  // Music store'dan şarkı verilerini almak için gerekli fonksiyonlar ve durumlar
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();

  // Bileşen ilk yüklendiğinde şarkıları çekmek için useEffect kullanımı
  useEffect(() => {
    // Şarkıları çekmek için gerekli fonksiyonları çağırıyoruz
    fetchFeaturedSongs();
    fetchTrendingSongs();
    fetchMadeForYouSongs();
  }, [fetchFeaturedSongs, fetchTrendingSongs, fetchMadeForYouSongs]); // Bağımlılık dizisi, sadece bu fonksiyonlar değiştiğinde çalışır

  // Konsolda şarkı verilerini kontrol etmek için loglama
  console.log({
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  });

  return (
    <main className="rounded-lg overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      {/* Sayfanın üst kısmındaki Topbar bileşenini render ediyoruz */}
      <Topbar />

      {/* Sayfa içeriği için ScrollArea bileşeni kullanılıyor */}
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          {/* Ana başlık */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>

          {/* FeaturedSection, öne çıkan şarkılar bölümü */}
          <FeaturedSection />

          {/* Kullanıcıya özel ve popüler şarkılar için ayrı bölümler */}
          <div className="space-y-8">
            {/* Made For You başlıklı şarkılar */}
            <SectionGrid
              title="Made For You"
              songs={madeForYouSongs}
              isLoading={isLoading}
            />
            {/* Trending Songs başlıklı popüler şarkılar */}
            <SectionGrid
              title="Trending Songs"
              songs={trendingSongs}
              isLoading={isLoading}
            />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
