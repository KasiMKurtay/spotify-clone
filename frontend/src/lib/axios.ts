import axios from "axios"; // axios kütüphanesini import eder. HTTP istekleri yapmak için kullanılır.

export const AxiosInstance = axios.create({ // Axios'un bir örneğini oluşturur.
  baseURL: "http://localhost:5000/api", // API istekleri için temel URL'yi belirler. Tüm istekler bu URL ile başlayacak.
});
