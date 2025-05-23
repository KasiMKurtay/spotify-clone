/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AxiosInstance } from "@/lib/axios";
import { useMusicStore } from "@/stores/useMusicStore";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface NewSong {
  title: string;
  artist: string;
  album: string;
  duration: string;
}

const AddSongDialog = () => {
  const { albums } = useMusicStore(); // Kullanıcı müzik albümlerini alıyor
  const [songDialogOpen, setSongDialogOpen] = useState(false); // Dialog açılma/kapama durumu
  const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumu

  const [newSong, setNewSong] = useState<NewSong>({
    title: "",
    artist: "",
    album: "",
    duration: "0",
  }); // Yeni şarkı bilgilerini tutan state

  const [files, setFiles] = useState<{
    audio: File | null;
    image: File | null;
  }>({
    audio: null,
    image: null,
  }); // Audio ve image dosyalarını tutan state

  const audioInputRef = useRef<HTMLInputElement>(null); // Audio input ref
  const imageInputRef = useRef<HTMLInputElement>(null); // Image input ref

  const handleSubmit = async () => {
    setIsLoading(true); // Yükleme başladı

    try {
      if (!files.audio || !files.image) {
        // Eğer dosyalar eksikse
        return toast.error("Please upload both audio and image files"); // Hata mesajı
      }

      const formData = new FormData(); // Form verisi oluşturuluyor

      formData.append("title", newSong.title); // Başlık ekleniyor
      formData.append("artist", newSong.artist); // Sanatçı ekleniyor
      formData.append("duration", newSong.duration); // Süre ekleniyor
      if (newSong.album && newSong.album !== "none") {
        // Albüm seçildiyse
        formData.append("albumId", newSong.album); // Albüm ekleniyor
      }

      formData.append("audioFile", files.audio); // Audio dosyası ekleniyor
      formData.append("imageFile", files.image); // Image dosyası ekleniyor

      await AxiosInstance.post("/admin/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // İçerik türü multipart
        },
      });

      setNewSong({
        title: "",
        artist: "",
        album: "",
        duration: "0",
      }); // Yeni şarkı verisi sıfırlanıyor

      setFiles({
        audio: null,
        image: null,
      }); // Dosyalar sıfırlanıyor
      toast.success("Song added successfully"); // Başarı mesajı
    } catch (error: any) {
      toast.error("Failed to add song: " + error.message); // Hata mesajı
    } finally {
      setIsLoading(false); // Yükleme tamamlandı
    }
  };

  return (
    <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 h-4 w-4" /> {/* Plus ikonu */}
          Add Song {/* Buton üzerinde "Add Song" yazısı */}
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Song</DialogTitle> {/* Dialog başlığı */}
          <DialogDescription>
            Add a new song to your music library {/* Açıklama */}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Audio dosyası seçme */}
          <input
            type="file"
            accept="audio/*"
            ref={audioInputRef}
            hidden
            onChange={
              (e) =>
                setFiles((prev) => ({ ...prev, audio: e.target.files![0] })) // Dosya seçildiğinde state güncelleniyor
            }
          />

          {/* Image dosyası seçme */}
          <input
            type="file"
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            onChange={
              (e) =>
                setFiles((prev) => ({ ...prev, image: e.target.files![0] })) // Dosya seçildiğinde state güncelleniyor
            }
          />

          {/* Image yükleme alanı */}
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => imageInputRef.current?.click()} // Image yüklemek için tıklanabilir alan
          >
            <div className="text-center">
              {files.image ? (
                <div className="space-y-2">
                  <div className="text-sm text-emerald-500">
                    Image selected:
                  </div>
                  <div className="text-xs text-zinc-400">
                    {files.image.name.slice(0, 20)}{" "}
                    {/* Seçilen dosyanın ismi */}
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="h-6 w-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload artwork {/* Kullanıcıya yükleme alanı */}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File {/* Dosya seçme butonu */}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Audio yükleme alanı */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => audioInputRef.current?.click()} // Dosya seçme butonuna tıklanınca input açılır
                className="w-full"
              >
                {files.audio
                  ? files.audio.name.slice(0, 20) // Seçilen dosyanın ismi
                  : "Choose Audio File"}{" "}
                {/* Dosya seçilmemişse buton üzerinde "Choose Audio File" */}
              </Button>
            </div>
          </div>

          {/* Diğer form alanları */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={newSong.title}
              onChange={
                (e) => setNewSong({ ...newSong, title: e.target.value }) // Başlık değiştiğinde state güncelleniyor
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={newSong.artist}
              onChange={
                (e) => setNewSong({ ...newSong, artist: e.target.value }) // Sanatçı adı değiştiğinde state güncelleniyor
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (seconds)</label>
            <Input
              type="number"
              min="0"
              value={newSong.duration}
              onChange={
                (e) =>
                  setNewSong({ ...newSong, duration: e.target.value || "0" }) // Süre değiştiğinde state güncelleniyor
              }
              className="bg-zinc-800 border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Album (Optional)</label>
            <Select
              value={newSong.album}
              onValueChange={
                (value) => setNewSong({ ...newSong, album: value }) // Albüm değiştiğinde state güncelleniyor
              }
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700">
                <SelectValue placeholder="Select album" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="none">No Album (Single)</SelectItem>
                {albums.map((album) => (
                  <SelectItem key={album._id} value={album._id}>
                    {album.title} {/* Albüm listesi */}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setSongDialogOpen(false)} // Dialog kapama butonu
            disabled={isLoading} // Yükleniyor durumu
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Uploading..." : "Add Song"}{" "}
            {/* Yükleme esnasında buton metni */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddSongDialog;
