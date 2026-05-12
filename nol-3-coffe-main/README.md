<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/a77b0704-bf1a-409f-9ec3-0f5559799390

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub & Vercel

Untuk mengunggah kode ini ke GitHub dan menghubungkannya ke Vercel, ikuti langkah berikut di terminal Anda:

1. **Inisialisasi Git:**
   ```bash
   git init
   git add .
   git commit -m "Update: Menambahkan foto produk dan konfigurasi otomatis"
   ```

2. **Hubungkan ke GitHub:**
   Buat repository baru di GitHub, lalu jalankan:
   ```bash
   git remote add origin https://github.com/USERNAME/REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Deploy ke Vercel:**
   - Masuk ke [Vercel](https://vercel.com/new).
   - Pilih repository GitHub yang baru saja Anda buat.
   - Klik **Deploy**.
