import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  // Ses elementine referans
  const audioRef = useRef<HTMLAudioElement>(null);
  // Önceki şarkı bilgilerini tutmak için referans
  const prevSongRef = useRef<string | null>(null);

  // Player store'dan güncel şarkı, oynatma durumu ve sonraki şarkıyı çalma fonksiyonu
  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Oynatma durumu değiştiğinde sesin oynatılması ya da durdurulması
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play(); // Şarkı çalmaya başla
    } else {
      audioRef.current?.pause(); // Şarkıyı durdur
    }
  }, [isPlaying]);

  // Şarkı bittiğinde bir sonraki şarkıya geçiş yapılması için event listener
  useEffect(() => {
    const audio = audioRef.current;

    // Şarkı bittiğinde playNext fonksiyonunu çağır
    const handleEnded = () => {
      playNext();
    };

    // Olay dinleyicisini ekle
    audio?.addEventListener("ended", handleEnded);

    // Temizleme fonksiyonu: bileşen unmount olduğunda olay dinleyicisini kaldır
    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // Şarkı değiştiğinde ses kaynağını güncelle ve oynat
  useEffect(() => {
    if (!audioRef.current || !currentSong) return; // Eğer şarkı yoksa veya ses elementi yoksa hiçbir şey yapma

    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      // Yeni şarkının ses kaynağını ata
      audio.src = currentSong?.audioUrl;

      // Şarkıyı baştan başlat
      audio.currentTime = 0;

      // Önceki şarkı bilgisini güncelle
      prevSongRef.current = currentSong?.audioUrl;

      // Eğer şarkı çalıyorsa, şarkıyı çalmaya başla
      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />; // Ses bileşeni
};

export default AudioPlayer;
