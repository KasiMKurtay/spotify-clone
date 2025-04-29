import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton"; // Yüklenme sırasında iskelet ekranı gösterir
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Kullanıcı avatar bileşenleri
import { ScrollArea } from "@/components/ui/scroll-area"; // Scroll yapılabilen alan bileşeni
import { useChatStore } from "@/stores/useChatStore"; // Zustand store'dan verileri çeker

const UsersList = () => {
  // Zustand'dan gerekli state ve fonksiyonları alıyoruz
  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } =
    useChatStore();

  return (
    <div className="border-r border-zinc-800">
      {" "}
      {/* Sağ tarafı çizgili kutu */}
      <div className="flex flex-col h-full">
        {" "}
        {/* Tüm yüksekliği kaplayan dikey kutu */}
        <ScrollArea className="h-[calc(100vh-280px)]">
          {" "}
          {/* Scroll alanı */}
          <div className="space-y-2 p-4">
            {" "}
            {/* Kullanıcı listesi kutusu */}
            {isLoading ? (
              // Veriler yükleniyorsa iskelet göster
              <UsersListSkeleton />
            ) : (
              // Aksi halde kullanıcıları sırayla göster
              users.map((user) => (
                <div
                  key={user._id} // Her kullanıcıya benzersiz anahtar ver
                  onClick={() => setSelectedUser(user)} // Tıklanınca kullanıcı seçilir
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 
										rounded-lg cursor-pointer transition-colors
                    ${
                      selectedUser?.clerkId === user.clerkId
                        ? "bg-zinc-800" // Seçilen kullanıcı koyu renkli arka plan
                        : "hover:bg-zinc-800/50" // Üzerine gelinince gri arka plan
                    }`}
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user.imageUrl} /> {/* Profil resmi */}
                      <AvatarFallback>{user.fullName[0]}</AvatarFallback>{" "}
                      {/* Profil resmi yoksa adının baş harfi */}
                    </Avatar>

                    {/* Kullanıcının online olup olmadığını gösteren küçük nokta */}
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                        ${
                          onlineUsers.has(user.clerkId)
                            ? "bg-green-500" // Online ise yeşil
                            : "bg-zinc-500" // Offline ise gri
                        }`}
                    />
                  </div>

                  {/* Kullanıcının adı - sadece büyük ekranlarda görünür */}
                  <div className="flex-1 min-w-0 lg:block hidden">
                    <span className="font-medium truncate">
                      {user.fullName}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default UsersList;
