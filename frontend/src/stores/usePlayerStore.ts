import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null; // Şu anda çalan şarkı
  isPlaying: boolean; // Şarkı oynatılıyor mu?
  queue: Song[]; // Oynatma sırasındaki şarkılar
  currentIndex: number; // Şu anki şarkının queue'daki index'i

  initializeQueue: (songs: Song[]) => void; // Sırayı başlatır
  playAlbum: (songs: Song[], startIndex?: number) => void; // Albüm çalmaya başlar
  setCurrentSong: (song: Song | null) => void; // Şu anki şarkıyı değiştirir
  togglePlay: () => void; // Oynatma/durdurma işlemi
  playNext: () => void; // Sonraki şarkıya geçiş
  playPrevious: () => void; // Önceki şarkıya dönüş
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null, // Başlangıçta şarkı yok
  isPlaying: false, // Başlangıçta çalma durumu pasif
  queue: [], // Başlangıçta oynatma sırası boş
  currentIndex: -1, // Geçerli şarkı index'i belirlenmemiş

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs, // Şarkıları sıraya al
      currentSong: get().currentSong || songs[0], // Zaten şarkı varsa onu, yoksa ilkini ata
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex, // Index belirlenmemişse 0 yap
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return; // Liste boşsa işlem yapma

    const song = songs[startIndex]; // Başlangıç şarkısını belirle

    set({
      queue: songs, // Sırayı güncelle
      currentSong: song, // Seçilen şarkıyı çal
      currentIndex: startIndex, // Index'i ata
      isPlaying: true, // Çalma başlasın
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return; // Şarkı null'sa işlem yapma

    const songIndex = get().queue.findIndex((s) => s._id === song._id); // Şarkının sıradaki index'ini bul

    set({
      currentSong: song, // Şarkıyı ayarla
      isPlaying: true, // Oynatmayı başlat
      currentIndex: songIndex !== -1 ? songIndex : get().currentIndex, // Index varsa ata
    });
  },

  togglePlay: () => {
    const willStartPlaying = !get().isPlaying; // Çalma durumunu tersine çevir

    set({
      isPlaying: willStartPlaying, // Yeni çalma durumunu ata
    });
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1; // Bir sonraki şarkının index'i

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex]; // Sıradaki şarkıyı al
      set({
        currentSong: nextSong, // Şarkıyı ata
        currentIndex: nextIndex, // Index'i güncelle
        isPlaying: true, // Çalmaya devam et
      });
    } else {
      set({
        isPlaying: false, // Liste bittiyse durdur
      });
    }
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1; // Önceki şarkının index'i

    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex]; // Önceki şarkıyı al
      set({
        currentSong: prevSong, // Şarkıyı ata
        currentIndex: prevIndex, // Index'i güncelle
        isPlaying: true, // Çalmaya devam et
      });
    } else {
      set({
        isPlaying: false, // Geri gidecek şarkı yoksa durdur
      });
    }
  },
}));
