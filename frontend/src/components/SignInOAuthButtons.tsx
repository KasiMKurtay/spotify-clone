import { useSignIn } from "@clerk/clerk-react"; // Clerk ile kullanıcı oturum açma işlemlerini yapabilmek için gerekli hook'u import ediyoruz.
import { Button } from "./ui/button"; // Projenizdeki özel bir buton bileşenini import ediyoruz.

const SignInOAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn(); // useSignIn hook'u ile giriş işlemleri için fonksiyonları alıyoruz.

  if (!isLoaded) {
    return null; // Eğer Clerk verileri yüklenmemişse, hiçbir şey render edilmez.
  }

  const signInWithGoogle = () => {
    // Google ile giriş yapmak için yönlendirme işlemi başlatılır.
    signIn.authenticateWithRedirect({
      strategy: "oauth_google", // Google OAuth ile giriş yapılacağı belirtilir.
      redirectUrl: "/sso-callback", // Başarılı bir giriş sonrası yönlendirme yapılacak URL.
      redirectUrlComplete: "/auth-callback", // Giriş işlemi tamamlandığında yapılacak başka bir yönlendirme URL'si.
    });
  };

  return (
    <Button
      onClick={signInWithGoogle} // Butona tıklanmasıyla Google ile giriş işlemi başlatılır.
      variant={"secondary"} // Butonun ikinci renk seçeneğiyle render edilmesini sağlar.
      className="w-full text-white border-zinc-200 h-11" // Tailwind CSS ile buton stilini belirler.
    >
      Continue with Google {/* Buton içeriği */}
    </Button>
  );
};

export default SignInOAuthButtons; // Bu bileşeni dışa aktarır.
