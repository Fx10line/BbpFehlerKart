/* ======================================================================
  MERKEZİ İŞLEMCİ MODÜLÜ (main.js)
  Ekrandaki butonlara basıldığında uygulamanın nasıl tepki vereceğini
  ve ekranlar arasında nasıl geçiş yapılacağını yöneten ana beyindir.
======================================================================
*/

/**
 * ZAMAN BAZLI VARDİYA ALGILAMA SİSTEMİ
 * Bu fonksiyon, cihazın saatine bakar ve günün dakikasını hesaplar.
 * Vardiya dönüm noktalarına (06:30, 14:30, 22:30) göre vardiyayı metin olarak döndürür.
 */

function getAutoShift() {
    let now = new Date(); // Bilgisayar/Telefonun o anki zamanını al
    let totalMinutes = (now.getHours() * 60) + now.getMinutes(); // Saati dakikaya çevirip topluyoruz

    if (totalMinutes >= 390 && totalMinutes < 870) return "Frühschicht"; 
    if (totalMinutes >= 870 && totalMinutes < 1350) return "Spätschicht"; 
    return "Nachtschicht"; // Diğer tüm saatler Gece Vardiyasıdır
}

let activePart = ""; // Kullanıcının o an hangi parçayı incelediğini geçici olarak hafızada tutar


 /**
 * UYGULAMA İLK AÇILDIĞINDA (BOOT) ÇALIŞAN FONKSİYON
 * window.onload = Tarayıcı (sayfa) tamamen yüklendikten sonra içindeki kodları çalıştırır.
 */
  
window.onload = function() {
    let savedLang = localStorage.getItem('appLang') || 'tr'; // Önceden seçili dil varsa al, yoksa 'tr' yap
    document.getElementById('langSelect').value = savedLang;
    
    loadMachineList(); // Makine numaralarını (dropdown) listesine doldur
    applyTranslations(savedLang); // Seçili dile göre arayüzü Türkçeye/Almancaya çevir

    // Sayfanın en altındaki sürüm bilgisini, dosyanın son güncellenme tarihine göre dinamik yazar
    // localStorage: Tarayıcı kapatılsa bile verileri bilgisayarda tutan küçük bir depodur.
    // Kullanıcı formu kapatsa bile sabah geldiğinde kendi Pers.Nr'sini ekranda hazır bulur.
    let today = new Date().toISOString().split('T')[0];
    document.getElementById('inp_date').value = localStorage.getItem('savedDate') || today;
    document.getElementById('inp_shift').value = localStorage.getItem('savedShift') || getAutoShift();
    document.getElementById('inp_persnr').value = localStorage.getItem('savedPersnr') || "";
    document.getElementById('inp_maschine').value = localStorage.getItem('savedMaschine') || "";
    document.getElementById('inp_bauteilnr').value = localStorage.getItem('savedBauteilnr') || "";
    
    let lastModified = new Date(document.lastModified);
    document.getElementById('version-tag').innerText = "v1.0.5 - " + lastModified.toLocaleDateString('tr-TR');
    
    showSetup(); // Açılışta 1. Ekranı (Kurulum) göster
};


/** EKRAN GÖSTERİM FONKSİYONLARI 
 * JavaScript ile CSS'in "display" (görünürlük) özelliğine müdahale ediyoruz.
 * Bir ekranı 'flex' yaparken diğerlerini 'none' yaparak sadece bir menünün görünmesini sağlıyoruz.
 */

function showSetup() {
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('setup-view').style.display = 'flex';
}

 /**
 * BAŞLA BUTONUNA BASILDIĞINDA (1. Ekrandan 2. Ekrana Geçiş)
 * Kullanıcının girdiği verilerin kurallara uyup uymadığını denetler.
 */
  
