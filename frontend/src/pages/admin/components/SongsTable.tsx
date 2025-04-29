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
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore(); // Müzik store'undan şarkı verileri ve işlemleri

  // Yükleniyor durumu
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs..</div>{" "}
        {/* Yükleniyor mesajı */}
      </div>
    );
  }

  // Hata durumu
  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-400">{error}</div> {/* Hata mesajı */}
      </div>
    );
  }

  return (
    <Table>
      {" "}
      {/* Şarkıların listelendiği tablo bileşeni */}
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>{" "}
          {/* Görsel için boş alan */}
          <TableHead>Title</TableHead> {/* Başlık */}
          <TableHead>Artist</TableHead> {/* Sanatçı */}
          <TableHead>Release Date</TableHead> {/* Yayınlanma tarihi */}
          <TableHead className="text-right">Actions</TableHead> {/* Eylemler */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={song.imageUrl}
                alt={song.title}
                className="size-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell> {/* Sanatçı adı */}
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="size-4" /> {/* Tarih simgesi */}
                {song.createdAt.split("T")[0]} {/* Yayınlanma tarihi formatı */}
              </span>
            </TableCell>
            <TableCell className="text-right">
              {" "}
              {/* Silme butonu */}
              <div className="flex gap-2 justify-end">
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={() => deleteSong(song._id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongsTable;
