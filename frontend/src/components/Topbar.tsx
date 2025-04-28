import { SignedOut, UserButton } from "@clerk/clerk-react"; // Clerk'in oturum açma ve kapama işlemleri için gerekli bileşenler
import { LayoutDashboardIcon } from "lucide-react"; // Admin paneli için ikon
import { Link } from "react-router-dom"; // React Router'dan Link bileşeni, sayfa yönlendirmeleri için kullanılır
import SignInOAuthButtons from "./SignInOAuthButtons"; // Google ile giriş yapmak için oluşturduğumuz bileşen
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10">
      {/* Başlık kısmı */}
      <div className="flex gap-2 items-center">
        <img src="/spotify.png" alt="Spotify" className="size-8" />
        Spotify
      </div>

      <div className="flex items-center gap-4">
        {isAdmin && (
          // Eğer kullanıcı admin ise, admin paneline yönlendiren bir link gösterilir
          <Link
            to={"/admin"}
            className={cn(
              buttonVariants({
                variant: "outline",
              })
            )}
          >
            <LayoutDashboardIcon className="size-4 mr-2" />
            Admin Dashboard
          </Link>
        )}

        {/* Kullanıcı oturum açmamışsa, Google ile giriş yapma butonu */}
        <SignedOut>
          <SignInOAuthButtons />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
};

export default Topbar;
