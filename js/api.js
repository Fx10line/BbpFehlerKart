/* ======================================================================
  API VE HABERLEŞME MODÜLÜ (api.js)
  Bu fonksiyon arayüzdeki hataları tarar, "0" olanları çöpe atar,
  sadece olan hataları JSON (bilgisayarın anladığı dil) paketine çevirip
  buluta (ileride Google Sheets'e) yollar.
======================================================================
*/

function submitData() {
    let lang = document.getElementById('langSelect').value;
    let t = i18n[lang];

    // 1. Gönderilecek paketin dış iskeletini hazırlıyoruz (Kutuyu oluşturduk)
    let formData = {
        date: localStorage.getItem('savedDate'), // Hafızadan tarihi aldık
        shift: localStorage.getItem('savedShift'),
        persnr: localStorage.getItem('savedPersnr'),
        machine: localStorage.getItem('savedMaschine'),
        part: activePart, // O an ekranda hangi parça açıksa
        totalErrors: 0,
        errorDetails: [] // Hataların detaylarını bu listeye dolduracağız
    };

    let total = 0;
    // Ekranda "count-input" class'ına (sınıfına) sahip olan tüm inputları (sayıcıları) bul
    let errorInputs = document.querySelectorAll('.count-input');
    
    // 2. Bulunan tüm sayıcıları tek tek dön (Döngü)
    errorInputs.forEach(input => {
        let count = parseInt(input.value) || 0; // İçindeki sayıyı al (boşsa 0 kabul et)
        
        // SADECE SIFIRDAN BÜYÜK (girilmiş) HATALARI PAKETE KOY! (Yıldız Şeması Mantığı)
        if (count > 0) {
            total += count; // Toplam sayacı artır
            
            // Hangi inputta olduğumuzu anlamak için ID'sini parçalıyoruz (Örn: 'err_3' -> '3')
            let index = input.id.split('_')[1]; 
            let selectedList = db[activePart] ? db[activePart] : db["Standard"];
            let errorData = selectedList[index];
            
            // Hata bilgilerini kutunun (formData) içine ekle (push komutu ile)
            formData.errorDetails.push({
                errorId: "HATA_" + activePart.substring(0,3).toUpperCase() + "_" + index, 
                errorNameDE: errorData.de, 
                count: count
            });
        }
    });

    formData.totalErrors = total; // Toplam rakamı da pakete yaz

    // 3. Şimdilik MOCK (Taklit) işlemi yapıyoruz. İnternete gitmiyor, F12 Konsol'a yazıyor.
    console.log("🚀 [VERİTABANI MOCK] Gönderilecek JSON Paketi:");
    console.log(JSON.stringify(formData, null, 2));
    
    // Ekrana Başarılı uyarısı ver
    alert(t.al_db_mock + "\n\nLog: " + total + " Fehler / Hata.");
    
    closeModal(); // Modalı kapat
    goBack(); // Ana panoya geri dön
}

