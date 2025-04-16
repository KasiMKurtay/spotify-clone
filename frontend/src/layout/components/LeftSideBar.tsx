import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore(); //useMusicStore hook'undan albümleri fetchAlbumü ve isLoading

  useEffect(() => {
    //useEffect hook'u, bileşen her render edildiğinde çalışacak
    fetchAlbums(); //Albümleri çeker
  }, [fetchAlbums]); //fetchAlbums fonkiyonu değiştinde yeniden çalışır

  console.log({ albums });

  return (
    <div className="h-full flex flex-col gap-2">
      {/* Ana konteyner */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">Home</span>{" "}
            {/* Ana sayfa bağlantısı */}
          </Link>
          <SignedIn>
            <Link
              to={"/"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "w-ful justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">Messages</span>{" "}
              {/* Mesajlar Bağlantısı */}
            </Link>
          </SignedIn>
        </div>
      </div>
      {/* Library */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlist</span>{" "}
            {/* Albüm Başlığı */}
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              <PlaylistSkeleton /> /* Eğer albümler yükleniyorsa skeleton gösterilir */
            ) : (
              albums.map((album /* Albümler listelenir */) => (
                <Link
                  to={`/albums/${album._id}`} /* Albüme  tıklanırsa, albümün detay sayfasına yönlendirilir */
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>{" "}
                    {/* Albüm başlığı */}
                    <p className="text-sm text-zinc-400 truncate">
                      {" "}
                      Album • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSideBar;
