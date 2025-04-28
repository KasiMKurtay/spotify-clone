import { Song } from "@/types";
import { Button } from "@/components/ui/button";
import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import PlayButton from "./PlayButton";
import { Link } from "react-router-dom";

// Bileşenin props'ları: başlık, şarkı listesi ve yüklenme durumu
type SectionGridProps = {
  title: string;
  songs: Song[];
  isLoading: boolean;
};


const SectionGrid = ({ songs, title, isLoading }: SectionGridProps) => {
  // Yüklenme durumundaysa iskelet bileşenini göster
  if (isLoading) return <SectionGridSkeleton />;

  return (
    <div className="mb-8">
      {/* Başlık ve "Show all" butonu */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          {/* Link bileşenini sadece yazıya sar */}
          <Link to="/ShowAllSongs">Show All Songs</Link>
        </Button>
      </div>

      {/* Şarkıları grid şeklinde listele */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
          >
            {/* Şarkı görseli */}
            <div className="relative mb-4">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105"
                />
              </div>
              <PlayButton song={song} />
            </div>

            {/* Şarkı başlığı */}
            <h3 className="font-medium mb-2 truncate">{song.title}</h3>

            {/* Sanatçı adı */}
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionGrid;
