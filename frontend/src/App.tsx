import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import ChatPage from "./pages/chat/ChatPage";
import AlbumPage from "./pages/album/AlbumPage";
import ShowAllSongs from "./pages/Home/components/ShowAllSongs";
import AdminPage from "./pages/admin/AdminPage";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        {/* Sayfa yönlendirmeleri için Routes bileşenini kullanır */}
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
            /* /sso-callback URL'sine geldiğinde AuthenticateWithRedirectCallback bileşenini render eder */
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        {/* /auth-callback URL'sine geldiğinde AuthCallbackPage bileşenini render eder */}
        <Route path="/admin" element={<AdminPage />} />
        <Route element={<MainLayout />}>
          {/* Ana düzen (layout) bileşenini tanımlar */}
          <Route path="/" element={<HomePage />} />
          {/* Anasayfa (/path) için HomePage bileşenini render eder */}
          <Route path="/chat" element={<ChatPage />} />
          {/* /chat URL'si için chatPage bileşenini render eder */}
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="/ShowAllSongs" element={<ShowAllSongs />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
