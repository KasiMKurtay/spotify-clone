import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore";
import PlayButton from "./PlayButton";

const FeaturedSection = () => {
  // Global store'dan öne çıkan şarkıları, yüklenme durumunu ve hatayı alıyoruz
  const { isLoading, featuredSongs, error } = useMusicStore();

  // Yükleniyorsa iskelet bileşeni göster
  if (isLoading) return <FeaturedGridSkeleton />;

  // Hata varsa kullanıcıya göster
  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  return (
    // Şarkı kartlarını grid olarak listele
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden 
          hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          {/* Şarkı görseli */}
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />

          {/* Şarkı bilgileri */}
          <div className="flex-1 p-4">
            {/* Şarkı adı */}
            <p className="font-medium truncate">{song.title}</p>

            {/* Sanatçı adı */}
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
          <PlayButton song={song} />
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