function startApp() {
    let lang = document.getElementById('langSelect').value;
    let t = i18n[lang]; // db.js dosyasındaki ilgili dil kütüphanesini değişkene aktarır

    // Kullanıcının inputlara yazdığı değerleri alır
    let dat = document.getElementById('inp_date').value;
    let shf = document.getElementById('inp_shift').value;
    let pnr = document.getElementById('inp_persnr').value;
    let mac = document.getElementById('inp_maschine').value;
    let bau = document.getElementById('inp_bauteilnr').value;
  

    if(!pnr) { alert(t.al_pers); return; } // Personel No boşsa uyarı ver ve işlemi durdur (return)

    if(mac !== "") {
        // REGEX (Düzenli İfadeler): Metin formatını kurallara göre denetleme aracıdır.
       // /^\d{3,4}-\d{1,2}$/ -> Başı (\d) rakam olsun, 3 veya 4 adet olsun, ortasında tire (-) olsun vb.
        let formatKurali = /^\d{3,4}-\d{1,2}$/;
        if(!formatKurali.test(mac)) {
            alert(t.al_mac_fmt);
            return; 
        }

      
       // includes komutu, makinenin bizim liste dizimizin (Array) içinde olup olmadığına bakar.
        if(!baseMachines.includes(mac)) {
            let eminMisiniz = confirm(t.al_mac_not); // confirm: Evet/Hayır seçenekli uyarı penceresidir.
            if(!eminMisiniz) return; 
        }
    }
    
    // Sorun yoksa değerleri cihazın hafızasına kaydet ki bir sonraki açılışta silinmesin.
    localStorage.setItem('savedDate', dat);
    localStorage.setItem('savedShift', shf);
    localStorage.setItem('savedPersnr', pnr);
    localStorage.setItem('savedMaschine', mac);
    localStorage.setItem('savedBauteilnr', bau);


    // Uygulamanın en altındaki gri alana (Footer) bu değerleri yaz
    document.getElementById('val_date').innerText = dat;
    document.getElementById('val_shift').innerText = shf.replace("schicht", ""); 
    document.getElementById('val_pers').innerText = pnr;
    document.getElementById('val_mac').innerText = mac || "-";
    document.getElementById('val_bau').innerText = bau || "-";
    
    // 2. Ekranı (Panoyu) aç
    document.getElementById('setup-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
}


/**
 * PARÇA KARTINA TIKLANDIĞINDA HATA FORMUNU ÇİZDİRME 
 * (3. Ekrana Geçiş)
 */

function openForm(partName) {
    activePart = partName; // Global değişkenimize seçilen parça adını yazdırırız (örn: "Ölwanne")
    document.getElementById('dashboard-view').style.display = 'none';
    document.getElementById('form-view').style.display = 'block';
    document.getElementById('form-title').innerText = partName;
    
    let listDiv = document.getElementById('errorList');
    let lang = document.getElementById('langSelect').value;
    // db.js'deki obje yapısından seçili parçanın hata listesini (array) çeker
    let selectedList = db[partName] ? db[partName] : db["Standard"];
    
    listDiv.innerHTML = "";
    // Hata listesindeki her bir eleman için (forEach) ekrana HTML kodları üreterek bas
    selectedList.forEach((err, index) => {
        let subtitle = lang === 'de' ? "" : (err[lang] || "");
        // Template Literal (` `) kullanarak içine JavaScript değişkenleri (${değişken}) gömülmüş HTML üretiyoruz.
        listDiv.innerHTML += `
            <div class="error-item">
                <div class="error-name"><strong>${err.de}</strong><span>${subtitle}</span></div>
                <div class="counter">
                    <button class="btn-count" onclick="updateCount('err_${index}', -1)">-</button>
                    <input type="number" id="err_${index}" class="count-input" value="0" min="0" inputmode="numeric">
                    <button class="btn-count" onclick="updateCount('err_${index}', 1)">+</button>
                </div>
            </div>`;
    });
    window.scrollTo(0, 0); // Form çok uzunsa sayfanın en üstüne (0,0 koordinatları) otomatik kaydırır.
}

  
// Formdan geri dönme butonu
function goBack() {
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    activePart = "";
}


// Artı ve Eksi butonlarına basıldığında input (kutu) içindeki sayıyı değiştiren fonksiyon
function updateCount(id, val) {
    let input = document.getElementById(id);
    let current = parseInt(input.value) || 0;
    if(current + val >= 0) input.value = current + val;
}


// Datalist (Arama önerileri) için veritabanındaki (db.js) makineleri HTML'e option elemanı olarak basar
function loadMachineList() {
    let datalist = document.getElementById('machineList');
    datalist.innerHTML = "";
    baseMachines.forEach(mac => { 
        let option = document.createElement('option'); 
        option.value = mac; 
        datalist.appendChild(option); 
    });
}

  
// Kullanıcı listeden yeni bir dil seçtiğinde çalışır
function changeLanguage() {
    let selected = document.getElementById('langSelect').value;
    localStorage.setItem('appLang', selected);
    applyTranslations(selected);
    
    if(activePart !== "") openForm(activePart);
}

// HİÇBİR SATIRIN KESİLMEDİĞİ TAM ÇEVİRİ FONKSİYONU
// ÇEVİRİ MOTORU: İlgili DOM (Belge Nesne Modeli) öğelerini bulup içeriklerini günceller.
function applyTranslations(lang) {
    let t = i18n[lang] || i18n['de'];

    // .innerText özelliği, bir HTML etiketinin içindeki görünen yazıyı değiştirir.
    document.getElementById('lbl_header_sub').innerText = t.header_sub;
    document.getElementById('lbl_inst_title').innerText = t.inst_title; 
    document.getElementById('lbl_setup_title').innerText = t.setup_title;
    document.getElementById('lbl_setup_desc').innerText = t.setup_desc;
    document.getElementById('lbl_setup_date').innerText = t.s_date;
    document.getElementById('lbl_setup_shift').innerText = t.s_shift;
    document.getElementById('lbl_setup_pers').innerText = t.s_pers;
    document.getElementById('lbl_setup_mac').innerText = t.s_mac;
    document.getElementById('lbl_setup_bau').innerText = t.s_bau;
    document.getElementById('btn_start').innerText = t.start;
    document.getElementById('lbl_back').innerText = t.back;
    document.getElementById('btn_submit_main').innerText = t.submit;

    // (Diğer ID'ler kısıtlı alanda çok yer kaplamaması için benzer şekilde çalışır...)
    document.getElementById('sub_1').innerText = t.c1; 
    document.getElementById('sub_2').innerText = t.c2;
    document.getElementById('sub_3').innerText = t.c3; 
    document.getElementById('sub_4').innerText = t.c4;
    document.getElementById('sub_5').innerText = t.c5; 
    document.getElementById('sub_6').innerText = t.c6;

    document.getElementById('lbl_foot_date').innerText = t.foot_date;
    document.getElementById('lbl_foot_shift').innerText = t.foot_shift;
    document.getElementById('lbl_foot_pers').innerText = t.foot_pers;
    document.getElementById('lbl_foot_mac').innerText = t.foot_mac;
    document.getElementById('lbl_foot_bau').innerText = t.foot_bau;

    document.getElementById('lbl_mod_title').innerText = t.mod_title;
    document.getElementById('lbl_mod_date').innerText = t.mod_date;
    document.getElementById('lbl_mod_shift').innerText = t.mod_shift;
    document.getElementById('lbl_mod_pers').innerText = t.mod_pers;
    document.getElementById('lbl_mod_mac').innerText = t.mod_mac;
    document.getElementById('lbl_mod_bau').innerText = t.mod_bau;
    document.getElementById('lbl_mod_cat').innerText = t.mod_cat;
    document.getElementById('lbl_mod_tot').innerText = t.mod_tot;
    document.getElementById('btn_mod_cancel').innerText = t.mod_cancel;
    document.getElementById('btn_mod_confirm').innerText = t.mod_confirm;
}

// Kaydet butonuna basılınca açılan siyah arka planlı ONAY PENCERESİ (Modal)
function showModal() {
    let total = 0;
    document.querySelectorAll('.count-input').forEach(input => { 
        total += parseInt(input.value) || 0;
    });
  
    // Hafızadaki verileri Modal içindeki etiketlere yazdır
    document.getElementById('modDatum').innerText = localStorage.getItem('savedDate');
    document.getElementById('modSchicht').innerText = localStorage.getItem('savedShift');
    document.getElementById('modPers').innerText = localStorage.getItem('savedPersnr');
    document.getElementById('modMaschine').innerText = localStorage.getItem('savedMaschine') || "-";
    document.getElementById('modBauteilNr').innerText = localStorage.getItem('savedBauteilnr') || "-";
    document.getElementById('modKategori').innerText = activePart;
    document.getElementById('modTotalError').innerText = total;
    
    document.getElementById('confirmModal').style.display = 'flex';
}

// İptal (Zurück) butonuna basılınca pencereyi görünmez (none) yapar
function closeModal() { 
    document.getElementById('confirmModal').style.display = 'none'; 
}
