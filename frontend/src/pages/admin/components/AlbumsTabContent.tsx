import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Library } from "lucide-react";
import AlbumsTable from "./AlbumsTable";
import AddAlbumDialog from "./AddAlbumDialog";

const AlbumsTabContent = () => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50">
      {" "}
      {/* Card bileşeni, şık bir görünüm için kullanılıyor */}
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {" "}
              {/* Başlık, albüm kütüphanesini tanımlar */}
              <Library className="size-5 text-violet-500" />{" "}
              {/* Kütüphane simgesi */}
              Album Library
            </CardTitle>
            <CardDescription>
              {" "}
              {/* Açıklama, albüm koleksiyonunu yönetmek için */}
              Manage your album collection
            </CardDescription>
          </div>
          <AddAlbumDialog /> {/* Albüm eklemek için bir dialog bileşeni */}
        </div>
      </CardHeader>
      <CardContent>
        <AlbumsTable /> {/* Albüm verilerini gösteren tablo */}
      </CardContent>
    </Card>
  );
};

export default AlbumsTabContent;
