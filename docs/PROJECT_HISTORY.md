# Sol Acik Proje Gunlugu ve Mimari Rehberi

Bu dosya, Sol Acik'in nasil basladigini, hangi teknik altyapiyla kuruldugunu ve
modullerin hangi mantikla ayrildigini kayit altina almak icin tutulur. Amac,
ileride editorler veya proje sahibi kodu acinca "ne nerede, neden boyle?"
sorusuna hizli yanit vermektir.

## Kisa Ozet

Sol Acik, pediatrik gogus hastaliklari pratigi icin hazirlanan acik kaynakli,
egitimsel ve checklist odakli bir Expo React Native uygulamasidir. Klinik karar,
tani veya tedavi karari yerine gecmez. Icerik; resmi rehberler, yerel protokoller,
KUB/KT bilgileri, cihaz kaynaklari ve klinisyen/editor kurul degerlendirmesi ile
dogrulanmak zorundadir.

## Ana Teknoloji

- Dil: TypeScript
- Uygulama catısı: React Native + Expo
- Web onizleme: Expo Web / React Native Web
- Test: Node test runner + TypeScript derleme
- Klinik veri dosyalari: `data/`
- Hesaplama ve yorum motorlari: `utils/` ve `services/`
- Ekranlar: `modules/`
- Tekrar kullanilan UI parcalari: `components/`

Not: Bu proje Java ile yazilmamistir. JavaScript ailesinden TypeScript
kullaniyoruz. TypeScript, JavaScript'e tip guvenligi ekleyen dildir.

## Genel Mimari Ilkeler

1. Klinik veri UI icine gomulmemelidir.
   - Rehber, ilac, referans ve liste verileri mumkun oldukca `data/` altinda tutulur.
   - UI dosyalari veriyi gosterir; klinik kurallari mumkunse util/service dosyalari uygular.

2. Katsayi yoksa hesap yok.
   - GLI, IOS, MBW, TLCO veya benzeri referanslarda katsayi/lookup yoksa sahte
     predicted, LLN, ULN veya z-skor uretilmez.
   - Ekranda ham deger ve acik uyari gosterilir.

3. Klinik dil destekleyici olmalidir.
   - "Tani koyar", "tedavi onerir" gibi iddiali dil kullanilmaz.
   - "Ile uyumlu olabilir", "lehine olabilir", "klinik baglamla yorumlanmalidir"
     gibi guvenli dil tercih edilir.

4. Hasta kimligi toplanmaz.
   - Ad, TC kimlik no, dogum tarihi, telefon, adres, hastane numarasi veya kalici
     hasta verisi tutulmaz.
   - Girilen yas, kilo, boy, varyant veya olcum degerleri gecici ekran state'idir.

5. Her onemli degisiklik commit ile kaydedilir.
   - Commit mesaji, yapilan isin amacini kisaca anlatir.
   - Geriye donuk inceleme icin `git log --oneline` kullanilir.

## Baslangic ve Ana Donemler

### Ilk uygulama iskeleti

Uygulama "Sol Acik: Solunum icin Acik Kaynak Cocuk Gogus Klinik Asistani"
fikriyle basladi. Ilk amac, cocuk gogus uzmanlari ve yan dal asistanlari icin
hizli klinik rehber, checklist ve referans ekranlari olusturmakti.

Ilk ana ekran modulleri:
- Ana Sayfa
- Astim Hizli Rehber
- PIBO takip checklist'i
- Kistik fibrozis yillik izlem checklist'i
- Trakeostomi acil algoritmasi
- Bronkoskopi endikasyon checklist'i
- Inhaler cihaz egitim kartlari
- Notlarim
- Kaynaklar ve yasal uyari

### Klinik modullerin genislemesi

