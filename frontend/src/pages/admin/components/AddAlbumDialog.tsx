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
import { AxiosInstance } from "@/lib/axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const AddAlbumDialog = () => {
  const [albumDialogOpen, setAlbumDialogOpen] = useState(false); // Dialog penceresinin açık/kapalı durumunu yönetir.
  const [isLoading, setIsLoading] = useState(false); // Form gönderildiğinde loading durumunu yönetir.
  const fileInputRef = useRef<HTMLInputElement>(null); // Dosya input referansını saklar.

  const [newAlbum, setNewAlbum] = useState({
    // Yeni albümün bilgilerini saklar.
    title: "",
    artist: "",
    releaseYear: new Date().getFullYear(),
  });

  const [imageFile, setImageFile] = useState<File | null>(null); // Albüm kapağına seçilen dosyayı saklar.

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Görsel dosyasının seçilmesi durumunda çalışacak fonksiyon.
    const file = e.target.files?.[0]; // Dosyayı alır.
    if (file) {
      setImageFile(file); // Dosya seçildiğinde imageFile state'ini günceller.
    }
  };

  const handleSubmit = async () => {
    // Albüm ekleme işlemi için form submit fonksiyonu.
    setIsLoading(true); // Yükleniyor durumunu true yapar.

    try {
      if (!imageFile) {
        return toast.error("Please upload an image"); // Görsel seçilmemişse hata mesajı gösterir.
      }

      const formData = new FormData(); // FormData nesnesi oluşturur.
      formData.append("title", newAlbum.title); // Albüm başlığını formData'ya ekler.
      formData.append("artist", newAlbum.artist); // Sanatçıyı formData'ya ekler.
      formData.append("releaseYear", newAlbum.releaseYear.toString()); // Çıkış yılını formData'ya ekler.
      formData.append("imageFile", imageFile); // Albüm görselini formData'ya ekler.

      await AxiosInstance.post("/admin/albums", formData, {
        // Albüm verilerini API'ye gönderir.
        headers: {
          "Content-Type": "multipart/form-data", // Form verisini multipart olarak gönderir.
        },
      });

      setNewAlbum({
        // Formu sıfırlar.
        title: "",
        artist: "",
        releaseYear: new Date().getFullYear(),
      });
      setImageFile(null); // Seçilen görseli sıfırlar.
      setAlbumDialogOpen(false); // Dialog penceresini kapatır.
      toast.success("Album created successfully"); // Başarı mesajı gösterir.
    } catch (error: any) {
      toast.error("Failed to create album: " + error.message); // Hata mesajı gösterir.
    } finally {
      setIsLoading(false); // Yükleniyor durumunu false yapar.
    }
  };

  return (
    <Dialog open={albumDialogOpen} onOpenChange={setAlbumDialogOpen}>
      {" "}
      {/* Dialog bileşeni ile albüm ekleme penceresini açar */}
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-600 text-white">
          <Plus className="mr-2 h-4 w-4" />{" "}
          {/* Plus icon'u ile albüm ekleme butonu */}
          Add Album
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700">
        {" "}
        {/* Dialog içeriği */}
        <DialogHeader>
          <DialogTitle>Add New Album</DialogTitle> {/* Başlık */}
          <DialogDescription>
            Add a new album to your collection {/* Açıklama */}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {" "}
          {/* Form elemanlarını düzenler */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                <Upload className="h-6 w-6 text-zinc-400" />{" "}
                {/* Upload ikonu */}
              </div>
              <div className="text-sm text-zinc-400 mb-2">
                {imageFile ? imageFile.name : "Upload album artwork"}{" "}
                {/* Seçilen dosya adı veya yükleme mesajı */}
              </div>
              <Button variant="outline" size="sm" className="text-xs">
                Choose File
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Album Title</label>{" "}
            {/* Albüm başlığı etiketi */}
            <Input
              value={newAlbum.title}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, title: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter album title"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Artist</label>{" "}
            {/* Sanatçı etiketi */}
            <Input
              value={newAlbum.artist}
              onChange={(e) =>
                setNewAlbum({ ...newAlbum, artist: e.target.value })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter artist name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release Year</label>{" "}
            {/* Çıkış yılı etiketi */}
            <Input
              type="number"
              value={newAlbum.releaseYear}
              onChange={(e) =>
                setNewAlbum({
                  ...newAlbum,
                  releaseYear: parseInt(e.target.value),
                })
              }
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter release year"
              min={1900}
              max={new Date().getFullYear()}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setAlbumDialogOpen(false)}
            disabled={isLoading}
          >
            Cancel {/* İptal butonu */}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-violet-500 hover:bg-violet-600"
            disabled={
              isLoading || !imageFile || !newAlbum.title || !newAlbum.artist
            }
          >
            {isLoading ? "Creating..." : "Add Album"}{" "}
            {/* Yükleniyorsa "Creating...", değilse "Add Album" */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddAlbumDialog;
