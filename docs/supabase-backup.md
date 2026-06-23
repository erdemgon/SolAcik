# Supabase encrypted backup

Bu repo haftalik sifreli Supabase yedegi alacak sekilde ayarlanmistir.

Workflow:

- `.github/workflows/supabase-backup.yml`

Yedeklenen tablo:

- `editor_feedback`

## GitHub secrets

GitHub reposunda `Settings > Secrets and variables > Actions` altina sunlari ekleyin:

- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase `service_role` key
- `BACKUP_ENCRYPTION_PASSWORD`: Uzun, guclu, kaybedilmeyecek bir sifre

`service_role` key tarayiciya veya uygulama koduna konmaz. Sadece GitHub Actions secret olarak kullanilir.

## Nasil calisir?

Her Pazar `02:47 UTC` civarinda Supabase REST API ile tum satirlar JSON olarak alinir, `tar.gz` haline getirilir ve `openssl aes-256-cbc` ile sifrelenir. GitHub artifact olarak yalniz sifreli dosya saklanir.

Artifact retention suresi 30 gundur.

## Geri yukleme / acma

Artifact dosyasini indirdikten sonra:

```bash
openssl enc -d -aes-256-cbc -pbkdf2 -iter 200000 \
  -in supabase-backup.tar.gz.enc \
  -out supabase-backup.tar.gz \
  -pass pass:'BACKUP_SIFRENIZ'

tar -xzf supabase-backup.tar.gz
```

Bu islem JSON yedegini acar. Veritabanina geri yukleme ayrica planlanmalidir.
