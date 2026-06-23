# Supabase Feedback Backend Kurulumu

Bu dokuman, Sol Acik editor feedback sistemini Vercel + Supabase ile calistirmak
icin gereken minimum kurulumu anlatir.

## Amac

Hasta verisi tutulmaz. Yalnizca editor feedback kayitlari saklanir:

- editor kisa adi
- uygulama rolu
- klinik rol
- modul
- katkı alani
- elestiri/sorun
- onerilen duzenleme
- kaynak/gerekce
- admin icin Codex komut metni
- durum: pending / accepted / rejected / done

## Supabase Tablosu

Supabase SQL editorunde su tabloyu olustur:

```sql
create table if not exists public.editor_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  module_title text not null,
  user_name text not null,
  app_role text not null,
  clinical_role text not null,
  contribution_area text not null,
  edit_intent text not null,
  feedback text not null,
  suggested_edit text not null,
  source_note text not null,
  command_text text not null,
  status text not null default 'pending'
    check (status in ('pending', 'accepted', 'rejected', 'done'))
);

create index if not exists editor_feedback_created_at_idx
  on public.editor_feedback (created_at desc);

create index if not exists editor_feedback_status_idx
  on public.editor_feedback (status);
```

## Vercel Environment Variables

Vercel project settings icinde su environment variable'lari ekle:

```text
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_SIDE_SERVICE_ROLE_KEY
```

Onemli:

- `SUPABASE_SERVICE_ROLE_KEY` asla Expo public env icine konmaz.
- Bu key sadece Vercel serverless function tarafinda kullanilir.
- Mobil/web client yalniz `/api/editor-feedback` endpoint'ine istek atar.

## Opsiyonel Client Base URL

Native Expo testlerinde API ayni domain'de degilse:

```text
EXPO_PUBLIC_API_BASE_URL=https://sol-acik.vercel.app
```

Web deploy'da genellikle bos birakilabilir; relative `/api/editor-feedback`
kullanilir.

## Guvenlik Notu

Bu ilk surum gercek hastane kimlik dogrulamasi degildir. Klinik feedback toplamak
icin hafif bir backend'dir. Hasta verisi, TC kimlik, dogum tarihi, telefon, adres,
hastane numarasi veya tanimlayici saglik verisi yazilmamalidir.

## Ucretsiz Plan / Proje Askıya Alma Notu

Supabase ucretsiz plan limitleri ve inactivity/suspension kurallari servis
kosullarina gore yonetilir. Uzun sure hic kullanim olmazsa proje Supabase
tarafinda pause/suspend olabilir; bu durumda Supabase panelinden proje tekrar
etkinlestirilmeli veya gereksinim artarsa uygun plana gecilmelidir.

Pause riskini azaltmak icin opsiyonel GitHub Actions keepalive workflow'u
eklenmistir. Kurulum ve sinirlar icin `docs/supabase-keepalive.md` dosyasina
bakin. Bu workflow garanti degil, yalnizca haftada iki kez hafif bir okuma
istegi atan dusuk riskli bir onlemdir.

## Haftalik Yedek

Feedback verileri icin haftalik sifreli Supabase backup workflow'u eklenmistir.
Kurulum ve geri acma notlari icin `docs/supabase-backup.md` dosyasina bakin.
