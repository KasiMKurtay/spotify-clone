import { Card, CardContent } from "@/components/ui/card"; 

// Props tipi tanımlaması, StatsCard bileşenine geçecek tüm veri türlerini belirliyor
type StatsCardProps = {
  icon: React.ElementType; // Icon bileşeni, bir React element tipi
  label: string; // Kartın başlık etiketi
  value: string; // Kartta gösterilecek değer
  bgColor: string; // Kartın arka plan rengi
  iconColor: string; // İkonun rengi
};

// StatsCard bileşeni, sağlanan verileri kullanarak bir kart render ediyor
const StatsCard = ({
  bgColor,
  icon: Icon, // İkon bileşenini alıyoruz
  iconColor,
  label,
  value,
}: StatsCardProps) => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
      {" "}
      {/* Kartın görsel stili */}
      <CardContent className="p-6">
        {" "}
        {/* Kart içeriğini sarmalayan alan */}
        <div className="flex items-center gap-4">
          {" "}
          {/* İçeriğin düzeni, ikon ve metin arasındaki boşluk */}
          <div className={`p-3 rounded-lg ${bgColor}`}>
            {" "}
            {/* İkon etrafındaki kutu */}
            <Icon className={`size-6 ${iconColor}`} />{" "}
            {/* İkonu render ediyoruz ve renklendiriyoruz */}
          </div>
          <div>
            <p className="text-sm text-zinc-400">{label}</p>{" "}
            {/* Kartın etiket açıklaması */}
            <p className="text-xl font-bold">{value}</p> {/* Kartın değeri */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