Sonraki donemde uygulama, yalnizca astim/KF degil, cocuk gogus pratigi icin
daha genis bir klinik kutuphane haline getirildi:
- Astim yonetimi ve biyolojik tedaviler
- CFTR modulator uygunlugu
- Cocukluk cagi tuberkulozu
- Inhale ilaclar
- Bronkoskopi ve BAL
- Kronik oksuruk
- Bronsiolit
- Pnomoni
- Parapnomonik efüzyon
- chILD / interstisyel akciger hastaliklari
- Non-CF bronsektazi
- Primer siliyer diskinezi
- OSAS / uyku
- Hemoptizi ve pulmoner hipertansiyon acil yaklasimlari
- Ev ventilatoru
- Sistemik steroidler
- Asilar ve monoklonal antikorlar
- Normal degerler

### Menu mimarisi

Ana menu daha sonra pratik calisma modlarina gore duzenlendi:
- Poliklinik
- Acil / Servis
- Islem
- Ilac / Doz
- Normal Degerler
- Akademik / Registry

Bu yapi `App.tsx` icindeki `homeCategories` ve `categoryModules` listeleri ile
yonetilir. Yeni bir modul ana ekrana eklenecekse genellikle:
1. Modul dosyasi `modules/` altina eklenir.
2. `App.tsx` icinde import edilir.
3. `ScreenKey` tipine eklenir.
4. Uygun kategoriye `categoryModules` icinde kart olarak eklenir.
5. Render zincirine `activeScreen === 'moduleKey'` kosulu eklenir.
6. `data/contentGovernance.ts` icine kaynak/disclaimer metadata'si eklenir.

### Kontrollu beta ve editor modeli

Build 0.3 sonrasinda uygulama, kontrollu beta mantigina alindi:
- Beta kullanici
- Editor
- Admin

Giris ve rol mantigi `data/accessControl.ts` dosyasinda tutulur. Editor feedback
kutusu `components/common/EditorFeedbackBox.tsx` icindedir. Bu mekanizma gercek
kimlik/veritabani sistemi degil, kontrollu test ve editor geri bildirimi icin
hafif bir yerel modeldir.

## Klinik Veri ve Kaynak Yonetimi

`data/contentGovernance.ts` her klinik modul icin su alanlari tutar:
- `sourceTitle`
- `sourceVersion`
- `lastCheckedDate`
- `clinicalEditor`
- `disclaimer`

Bu alanlar ekranda `ClinicalSourcePanel` veya `SourceVersionBadge` benzeri
bilesenlerle gosterilir. Yeni modul eklenirken bu metadata mutlaka eklenmelidir.

## Hesaplama Motorlari

### Spirometri GLI

Spirometri motoru `utils/spirometry/` ve `services/gliLocalEngine.ts` altindadir.
GLI lookup/katsayi dosyalari `data/spirometry/` icindedir. GLI 2022 race-neutral
ekranda basitlestirilmis varsayilan referans olarak kullanilir.

Kritik ilke:
- GLI katsayisi varsa hesap yap.
- FEF25-75 gibi desteklenmeyen parametrede hesap yapma.
- Resmi API anahtari mobil uygulamaya konmaz; backend/proxy dokumantasyonu
  `app/api/gli-spiro.ts` ve `app/api/gli-pft.ts` altinda tutulur.

### Pulmonary Function / Solunum Fonksiyonlari

Bu modul spirometri, TLCO/DLCO, akciger volumleri ve MBW icin ust ekran olarak
tasarlandi. Mevcut spirometri ekrani korunur. TLCO/volum/MBW icin katsayi dosyasi
yoksa predicted veya z-skor uretilmez. Ilgili mimari:
- `src/modules/pft/referenceEngines/types.ts`
- `services/pftLocalEngine.ts`
- `services/pftApiClient.ts`
- `utils/pft/`

### IOS / Oscillometry

