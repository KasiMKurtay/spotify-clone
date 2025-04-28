import { Button } from "@/components/ui/button";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import PlayButton from "./PlayButton";
import Topbar from "@/components/Topbar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const ShowAllSongs = () => {
  const { songs, isLoading, fetchAllSongs } = useMusicStore();

  useEffect(() => {
    fetchAllSongs();
  }, [fetchAllSongs]);

  if (isLoading) return null;
  return (
    <div>
      <Topbar />
      <ScrollArea className="h-[calc(100vh-100px)] mt-4" >
        <div className="flex items-center justify-between">
          <Button
            variant="link"
            className="text-sm text-zinc-400 hover:text-white"
          ></Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {songs.map((song) => (
            <div
              key={song._id}
              className="bg-zinc-800/40 p-4 rounded-md hover:bg-zinc-700/40 transition-all group cursor-pointer"
            >
              <div className="relative mb-4">
                <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                  <img
                    src={song.imageUrl}
                    alt={song.title}
                    className="w-full h-full object-cover transition-transform duration-300 
									group-hover:scale-105"
                  />
                </div>
                <PlayButton song={song} />
              </div>

              <h3 className="font-medium mb-2 truncate">{song.title}</h3>

              <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ShowAllSongs;
