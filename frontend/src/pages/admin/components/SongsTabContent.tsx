import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable"; 
import AddSongDialog from "./AddSongDialog"; 

const SongsTabContent = () => {
  return (
    <Card>
      {" "}
      {/* Kart bileşeni (şarkı listesi ve açıklama) */}
      <CardHeader>
        <div className="flex items-center justify-between">
          {" "}
          {/* Başlık ve açıklamayı yatayda hizalıyoruz */}
          <div>
            <CardTitle className="flex items-center gap-2">
              {" "}
              {/* Başlık kısmı, müzik simgesi ile birlikte */}
              <Music className="size-5 text-emerald-500" />{" "}
              {/* Müzik simgesi */}
              Songs Library {/* Başlık: Songs Library */}
            </CardTitle>
            <CardDescription>Manage your music tracks</CardDescription>{" "}
            {/* Açıklama: Şarkıların yönetimi */}
          </div>
          <AddSongDialog /> {/* Yeni şarkı eklemek için bir buton/diyalog */}
        </div>
      </CardHeader>
      <CardContent>
        <SongsTable /> {/* Şarkıları listeleyen tablo bileşeni */}
      </CardContent>
    </Card>
  );
};

export default SongsTabContent;
