import { Button } from "@/components/ui/button"; 
import { Slider } from "@/components/ui/slider"; 
import { usePlayerStore } from "@/stores/usePlayerStore"; 
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react"; 
import { useEffect, useRef, useState } from "react"; // 

const formatTime = (seconds: number) => {
  // Saniyeyi dakika:saniye formatına çevirir
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } =
    usePlayerStore(); // Store'dan gerekli çalar durumlarını alır

  const [volume, setVolume] = useState(75); // Ses düzeyini tutar (0–100)
  const [currentTime, setCurrentTime] = useState(0); // Şarkının geçerli süresini tutar
  const [duration, setDuration] = useState(0); // Şarkının toplam süresini tutar
  const audioRef = useRef<HTMLAudioElement | null>(null); // <audio> öğesine referans tutar

  useEffect(() => {
    audioRef.current = document.querySelector("audio"); // DOM'dan <audio> öğesini alır
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime); // Geçerli süreyi günceller
    const updateDuration = () => setDuration(audio.duration); // Toplam süreyi günceller

    audio.addEventListener("timeupdate", updateTime); // Zaman ilerledikçe süreyi günceller
    audio.addEventListener("loadedmetadata", updateDuration); // Metadata yüklendiğinde süresini alır

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false }); // Şarkı bittiğinde çalmayı durdurur
    };

    audio.addEventListener("ended", handleEnded); // Şarkı sonlandığında çalışır

    return () => {
      // Temizleme: Event listener'ları kaldırır
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong]); // currentSong değiştiğinde tekrar çalışır

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]; // Slider ile şarkı içinde gezinmeyi sağlar
    }
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Şu anda çalan şarkı bilgileri */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Oynatma kontrolleri */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="h-4 w-4" /> {/* Karışık çalma butonu */}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="h-4 w-4" /> {/* Önceki şarkıya geç */}
            </Button>

            <Button
              size="icon"
              className="bg-white hover:bg-white/80 text-black rounded-full h-8 w-8"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" /> // Duraklat
              ) : (
                <Play className="h-5 w-5" /> // Oynat
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="h-4 w-4" /> {/* Sonraki şarkıya geç */}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Repeat className="h-4 w-4" /> {/* Tekrar modu butonu */}
            </Button>
          </div>

          {/* Zaman çubuğu */}
          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {formatTime(currentTime)} {/* Geçerli süre */}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />
            <div className="text-xs text-zinc-400">{formatTime(duration)}</div>{" "}
            {/* Toplam süre */}
          </div>
        </div>

        {/* Ses kontrolü */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Mic2 className="h-4 w-4" />{" "}
            {/* Mikrofon butonu (genelde karaoke vs. için) */}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <ListMusic className="h-4 w-4" /> {/* Playlist butonu */}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-white text-zinc-400"
          >
            <Laptop2 className="h-4 w-4" />{" "}
            {/* Cihaz değiştir (örneğin bilgisayar/TV) */}
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
            >
              <Volume1 className="h-4 w-4" /> {/* Ses ikonu */}
            </Button>

            <Slider
              value={[volume]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => {
                setVolume(value[0]); // Ses seviyesini günceller
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100; // <audio> sesini günceller
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
