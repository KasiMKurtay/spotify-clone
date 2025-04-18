// Gerekli bileşenleri ve ikonları içe aktar
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { HeadphonesIcon, Music, Users } from "lucide-react";
import { useEffect } from "react";

// Arkadaşların dinlediği müzikleri gösteren ana bileşen
const FriendsActivity = () => {
  // Zustand store'dan kullanıcıları al
  const { users, fetchUsers } = useChatStore();
  // Clerk ile oturum açmış kullanıcıyı al
  const { user } = useUser();

  // Kullanıcı varsa kullanıcı listesini çek
  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  // Şimdilik sadece sabit bir değer (ileride her kullanıcı için ayrı kontrol eklenebilir)
  const isPlaying = false;

  return (
    <div className="h-full bg-zinc-900 rounded-lg flex flex-col">
      {/* Başlık alanı */}
      <div className="p-4 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0" />
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>

      {/* Kullanıcı oturum açmamışsa uyarı göster */}
      {!user && <LoginPrompt />}

      {/* Liste scroll alanı */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {/* Kullanıcılar listeleniyor */}
          {users.map((user) => (
            <div
              key={user._id}
              className="cursor-pointer hover:bg-zinc-800/50 rounded-md p-3 transition-color group"
            >
              <div className="flex items-start gap-3">
                {/* Avatar ve çevrimiçi durumu */}
                <div className="relative">
                  <Avatar className="size-10 border border-zinc-800">
                    <AvatarImage src={user.imageUrl} alt={user.fullName} />
                    <AvatarFallback>{user.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-zinc-500`}
                    aria-hidden="true"
                  />
                </div>

                {/* Kullanıcı bilgileri ve müzik durumu */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-white">
                      {user.fullName}
                    </span>

                    {/* Müzik çalıyorsa müzik ikonu göster */}
                    {isPlaying && (
                      <Music className="size-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>

                  {/* Müzik dinleniyorsa şarkı bilgisi, değilse 'Idle' yazısı */}
                  {isPlaying ? (
                    <div className="mt-1">
                      <div className="mt-1 text-sm text-white font-medium truncate">
                        Cardigan
                      </div>
                      <div className="text-sx text-zinc-400 truncate">
                        by Taylor Swift
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 text-xs text-zinc-400">Idle</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;

// Kullanıcı giriş yapmamışsa gösterilen bileşen
const LoginPrompt = () => (
  <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
    <div className="relative">
      {/* Arka plan parıltı efekti */}
      <div
        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg
         opacity-75 animate-pulse"
        aria-hidden="true"
      />
      <div className="relative bg-zinc-900 rounded-full p-4">
        <HeadphonesIcon className="size-8 text-emerald-400" />
      </div>
    </div>

    {/* Bilgilendirme yazısı */}
    <div className="space-y-2 max-w-[250px]">
      <h3 className="text-lg font-semibold text-white">
        See What Friends Are Playing
      </h3>
      <p className="text-sm text-zinc-400">
        Login to discover what music your friends are enjoying right now
      </p>
    </div>
  </div>
);
