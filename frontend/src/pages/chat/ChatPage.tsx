import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import UsersList from "./UsersList";

const ChatPage = () => {
  // Chat sayfasının bileşeni başlatılır
  const { user } = useUser(); // Giriş yapan kullanıcıyı alır
  const { messages, selectedUser, fetchUsers, fetchMessages } = useChatStore();
  // Store'dan mesajlar, seçili kullanıcı, kullanıcıları çekme ve mesajları çekme fonksiyonları alınır

  useEffect(() => {
    if (user) fetchUsers(); // Kullanıcı varsa kullanıcı listesini getirir
  }, [fetchUsers, user]); // user veya fetchUsers değiştiğinde çalışır

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.clerkId); // Bir kullanıcı seçildiğinde o kullanıcıya ait mesajları getirir
    }
  }, [selectedUser, fetchMessages]); // selectedUser veya fetchMessages değiştiğinde çalışır

  return (
    <main className="h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      {/* Sayfanın ana yapısı, arkaplan gradyeni, köşe yuvarlatma ve taşma gizleme */}
      <Topbar /> {/* Sayfanın üst kısmındaki topbar bileşeni */}
      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        {/* Grid yapısı: büyük ekranlarda sol 300px kullanıcı listesi, sağ kalan alan mesajlar için.
            Küçük ekranlarda 80px sol kısım, geri kalanı sağ kısım */}
        <UsersList /> {/* Sol sütunda kullanıcı listesini gösterir */}
      </div>
    </main>
  );
};

export default ChatPage;
