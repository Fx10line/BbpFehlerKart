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
        { de: "Teile nicht voll", tr: "Parçalar tam değil", en: "Parts not full", ro: "Piese incomplete", ru: "Детали не полные" }, 
        { de: "Gratbildung", tr: "Çapak oluşumu", en: "Burr formation", ro: "Formare bavuri", ru: "Образование заусенцев" }, 
        { de: "Buchse nicht richtig montiert/fehlt", tr: "Burç yanlış montajlı/eksik", en: "Bushing incorrectly mounted/missing", ro: "Bucșă montată greșit/lipsă", ru: "Втулка установлена неправильно/отсутствует" }, 
        { de: "Schraube fehlt", tr: "Vida eksik", en: "Screw missing", ro: "Șurub lipsă", ru: "Отсутствует винт" }, 
        { de: "Anfahrausschuss", tr: "Başlangıç firesi", en: "Start-up scrap", ro: "Rebut de pornire", ru: "Пусковой брак" } 
    ],
    "Halter Luftfilter": [ 
        { de: "Formfehler: nicht vollständig", tr: "Form hatası: Tam değil", en: "Form error: incomplete", ro: "Eroare formă: incomplet", ru: "Ошибка формы: неполная" }, 
        { de: "Formfehler: Grat vorhanden", tr: "Form hatası: Çapak var", en: "Form error: Burr present", ro: "Eroare formă: Bavură prezentă", ru: "Ошибка формы: Присутствует заусенец" }, 
        { de: "Clip: fehlt", tr: "Klips: Eksik", en: "Clip: missing", ro: "Clip: lipsă", ru: "Клипса: отсутствует" }, 
        { de: "Clip: falsch herum montiert", tr: "Klips: Ters monte edilmiş", en: "Clip: mounted upside down", ro: "Clip: montat invers", ru: "Клипса: установлена вверх ногами" }, 
        { de: "Clip: nicht in Position", tr: "Klips: Pozisyonda değil", en: "Clip: not in position", ro: "Clip: nu este pe poziție", ru: "Клипса: не на месте" }, 
        { de: "Clip: falscher Clip", tr: "Klips: Yanlış klips", en: "Clip: wrong clip", ro: "Clip: clip greșit", ru: "Клипса: неправильная клипса" }, 
        { de: "Buchse: fehlt", tr: "Burç: Eksik", en: "Bushing: missing", ro: "Bucșă: lipsă", ru: "Втулка: отсутствует" }, 
        { de: "Buchse: nicht in Position", tr: "Burç: Pozisyonda değil", en: "Bushing: not in position", ro: "Bucșă: nu este pe poziție", ru: "Втулка: не на месте" }, 
        { de: "weißer Punkt (Variante 03/04): fehlt", tr: "Beyaz nokta: Eksik", en: "White dot: missing", ro: "Punct alb: lipsă", ru: "Белая точка: отсутствует" }
    ],
    "Windlaut": [ 
        { de: "Weichkomponente: Anguss nicht entfernt", tr: "Yumuşak parça: Yolluk alınmamış", en: "Soft comp: Sprue not removed", ro: "Comp. moale: Canal de turnare neîndepărtat", ru: "Мягкий комп.: Литник не удален" }, 
        { de: "Weichkomponente: nicht vollständig", tr: "Yumuşak parça: Tam değil", en: "Soft comp: incomplete", ro: "Comp. moale: incomplet", ru: "Мягкий комп.: неполный" }, 
        { de: "Weichkomponente: beschädigt", tr: "Yumuşak parça: Hasarlı", en: "Soft comp: Damaged", ro: "Comp. moale: Deteriorat", ru: "Мягкий комп.: Поврежден" }, 
        { de: "Hartkomponente: nicht vollständig", tr: "Sert parça: Tam değil", en: "Hard comp: incomplete", ro: "Comp. dură: incomplet", ru: "Твердый комп.: неполный" }, 
        { de: "Hartkomponente: Einfallstelle, Blase", tr: "Sert parça: Çöküntü, Baloncuk", en: "Hard comp: Sink mark, Bubble", ro: "Comp. dură: Urmă de scufundare, Bulă", ru: "Твердый комп.: Утяжина, Пузырь" }, 
        { de: "Oberfläche: Schlieren / Glanzstellen", tr: "Yüzey: Hare / Parlama izi", en: "Surface: Streaks / Shiny spots", ro: "Suprafață: Dungi / Pete lucioase", ru: "Поверхность: Полосы / Блестящие пятна" }, 
        { de: "Wischertülle: nicht voll. ausgeformt", tr: "Silecek lastiği: Tam şekil almamış", en: "Wiper grommet: not fully formed", ro: "Garnitură ștergător: formată incomplet", ru: "Втулка стеклоочистителя: сформирована неполностью" }, 
        { de: "Wischertülle: Fließfehler", tr: "Silecek lastiği: Akış hatası", en: "Wiper grommet: Flow mark", ro: "Garnitură ștergător: Eroare de curgere", ru: "Втулка стеклоочистителя: Ошибка текучести" }, 
        { de: "Wischertülle: Nicht in Position", tr: "Silecek lastiği: Pozisyonda değil", en: "Wiper grommet: Not in position", ro: "Garnitură ștergător: Nu e pe poziție", ru: "Втулка стеклоочистителя: Не на месте" }, 
        { de: "POM-Ring: fehlt", tr: "POM-Halka: Eksik", en: "POM-Ring: missing", ro: "Inel POM: lipsă", ru: "POM-Кольцо: отсутствует" }, 
        { de: "POM-Ring: nicht richtig montiert", tr: "POM-Halka: Yanlış montajlı", en: "POM-Ring: incorrectly mounted", ro: "Inel POM: montat greșit", ru: "POM-Кольцо: установлено неправильно" }, 
        { de: "Pad: fehlt", tr: "Ped: Eksik", en: "Pad: missing", ro: "Pad: lipsă", ru: "Подушечка: отсутствует" }, 
        { de: "Clip: fehler", tr: "Klips: Hatalı", en: "Clip: Error", ro: "Clip: Eroare", ru: "Клипса: Ошибка" }
    ],
    "Motorabdeckung Q-Tor": [ 
        { de: "Formfehler: nicht voll ausgeformt", tr: "Form hatası: Tam şekil almamış", en: "Form error: not fully formed", ro: "Eroare formă: formată incomplet", ru: "Ошибка формы: сформирована неполностью" }, 
        { de: "Oberfläche: beschädigt/verkratzt", tr: "Yüzey: Hasarlı/Çizik", en: "Surface: damaged/scratched", ro: "Suprafață: deteriorată/zgâriată", ru: "Поверхность: повреждена/поцарапана" }, 
        { de: "Oberfläche: Einfallstelle, Blase", tr: "Yüzey: Çöküntü, Baloncuk", en: "Surface: Sink mark, Bubble", ro: "Suprafață: Urmă de scufundare, Bulă", ru: "Поверхность: Утяжина, Пузырь" }, 
        { de: "Oberfläche: Schlieren / Glanzstellen", tr: "Yüzey: Hare / Parlama izi", en: "Surface: Streaks / Shiny spots", ro: "Suprafață: Dungi / Pete lucioase", ru: "Поверхность: Полосы / Блестящие пятна" }, 
        { de: "Oberfläche: Schweißpunkt", tr: "Yüzey: Kaynak izi", en: "Surface: Weld mark", ro: "Suprafață: Punct de sudură", ru: "Поверхность: Точка сварки" }, 
        { de: "Farbdruck: nicht voll / nicht in Position", tr: "Baskı: Tam değil / Pozisyonda değil", en: "Color print: not full / not in position", ro: "Imprimare color: incompletă / nu e pe poziție", ru: "Цветная печать: неполная / не на месте" }, 
        { de: "Emblem fehlt", tr: "Amblem eksik", en: "Emblem missing", ro: "Emblemă lipsă", ru: "Эмблема отсутствует" }, 
        { de: "Emblem nicht richtig montiert", tr: "Amblem yanlış montajlı", en: "Emblem incorrectly mounted", ro: "Emblemă montată greșit", ru: "Эмблема установлена неправильно" }, 
        { de: "Emblem beschädigt/verkratzt / Farbfehler", tr: "Amblem hasarlı/çizik/renk hatalı", en: "Emblem damaged/scratched / Color error", ro: "Emblemă deteriorată/zgâriată / Eroare culoare", ru: "Эмблема повреждена/поцарапана / Ошибка цвета" }, 
        { de: "Snaploc fehlt", tr: "Snaploc eksik", en: "Snaploc missing", ro: "Snaploc lipsă", ru: "Snaploc отсутствует" }, 
        { de: "Snaploc falsch montiert", tr: "Snaploc yanlış montajlı", en: "Snaploc incorrectly mounted", ro: "Snaploc montat greșit", ru: "Snaploc установлен неправильно" }, 
        { de: "DMC/RFID Etikett fehlt", tr: "DMC/RFID Etiketi eksik", en: "DMC/RFID Label missing", ro: "Etichetă DMC/RFID lipsă", ru: "DMC/RFID Этикетка отсутствует" }, 
        { de: "DMC/RFID Etikett falsch", tr: "DMC/RFID Etiketi yanlış", en: "DMC/RFID Label wrong", ro: "Etichetă DMC/RFID greșită", ru: "DMC/RFID Этикетка неправильная" }, 
        { de: "Vlies nicht geschweißt", tr: "Keçe kaynatılmamış", en: "Fleece not welded", ro: "Fleece nesudat", ru: "Флис не сварен" }, 
        { de: "Vlies Schweißfehler", tr: "Keçe kaynak hatası", en: "Fleece welding error", ro: "Eroare sudură fleece", ru: "Ошибка сварки флиса" }
    ],
    "Motorabdeckung": [ 
        { de: "Hartkomponente nicht voll", tr: "Sert parça tam değil", en: "Hard comp not full", ro: "Comp. dură incomplet", ru: "Твердый комп. не полный" }, 
        { de: "Oberflächenfehler", tr: "Yüzey hatası", en: "Surface defect", ro: "Defect de suprafață", ru: "Дефект поверхности" }, 
        { de: "Blasen", tr: "Baloncuklar", en: "Bubbles", ro: "Bule", ru: "Пузыри" }, 
        { de: "Beschädigung", tr: "Hasar", en: "Damage", ro: "Deteriorare", ru: "Повреждение" }, 
        { de: "Überspritzt/Gratbildung", tr: "Taşma/Çapak oluşumu", en: "Overshot/Burr formation", ro: "Depășire/Formare bavuri", ru: "Перелив/Образование заусенцев" }, 
        { de: "Verzug", tr: "Çarpılma/Yamulma", en: "Distortion", ro: "Distorsiune", ru: "Искажение" }, 
        { de: "Bedruckung", tr: "Baskı", en: "Printing", ro: "Imprimare", ru: "Печать" }, 
        { de: "Montagefehler/Schweißfehler", tr: "Montaj/Kaynak hatası", en: "Assembly/Welding error", ro: "Eroare de montaj/sudură", ru: "Ошибка сборки/сварки" }, 
        { de: "Barcode", tr: "Barkod", en: "Barcode", ro: "Cod de bare", ru: "Штрих-код" }, 
        { de: "Anfahrausschuss", tr: "Başlangıç firesi", en: "Start-up scrap", ro: "Rebut de pornire", ru: "Пусковой брак" }, 
        { de: "Emblem beschädigt/verkratzt", tr: "Amblem hasarlı/çizik", en: "Emblem damaged/scratched", ro: "Emblemă deteriorată/zgâriată", ru: "Эмблема повреждена/поцарапана" }
    ],
    "Standard": [ 
        { de: "Hartkomponente nicht voll", tr: "Sert parça tam değil", en: "Hard comp not full", ro: "Comp. dură incomplet", ru: "Твердый комп. не полный" }, 
        { de: "Weichkomponente nicht voll", tr: "Yumuşak parça tam değil", en: "Soft comp not full", ro: "Comp. moale incomplet", ru: "Мягкий комп. не полный" }, 
        { de: "Oberflächenfehler", tr: "Yüzey hatası", en: "Surface defect", ro: "Defect de suprafață", ru: "Дефект поверхности" }, 
        { de: "Kratzer", tr: "Çizik", en: "Scratch", ro: "Zgârietură", ru: "Царапина" }, 
        { de: "Blasen", tr: "Baloncuklar", en: "Bubbles", ro: "Bule", ru: "Пузыри" }, 
        { de: "Beschädigung", tr: "Hasar", en: "Damage", ro: "Deteriorare", ru: "Повреждение" }, 
        { de: "Überspritzt/Gratbildung", tr: "Taşma/Çapak oluşumu", en: "Overshot/Burr formation", ro: "Depășire/Formare bavuri", ru: "Перелив/Образование заусенцев" }, 
        { de: "Verzug", tr: "Çarpılma/Yamulma", en: "Distortion", ro: "Distorsiune", ru: "Искажение" }, 
        { de: "Haftung hart/weich n.i.O.", tr: "Sert/Yumuşak yapışması hatalı", en: "Adhesion hard/soft NOK", ro: "Aderență dur/moale NOK", ru: "Адгезия твердый/мягкий НОК" }, 
        { de: "Übergang hart/weich n.i.O.", tr: "Sert/Yumuşak geçişi hatalı", en: "Transition hard/soft NOK", ro: "Tranziție dur/moale NOK", ru: "Переход твердый/мягкий НОК" }, 
        { de: "Anfahrausschuss", tr: "Başlangıç firesi", en: "Start-up scrap", ro: "Rebut de pornire", ru: "Пусковой брак" }, 
        { de: "Weißer Punkt", tr: "Beyaz nokta", en: "White dot", ro: "Punct alb", ru: "Белая точка" }, 
        { de: "Montageteil fehlt", tr: "Montaj parçası eksik", en: "Mounting part missing", ro: "Piesă de montaj lipsă", ru: "Монтажная деталь отсутствует" }
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
    },
    "en": { 
        "header_sub": "Error Code Selection", "setup_desc": "Please confirm your shift details.", "setup_title": "Welcome", "inst_title": "Please Select Part Type",
        "s_date": "Date", "s_shift": "Shift", "s_pers": "Personnel No *", "s_mac": "Machine Code", "s_bau": "Product Code", "start": "Start", 
        "c1": "Oil Pan", "c2": "Air Filter Holder", "c3": "Sound Emitter", "c4": "Engine Cover Q-Tor", "c5": "Engine Cover", "c6": "Standard Errors", 
        "back": "Go Back", "submit": "Save / Submit", 
        "mod_title": "Final Check", "mod_tot": "Total Errors:", "mod_date": "Date:", "mod_shift": "Shift:", "mod_pers": "Pers.No:", "mod_mac": "Machine:", "mod_bau": "Product Code:", "mod_cat": "Category:",
        "mod_cancel": "Cancel", "mod_confirm": "Confirm",
        "foot_date": "Date", "foot_shift": "Shift", "foot_pers": "Pers.No", "foot_mac": "Machine", "foot_bau": "Product",
        "al_pers": "Please enter Personnel Number!", 
        "al_mac_fmt": "Machine format invalid! \nPlease enter with a hyphen (e.g., 400-2)", 
        "al_mac_not": "Warning: Machine not listed! Do you want to continue?",
        "al_db_mock": "Successfully packaged (Mock)! Check the console."
    },
    "ro": { 
        "header_sub": "Selectare cod eroare", "setup_desc": "Vă rugăm să confirmați datele schimbului.", "setup_title": "Bun venit", "inst_title": "Selectați Tipul Piesei",
        "s_date": "Data", "s_shift": "Schimb", "s_pers": "Nr. Personal *", "s_mac": "Mașină", "s_bau": "Cod Produs", "start": "Start", 
        "c1": "Baie de ulei", "c2": "Suport filtru aer", "c3": "Emițător sunet", "c4": "Capac motor Q-Tor", "c5": "Capac motor", "c6": "Erori standard", 
        "back": "Înapoi", "submit": "Salvare", 
        "mod_title": "Verificare Finală", "mod_tot": "Total Erori:", "mod_date": "Data:", "mod_shift": "Schimb:", "mod_pers": "Nr.Pers:", "mod_mac": "Mașină:", "mod_bau": "Cod Produs:", "mod_cat": "Categorie:",
        "mod_cancel": "Anulare", "mod_confirm": "Confirmare",
        "foot_date": "Data", "foot_shift": "Schimb", "foot_pers": "Nr.Pers", "foot_mac": "Mașină", "foot_bau": "Produs",
        "al_pers": "Vă rugăm să introduceți numărul de personal!", 
        "al_mac_fmt": "Format mașină invalid! \nVă rugăm să folosiți cratima (ex. 400-2)", 
        "al_mac_not": "Atenție: Mașina nu este în listă! Continuați?",
        "al_db_mock": "Împachetat cu succes (Mock)! Verificați consola."
    },
    "ru": { 
        "header_sub": "Выбор кода ошибки", "setup_desc": "Пожалуйста, подтвердите данные смены.", "setup_title": "Добро пожаловать", "inst_title": "Выберите Тип Детали",
        "s_date": "Дата", "s_shift": "Смена", "s_pers": "Перс. номер *", "s_mac": "Машина", "s_bau": "Код продукта", "start": "Начать", 
        "c1": "Масляный поддон", "c2": "Держатель фильтра", "c3": "Звуковой излучатель", "c4": "Крышка двигателя Q-Tor", "c5": "Крышка двигателя", "c6": "Стандартные ошибки", 
        "back": "Назад", "submit": "Сохранить", 
        "mod_title": "Финальная проверка", "mod_tot": "Всего ошибок:", "mod_date": "Дата:", "mod_shift": "Смена:", "mod_pers": "Перс.№:", "mod_mac": "Машина:", "mod_bau": "Код продукта:", "mod_cat": "Категория:",
        "mod_cancel": "Отмена", "mod_confirm": "Подтвердить",
        "foot_date": "Дата", "foot_shift": "Смена", "foot_pers": "Перс.№", "foot_mac": "Машина", "foot_bau": "Деталь",
        "al_pers": "Пожалуйста, введите табельный номер!", 
        "al_mac_fmt": "Неверный формат машины! \nПожалуйста, введите через дефис (напр. 400-2)", 
        "al_mac_not": "Внимание: Машина не в списке! Продолжить?",
        "al_db_mock": "Успешно упаковано (Mock)! Проверьте консоль."
    }
};
