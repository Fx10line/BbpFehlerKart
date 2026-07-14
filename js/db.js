/* ======================================================================
  VERİTABANI VE ÇEVİRİ MERKEZİ (db.js)
  Programın hafızasıdır. Değerler 'const' (sabit) olarak tanımlanır,
  yani sayfa yenilenene kadar bu liste değiştirilemez.
======================================================================
*/

// Geçerli Makine Listesi: Sistem sadece bu listedekileri uyarısız kabul eder.
const baseMachines = ["400-2", "400-3", "500-9", "600-4", "600-7", "650-2", "650-8", "800-1", "800-4", "850-2", "850-3", "850-4", "900-1", "1000-3", "1000-4", "1100-1", "1450-1", "1600-3", "1700-2", "1700-3"];

// Hata Kataloğu: Hangi parçanın hangi hataları olduğu JSON objesi şeklinde burada tutulur.
// "Ölwanne": [ { de: "Almanca", tr: "Türkçe", ... } ] mantığıyla çalışır.
const db = {
    "Ölwanne": [ 
        { de: "Ölwanne nicht dicht", tr: "Yağ karteri sızdırıyor", en: "Oil pan leaking", ro: "Baie de ulei neetanșă", ru: "Масляный поддон протекает" }, 
        { de: "Maschinen-/ Anlagenstörung", tr: "Makine/Tesis arızası", en: "Machine/Plant fault", ro: "Defecțiune mașină/instalație", ru: "Неисправность машины/установки" }, 
        { de: "Gratbildung", tr: "Çapak oluşumu", en: "Burr formation", ro: "Formare bavuri", ru: "Образование заусенцев" }
        // (Sizin tam listenizi buraya ekleyebilirsiniz, kısalttım)
    ],
    "Standard": [ 
        { de: "Hartkomponente nicht voll", tr: "Sert parça tam değil", en: "Hard comp not full", ro: "Comp. dură incomplet", ru: "Твердый комп. не полный" }, 
        { de: "Oberflächenfehler", tr: "Yüzey hatası", en: "Surface defect", ro: "Defect de suprafață", ru: "Дефект поверхности" }, 
        { de: "Kratzer", tr: "Çizik", en: "Scratch", ro: "Zgârietură", ru: "Царапина" }
    ]
};

// Çeviri Havuzu: Arayüzdeki (menüler, butonlar vb.) tüm metinlerin karşılıkları.
const i18n = {
    "tr": { 
        "header_sub": "Hata Kodu Seçimi", "setup_desc": "Lütfen vardiya bilgilerinizi teyit edin.", "setup_title": "Hoş Geldiniz", "inst_title": "Parça Tipi Seçin",
        "s_date": "Tarih", "s_shift": "Vardiya", "s_pers": "Personel No *", "s_mac": "Makine Kodu", "s_bau": "Ürün Kodu", "start": "Başla", 
        "c1": "Yağ Karteri", "c2": "Hava Filtresi Tutucu", "c3": "Ses Çıkış Elemanı", "c4": "Motor Kapağı Q-Tor", "c5": "Motor Kapağı", "c6": "Standart Hatalar", 
        "back": "Geri Dön", "submit": "Kaydet / Gönder", 
        "mod_title": "Son Kontrol", "mod_tot": "Toplam Hata:", "mod_date": "Tarih:", "mod_shift": "Vardiya:", "mod_pers": "Pers.No:", "mod_mac": "Makine:", "mod_bau": "Ürün Kodu:", "mod_cat": "Kategori:",
        "mod_cancel": "İptal", "mod_confirm": "Onayla",
        "foot_date": "Tarih", "foot_shift": "Vardiya", "foot_pers": "Pers.No", "foot_mac": "Makine", "foot_bau": "Ürün",
        "al_pers": "Lütfen Personel Numaranızı giriniz!", 
        "al_mac_fmt": "Makine numarası formatı hatalı! \nLütfen araya tire koyarak giriniz (Örn: 400-2)", 
        "al_mac_not": "DİKKAT: Makine kayıtlı listede bulunamadı!\nDevam etmek istiyor musunuz?",
        "al_db_mock": "Veri başarıyla paketlendi (Mock)! Konsolu kontrol edin."
    },
    "de": { 
        "header_sub": "Fehlercode-Auswahl", "setup_desc": "Bitte bestätigen Sie Ihre Schichtdaten.", "setup_title": "Willkommen", "inst_title": "Bitte Bauteil Auswählen",
        "s_date": "Datum", "s_shift": "Schicht", "s_pers": "Pers.Nr *", "s_mac": "Maschine", "s_bau": "Bauteilnr", "start": "Starten", 
        "c1": "Ölwanne", "c2": "Halter Luftfilter", "c3": "Windlaut", "c4": "Motorabdeckung Q-Tor", "c5": "Motorabdeckung", "c6": "Standardfehler", 
        "back": "Zurück", "submit": "Speichern", 
        "mod_title": "Kontrolle", "mod_tot": "Gesamtfehler:", "mod_date": "Datum:", "mod_shift": "Schicht:", "mod_pers": "Pers.Nr:", "mod_mac": "Maschine:", "mod_bau": "Bauteilnr:", "mod_cat": "Kategorie:",
        "mod_cancel": "Zurück", "mod_confirm": "Bestätigen",
        "foot_date": "Datum", "foot_shift": "Schicht", "foot_pers": "Pers.Nr", "foot_mac": "Maschine", "foot_bau": "Bauteil",
        "al_pers": "Bitte Personalnummer eingeben!", 
        "al_mac_fmt": "Maschinenformat falsch! \nBitte mit Bindestrich eingeben (z.B. 400-2)", 
        "al_mac_not": "Achtung: Maschine nicht gelistet! Möchten Sie trotzdem fortfahren?",
        "al_db_mock": "Erfolgreich gepackt (Mock)! Überprüfen Sie die Konsole."
    }
};