Osilometri tek evrensel GLI spirometri mantiginda degildir. Sonuc cihaz, protokol,
frekans, popülasyon ve referans denklemine baglidir. Bu nedenle modul:
- cihaz secimi,
- referans seti secimi,
- birim donusumu,
- kalite uyarilari,
- ham deger raporu
mantigi ile kuruldu.

Katsayi yoksa z-skor uretilmez. Ilgili dosyalar:
- `modules/oscillometry/OscillometryScreen.tsx`
- `data/oscillometry/referenceSets.ts`
- `data/oscillometry/qualityThresholds.ts`
- `src/modules/oscillometry/referenceEngines/types.ts`
- `src/modules/oscillometry/referenceEngines/customReferenceSchema.ts`
- `utils/oscillometry/`
- `services/oscillometryReferenceEngine.ts`

### CFTR Modulator

CFTR modulator uygunluk modulu yerel, kurate edilmis seed listeyle calisir.
Vertex kaynaklarinin gunluk kontrolu icin server-side mimari hazirlandi ancak
uygulama client tarafinda Vertex sitesini kazimaz. Kaynak degisirse editor onayi
olmadan klinik uygunluk listesine yansitilmaz.

Ilgili dosyalar:
- `modules/cftr-modulator.tsx`
- `data/cftr/`
- `utils/cftr/`
- `services/cftrVertexVariantUpdater.ts`
- `app/api/cftr-variant-update.ts`

## Test Stratejisi

Testler `tests/` altinda tutulur. Simdilik unit testler pure calculation ve
parser fonksiyonlarina odaklanir:
- CFTR varyant normalizasyonu ve uygunluk
- Vertex varyant parser davranisi
- Spirometri yorumlama ve input validasyonu
- PFT RV/TLC, z-skor siniflama, rapor uretimi
- Osilometri birim donusumu, R5-R20, LMS z-skor ve katsayi yok davranisi

Komutlar:

```bash
npm run typecheck
npm run lint
npm test
```

## Commit ve Geriye Donuk Izleme

Her anlamli is parcasindan sonra commit alinmalidir. Onerilen commit mesaji
formati:

```text
Add <module/feature>
Update <module> source metadata
Fix <specific behavior>
Refactor <area> for readability
```

Gecmis degisiklikleri gormek icin:

```bash
git log --oneline
git show <commit>
git diff <commit1> <commit2>
```

Bu repo copluge donusmesin diye:
- Buyuk ekranlar zamanla daha kucuk componentlere bolunmeli.
- Klinik hesaplama UI'dan ayrilmali.
- Yeni klinik iddia mutlaka kaynak/version metadata ile gelmeli.
- Kullanilmayan dosya veya gecici zip'ler repoda tutulmamali.
- Veri dosyalari UI dosyalarindan ayrilmali.

## Yeni Modul Eklerken Kontrol Listesi

1. Modulun klinik amacini tek cumlede yaz.
2. Kaynak ve surum bilgisini belirle.
3. Veri dosyasi gerekiyorsa `data/` altina koy.
4. Hesaplama varsa `utils/` veya `services/` altina pure fonksiyon olarak yaz.
5. Ekrani `modules/` altina ekle.
6. Tekrar kullanilan UI varsa `components/` altina ayir.
7. `App.tsx` menusu ve render zincirine ekle.
8. `data/contentGovernance.ts` metadata ekle.
9. Kritik hesaplamaya test yaz.
10. `typecheck`, `lint`, `test` calistir.
11. Commit al.

## Gelecek Iyilestirme Notlari

- `App.tsx` giderek buyuyor; navigation ve menu yapisi ayri dosyalara alinabilir.
- Uzun modul ekranlari parcalara bolunebilir.
- Ortak chip/input/card stilleri merkezi tema dosyasina tasinabilir.
- Maestro veya benzeri aracla temel kullanici akis testleri eklenebilir.
- PFT, IOS ve MBW icin verified katsayi dosyalari bulunursa JSON semasina gore
  eklenip testlerle dogrulanabilir.
