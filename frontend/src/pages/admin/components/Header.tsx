import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      {" "}
      {/* Başlık kısmını sağa ve sola hizalı şekilde yerleştiriyoruz */}
      <div className="flex items-center gap-3 mb-8">
        {" "}
        {/* Logo ve açıklama kısmını hizalı şekilde düzenliyoruz */}
        <Link to="/" className="rounded-lg">
          {" "}
          {/* Anasayfaya yönlendiren bağlantı */}
          <img src="/spotify.png" className="size-10 text-black" />{" "}
          {/* Spotify logosu */}
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Music Manager</h1>{" "}
          {/* Başlık: Music Manager */}
          <p className="text-zinc-400 mt-1">Manage your music catalog</p>{" "}
          {/* Alt açıklama: Müzik kataloğunu yönet */}
        </div>
      </div>
      <UserButton />{" "}
      {/* Kullanıcı giriş butonu (Clerk tarafından sağlanan bileşen) */}
    </div>
  );
};

export default Header;
