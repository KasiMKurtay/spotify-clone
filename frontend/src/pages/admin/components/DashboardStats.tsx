import { useMusicStore } from "@/stores/useMusicStore";
import { Library, ListMusic, PlayCircle, Users2 } from "lucide-react";
import StatsCard from "./StatsCard";

const DashboardStats = () => {
  const { stats } = useMusicStore(); // Store'dan istatistik verilerini alıyoruz

  const statsData = [
    {
      icon: ListMusic, // Şarkı ikonu
      label: "Total Songs", // Toplam şarkılar etiketi
      value: stats?.totalSongs?.toString() ?? "0", // Toplam şarkı sayısı, eğer yoksa "0"
      bgColor: "bg-emerald-500/10", // Arka plan rengi
      iconColor: "text-emerald-500", // İkon rengi
    },
    {
      icon: Library, // Albüm ikonu
      label: "Total Albums", // Toplam albümler etiketi
      value: stats?.totalAlbums?.toString() ?? "0", // Toplam albüm sayısı, eğer yoksa "0"
      bgColor: "bg-violet-500/10", // Arka plan rengi
      iconColor: "text-violet-500", // İkon rengi
    },
    {
      icon: Users2, // Sanatçı ikonu
      label: "Total Artists", // Toplam sanatçılar etiketi
      value: stats?.totalArtists?.toString() ?? "0", // Toplam sanatçı sayısı, eğer yoksa "0"
      bgColor: "bg-orange-500/10", // Arka plan rengi
      iconColor: "text-orange-500", // İkon rengi
    },
    {
      icon: PlayCircle, // Kullanıcı ikonu
      label: "Total Users", // Toplam kullanıcılar etiketi
      value: stats?.totalUsers?.toLocaleString() ?? "0", // Toplam kullanıcı sayısı, formatlanmış
      bgColor: "bg-sky-500/10", // Arka plan rengi
      iconColor: "text-sky-500", // İkon rengi
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.label} // Her bir stat için benzersiz anahtar
          icon={stat.icon} // İkon bileşeni
          label={stat.label} // Etiket
          value={stat.value} // Değer
          bgColor={stat.bgColor} // Arka plan rengi
          iconColor={stat.iconColor} // İkon rengi
        />
      ))}
    </div>
  );
};
export default DashboardStats;
