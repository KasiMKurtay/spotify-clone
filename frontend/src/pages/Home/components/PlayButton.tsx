import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

// Her şarkı kutusuna ait oynat/duraklat butonu
const PlayButton = ({ song }: { song: Song }) => {
  // Store'dan gerekli veriler alınıyor
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();

  // Bu butona ait şarkı şu anda çalan şarkı mı?
  const isCurrentSong = currentSong?._id === song._id;

  // Butona tıklanınca ne olacak?
  const handlePlay = () => {
    if (isCurrentSong) togglePlay(); // Aynı şarkıysa oynat/duraklat
    else setCurrentSong(song); // Farklıysa yeni şarkıyı başlat
  };

  return (
    <Button
      size="icon"
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0 ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      }`}
    >
      {/* Şu anki şarkı buysa ve çalıyorsa duraklat ikonu göster, yoksa oynat */}
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};

export default PlayButton;
