import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react"; // Clerk'in oturum açma ve kapama işlemleri için gerekli bileşenler
import { LayoutDashboardIcon } from "lucide-react"; // Admin paneli için ikon
import { Link } from "react-router-dom"; // React Router'dan Link bileşeni, sayfa yönlendirmeleri için kullanılır
import SignInOAuthButtons from "./SignInOAuthButtons"; // Google ile giriş yapmak için oluşturduğumuz bileşen

const Topbar = () => {
  const isAdmin = false; // Admin olup olmadığını belirten değişken (şu an için admin değil)

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Başlık kısmı */}
      <div className="flex gap-2 items-center">Spotify</div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          // Eğer kullanıcı admin ise, admin paneline yönlendiren bir link gösterilir
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        {/* Kullanıcı oturum açmışsa çıkış yapma butonu */}
        <SignedIn>
          <SignOutButton />
        </SignedIn>

        {/* Kullanıcı oturum açmamışsa, Google ile giriş yapma butonu */}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
