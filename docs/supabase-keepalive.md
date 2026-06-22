# Supabase keepalive

Bu repo, Sol Acik feedback backend'inin Supabase Free Plan'da inaktivite nedeniyle pause olma riskini azaltmak icin hafif bir GitHub Actions keepalive workflow'u icerir.

## Kurulum

GitHub reposunda `Settings > Secrets and variables > Actions > New repository secret` bolumune sunlari ekleyin:

- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase `anon public` API key

Workflow dosyasi:

- `.github/workflows/supabase-keepalive.yml`

## Nasil calisir?

Haftada iki kez `editor_feedback` tablosundan yalnizca 1 kaydin `id` alanini okuyan hafif bir REST istegi atar:

```text
/rest/v1/editor_feedback?select=id&limit=1
```

Yazma, silme veya schema degisikligi yapmaz. `service_role` key yerine `anon public` key kullanilmasi onerilir.

## Sinirlar

Supabase dokumanlari Free Plan projelerin dusuk aktivitede pause edilebilecegini, Pro Plan'in bunu garanti olarak engelledigini soyler. Bu workflow pause riskini azaltir ama resmi garanti degildir.
