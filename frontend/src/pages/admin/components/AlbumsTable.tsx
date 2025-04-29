import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumsTable = () => {
  const { albums, deleteAlbum, fetchAlbums } = useMusicStore(); // Store'dan albümleri, silme ve albüm çekme işlevlerini alıyoruz.

  useEffect(() => {
    fetchAlbums(); // Albümleri sayfa yüklendiğinde çekiyoruz
  }, [fetchAlbums]);

  return (
    <Table>
      {" "}
      {/* Tablo bileşeni, albüm verilerini göstermek için kullanılıyor */}
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>{" "}
          {/* Boş bir hücre (fotoğraf için) */}
          <TableHead>Title</TableHead> {/* Albüm başlığı */}
          <TableHead>Artist</TableHead> {/* Albüm sanatçısı */}
          <TableHead>Release Year</TableHead> {/* Albüm çıkış yılı */}
          <TableHead>Songs</TableHead> {/* Albümdeki şarkı sayısı */}
          <TableHead className="text-right">Actions</TableHead>{" "}
          {/* Eylem butonları */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map(
          (
            album // Albümler listesi üzerinden dönülüp her bir albüm için satır oluşturuluyor
          ) => (
            <TableRow key={album._id} className="hover:bg-zinc-800/50">
              <TableCell>
                <img
                  src={album.imageUrl} // Albüm resmi
                  alt={album.title} // Albüm başlığı
                  className="w-10 h-10 rounded object-cover" // Resmin boyutlandırılması ve yuvarlatılması
                />
              </TableCell>
              <TableCell className="font-medium">{album.title}</TableCell>{" "}
              {/* Albüm başlığı */}
              <TableCell>{album.artist}</TableCell> {/* Albüm sanatçısı */}
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="h-4 w-4" /> {/* Takvim simgesi */}
                  {album.releaseYear} {/* Albüm çıkış yılı */}
                </span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Music className="h-4 w-4" /> {/* Müzik simgesi */}
                  {album.songs.length} songs {/* Albümdeki şarkı sayısı */}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost" // Butonun tasarımı
                    size="sm" // Küçük boyut
                    onClick={() => deleteAlbum(album._id)} // Albüm silme işlemi
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="h-4 w-4" /> {/* Silme simgesi */}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default AlbumsTable;
