import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"; // Resizable bileşenlerini import eder. Bu bileşenler, ekranın farklı bölümleri arasındaki boyutları değiştirmeyi sağlar.
import { Outlet } from "react-router-dom"; // Outlet bileşeni, alt bileşenlerin yerini alır. React Router ile sayfa yönlendirmesi yapılacak alandır.
import LeftSideBar from "./components/LeftSideBar"; // Sol taraftaki menü için kullanılan LeftSideBar bileşenini import eder.
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";

const MainLayout = () => {
  const isMobile = false; // Mobil olup olmadığına karar veren bir değişken (şu an için false, yani mobil değil).
  return (
    <div className="h-screen bg-black text-white flex flex-col">
      {/* Ana konteyner. Yükseklik tüm ekranı kaplar. Arka plan siyah, yazılar beyaz. Flexbox düzeni kullanılır. */}

      <ResizablePanelGroup
        direction="horizontal" // Panellerin yatay olarak sıralanmasını sağlar.
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        <AudioPlayer />
        {/* Sol taraf */}
        <ResizablePanel
          defaultSize={20} // Başlangıçta sol panelin boyutu %20 olacak.
          minSize={isMobile ? 0 : 10} // Mobilde minimum 0, diğer durumlarda 10 px olarak ayarlanır.
          maxSize={20} // Panelin boyutu %20'yi geçemez.
        >
          <LeftSideBar /> {/* Sol tarafta menü içeriklerini yerleştirir. */}
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />
        {/* Panel boyutlandırıcı, yatayda sol ve sağ panelleri ayarlamaya olanak tanır. */}

        {/* Orta taraf */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />{" "}
          {/* Yönlendirilmiş içeriği burada göstermek için Outlet kullanılır. */}
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-color" />
        {/* Orta ve sağ panelleri ayarlamak için bir başka boyutlandırıcı. */}

        {/* Sağ taraf */}
        <ResizablePanel
          defaultSize={20} // Başlangıçta sağ panelin boyutu %20 olacak.
          minSize={isMobile ? 0 : 10} // Sağ panelin boyutu minimum sıfır olabilir.
          maxSize={25} // Sağ panelin boyutu %25'ten büyük olamaz.
          collapsedSize={0} // Sağ panelin kapanması durumunda boyutu sıfır olur.
        >
          <FriendsActivity />
          {/* Sağ tarafta arkadaş etkinlikleri kısmı yer alır. */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainLayout; // MainLayout bileşenini dışa aktarır.
/*  */
