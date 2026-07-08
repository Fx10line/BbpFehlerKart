# BbpFehlerKart

Ne demek istediğini çok net anladım. Bu, yazılım dünyasında "UI/UX Tree" (Kullanıcı Arayüzü Ağacı) veya "Ekran Hiyerarşisi" olarak adlandırılan harika bir yöntemdir. Projenin dokümantasyonu ve mimariyi gözünde canlandırabilmen için çok faydalıdır.
Projemizin ekran üzerindeki **görsel ve mantıksal sıralamasına göre** yukarıdan aşağıya doğru tasarım ağacını (başlık ve alt başlıklar şeklinde) aşağıda çıkarıyorum:
🌳 **BBP Fehlersammelkarte - Ekran ve Tasarım Ağacı**
 * 📌 **1. ÜST BİLGİ ÇUBUĞU (HEADER)** *(Sayfanın en üstünde sabit durur)*
   * **Sol Alan:** Uyarı İkonu (⚠) ve Uygulama Ana Başlığı ("Fehlersammelkarte")
   * **Sağ Alan:** * Ayarlar Butonu (⚙️) *(Kurulum ekranına geri dönmek için)*
     * Dil Seçici Menü *(TR, DE, EN, RO, RU)*
 * 🖥️ **2. GİRİŞ VE KURULUM EKRANI (SETUP VIEW)** *(Uygulama ilk açıldığında görünen alan)*
   * **Başlık:** "Hoş Geldiniz" ve Yönlendirme Metni
   * **Zaman Grubu:** * Tarih Seçici Kutu (Takvim)
     * Vardiya Açılır Menüsü (Sabah / Öğle / Gece)
   * **Operatör Grubu:**
     * Personel Numarası Kutusu (Zorunlu)
     * Makine Kodu Kutusu (20 Makinelik Akıllı Datalist ile)
   * **Ürün Grubu:** Ürün Kodu Giriş Kutusu
   * **Aksiyon:** "Başla" Butonu *(Buna basılınca bu ekran gizlenir, Ana Menü açılır)*
 * 🗂️ **3. ANA MENÜ / ÜRÜN SEÇİM EKRANI (DASHBOARD)** *(Başla butonundan sonra gelen alan)*
   * **Başlık:** "Lütfen Parça Tipi Seçin"
   * **Ürün Kartları Izgarası (Grid):** *(6 adet dokunmatik ve görselli buton)*
     * Kart 1: Ölwanne (Yağ Karteri)
     * Kart 2: Halter Luftfilter (Hava Filtresi Tutucu)
     * Kart 3: Windlaut (Ses Çıkış Elemanı)
     * Kart 4: Motorabdeckung Q-Tor (Motor Kapağı Q-Tor)
     * Kart 5: Motorabdeckung (Motor Kapağı)
     * Kart 6: Standard (Standart Hatalar)
 * 📝 **4. HATA GİRİŞ EKRANI (FORM VIEW)** *(Bir ürüne tıklandığında gelen alan)*
   * **Üst Bar:** "⬅ Geri Dön" Butonu
   * **Dinamik Başlık:** Seçilen Ürünün Adı *(Örn: Ölwanne)*
   * **Hata Listesi:** *(Veritabanı modülünden otomatik sıralanan liste)*
     * Hata 1: Adı ve Çevirisi -> **[ - ]  [ 0 ]  [ + ]** (Sayaç Numpad)
     * Hata 2: Adı ve Çevirisi -> **[ - ]  [ 0 ]  [ + ]** (Sayaç Numpad)
     * *(Tüm hatalar alt alta dizilir)*
   * **Aksiyon:** "Kaydet / Gönder" Butonu *(Onay penceresini tetikler)*
 * 📋 **5. ONAY PENCERESİ (MODAL)** *(Kaydet'e basılınca ekranı karartıp öne çıkan kutu)*
   * **Başlık:** "Son Kontrol"
   * **Veri Özetleri:** Tarih, Vardiya, Pers. No, Makine, Ürün Kodu ve Seçilen Kategori
   * **Sonuç:** Toplam Hata Sayısı *(Kırmızı renkli ve büyük punto)*
   * **Aksiyon Butonları:**
     * "İptal" (Kapatır ve hataları düzenlemeye izin verir)
     * "Onayla" (Verileri Google Sheets'e gönderecek asıl buton)
 * ⚓ **6. ALT BİLGİ ÇUBUĞU (FOOTER)** *(Sayfanın en altında sabit durur)*
   * Tarih Kutucuğu
   * Vardiya Kutucuğu
   * Personel No Kutucuğu
   * Makine Kodu Kutucuğu
   * Ürün Kodu Kutucuğu
İşte projemizin iskeleti ve mimari ağacı tam olarak budur. Bir şeyi değiştirmek istediğimizde (Örneğin "Ana Menüye" yeni bir kart ekleyeceğimizde) bu ağaçtaki **3. Adıma** gideceğimizi çok net görebilirsin.
Bu ağaç şablonu kafana yattı mı?





Tabii, kurduğumuz anakart mimarisindeki 4 modülün görevlerini ve neleri içerdiğini kısaca özetliyorum:
 * 🎨 **Modül 1: Kasa ve Boya (CSS - Tasarım Modülü)**
   Uygulamanın dış görünüşüdür. Renkler, yazı tipleri, buton şekilleri ve özellikle **tablet/telefon ekranlarına uyum (esneklik)** kurallarını içerir. Görsel bir değişiklik yapılacağında buraya müdahale edilir.
 * 🖥️ **Modül 2: Giriş Çıkış Portları (HTML - Arayüz Modülü)**
   Operatörün ekranda gördüğü ve dokunduğu her şeyin iskeletidir. Üst bilgi çubuğu, kurulum kutucukları, 6'lı ana menü düğmeleri, hata giriş listesi ve onay penceresi (Modal) bu modülde yer alır. Ekrana yeni bir buton veya kutu ekleneceğinde burası kullanılır.
 * 💾 **Modül 3: Hard Disk ve RAM (JS Veritabanı Modülü)**
   Projenin sabit verilerinin depolandığı yerdir. 20 adet makine kodu, her bir ürüne ait hata listeleri ve 5 farklı dilin çeviri kelimeleri burada bulunur. Fabrikaya **yeni bir hata, ürün veya makine ekleneceğinde sadece bu modül güncellenir.**
 * 🧠 **Modül 4: Merkezi İşlemci (JS Mantık Modülü)**
   Sistemin beynidir ve arka plandaki tüm işlemleri yapar. Saati okuyup vardiyayı (Früh/Spät/Nacht) otomatik hesaplayan, operatör bir düğmeye bastığında diğer ekranı açan ve girilen verileri cihaz hafızasına (LocalStorage) kaydeden akıllı fonksiyonları içerir. İşleyiş kuralları değiştiğinde (örneğin Google Sheets'e bağlanacağımız zaman) bu modül güncellenir.


