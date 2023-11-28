# Simple Form

Aplikasi form sederhana menggunakan Next.js.

## Cara Menjalankan Aplikasi

Langkah-langkah untuk menjalankan aplikasi:

1. **Clone Repository:**

- git clone https://gitlab.com/diki_darma1/recruitment-test.git
- cd recruitment-test

2. **Instalasi Dependensi:**

- npm install

3. **Memulai Server Pengembangan:**

- npm run dev

## Fitur Aplikasi

# Backend API

Endpoint API untuk operasi CRUD pada tabel produk dan suplier.

## Produk

## Tambah Produk

Endpoint ini bertanggung jawab untuk menambahkan sebuah produk baru ke dalam database.

### HTTP Request

`POST /api/products/create`

### Request Body

Body request harus dikirim sebagai JSON dengan atribut sebagai berikut:

```json
{
  "nama": "string",
  "deskripsi": "string",
  "harga": "number",
  "stok": "number",
  "foto": "string",
  "suplier_id": "number"
}
```

- nama: Nama dari produk yang ingin ditambahkan.
- deskripsi: Deskripsi singkat dari produk.
- harga: Harga produk yang diinginkan.
- stok: Kuantitas stok produk.
- foto: URL atau path tempat foto produk disimpan. (Catatan: Pengunggahan foto dan pembaruan path di database belum diimplementasikan)
- suplier_id: ID dari suplier yang menyediakan produk.

Respon Sukses
Jika produk berhasil ditambahkan, server akan mengirim respon dengan status 200 OK dan body sebagai berikut:

```json
{
  "message": "Produk berhasil ditambahkan",
  "produk": {
    // Detail produk yang ditambahkan
  }
}
```

Respon Gagal
Jika metode request yang digunakan bukan POST, server akan mengirim respon dengan status 405 Method Not Allowed.
Jika terjadi kesalahan pada server atau ada masalah lainnya, server akan mengirim respon dengan status 500 Internal Server Error dan body sebagai berikut:

```json
{
  "message": "Terjadi kesalahan",
  "error": "Informasi error"
}
```

## Hapus Produk

Endpoint ini digunakan untuk menghapus sebuah produk dari database berdasarkan ID yang diberikan.

### HTTP Request

`DELETE /api/products/delete/[id]`

### URL Parameters

Parameter URL yang diperlukan adalah ID produk yang ingin dihapus.

- `id`: ID unik dari produk yang akan dihapus.

### Respon Sukses

Jika produk berhasil dihapus, server akan mengirim respon dengan status `200 OK` dan body sebagai berikut:

```json
{
  "message": "Produk berhasil dihapus"
}
```

Respon Gagal

- Jika metode request yang digunakan bukan DELETE, server akan mengirim respon dengan status 405 Method Not Allowed.
- Jika produk dengan ID yang diberikan tidak ditemukan, server akan mengirim respon dengan status 404 Not Found dan body sebagai berikut:

```json
{
  "message": "Produk tidak ditemukan"
}
```

- Jika terjadi kesalahan pada server atau ada masalah lainnya selama penghapusan, server akan mengirim respon dengan status 500 Internal Server Error dan body sebagai berikut:

```json
{
  "message": "Terjadi kesalahan",
  "error": "Informasi error"
}
```

## Lihat Detail Produk atau Semua Produk

Endpoint ini digunakan untuk mengambil detail produk tertentu berdasarkan ID, atau semua produk jika tidak ada ID yang diberikan.

### HTTP Request untuk Detail Produk

`GET /api/products/read/[id]`

### HTTP Request untuk Semua Produk

`GET /api/products/read`

### URL Parameters

Parameter URL opsional adalah ID produk yang ingin dilihat detailnya.

- `id`: ID unik dari produk yang ingin dilihat detailnya (opsional).

### Respon Sukses

- Jika ID disertakan dan produk ditemukan, server akan mengirim respon dengan status `200 OK` dan body yang berisi detail produk berserta suplier terkait.
- Jika tidak ada ID yang disertakan, server akan mengirim respon dengan status `200 OK` dan body yang berisi daftar semua produk dengan suplier terkait.

Contoh respon sukses untuk satu produk:

```json
{
  // Detail produk dengan informasi suplier
}
```

Respon Gagal
Jika ID disertakan tetapi produk tidak ditemukan, server akan mengirim respon dengan status 404 Not Found dan body sebagai berikut:

```json
{
  "message": "Produk tidak ditemukan"
}
```

Jika terjadi kesalahan pada server atau masalah lainnya selama proses pengambilan data, server akan mengirim respon dengan status 500 Internal Server Error dan body sebagai berikut:

```json
{
  "message": "Terjadi kesalahan",
  "error": "Informasi error"
}
```

## Memperbarui Produk

Endpoint ini digunakan untuk memperbarui informasi sebuah produk yang sudah ada dalam database berdasarkan ID produk.

### HTTP Request

`PUT /api/products/update/[id]`

### URL Parameters

Parameter URL yang diperlukan adalah ID produk yang ingin diperbarui.

- `id`: ID unik dari produk yang akan diperbarui.

### Request Body

Body request harus dikirim sebagai JSON dengan atribut produk yang ingin diperbarui. Semua field adalah opsional, hanya field yang ingin diubah yang perlu disertakan:

```json
{
  "nama": "string (opsional)",
  "deskripsi": "string (opsional)",
  "harga": "number (opsional)",
  "stok": "number (opsional)",
  "foto": "string (opsional)",
  "suplier_id": "number (opsional)"
}
```

- nama: Nama baru produk (jika ingin diubah).
- deskripsi: Deskripsi baru produk (jika ingin diubah).
- harga: Harga baru produk (jika ingin diubah).
- stok: Stok baru produk (jika ingin diubah).
- foto: Path baru untuk foto produk (jika ingin diubah).
- suplier_id: ID baru suplier produk (jika ingin diubah).

Respon Sukses
Jika produk berhasil diperbarui, server akan merespons dengan status HTTP 200 dan JSON body sebagai berikut:

```json
{
  "message": "Produk berhasil diperbarui",
  "produk": {
    // Detail produk yang telah diperbarui
  }
}
```

Respon Gagal

- Jika metode request bukan PUT, server akan merespons dengan status HTTP 405 Method Not Allowed.
- Jika produk dengan ID yang diberikan tidak ditemukan, server akan merespons dengan status HTTP 404 Not Found dan body sebagai berikut:

```json
{
  "message": "Produk tidak ditemukan"
}
```

- Jika terjadi kesalahan dalam proses pembaruan produk, server akan merespons dengan status HTTP 500 Internal Server Error dan body sebagai berikut:

```json
{
  "message": "Terjadi kesalahan",
  "error": "Informasi error"
}
```

## Suplier

## Tambah Suplier

Endpoint ini digunakan untuk menambahkan suplier baru ke dalam database.

### HTTP Request

`POST /api/suplier/create`

### Request Body

Body request harus dikirim sebagai JSON dengan atribut berikut:

```json
{
  "nama_suplier": "Nama Suplier",
  "alamat": "Alamat Suplier",
  "email": "Email Suplier"
}
```

- nama_suplier: Nama lengkap suplier.
- alamat: Alamat lengkap suplier.
- email: Email valid suplier.

Respon Sukses
Jika suplier berhasil ditambahkan, server akan mengirim respon dengan status 200 OK dan body sebagai berikut:

```json
{
  "message": "Supplier berhasil ditambahkan",
  "supplier": {
    "id": 1,
    "nama_suplier": "Nama Suplier",
    "alamat": "Alamat Suplier",
    "email": "Email Suplier"
  }
}
```

Respon Gagal

- Jika metode request yang digunakan bukan POST, server akan mengirim respon dengan status 405 Method Not Allowed.
- Jika terjadi kesalahan pada server atau ada masalah dalam pemrosesan data, server akan mengirim respon dengan status 500 Internal Server Error dan body sebagai berikut:

```json
{
  "message": "Terjadi kesalahan",
  "error": "Informasi error"
}
```

## Dapatkan Daftar Suplier

Endpoint ini digunakan untuk mengambil daftar semua suplier yang terdaftar dalam database.

### HTTP Request

`GET /api/suplier/read`

Tidak diperlukan parameter URL atau query untuk endpoint ini.

### Respon Sukses

Jika request berhasil, server akan mengirim respon dengan status `200 OK` dan body yang berisi array dari semua suplier:

```json
[
  {
    "id": 1,
    "nama_suplier": "Nama Suplier",
    "alamat": "Alamat Suplier",
    "email": "email@suplier.com",
    "createdAt": "2023-11-28T12:00:00.000Z",
    "updatedAt": "2023-11-28T12:00:00.000Z"
  }
  // ... lebih banyak suplier
]
```

Setiap objek dalam array akan mewakili seorang suplier dengan detail yang tersedia seperti id, nama_suplier, alamat, dan email, beserta timestamp createdAt dan updatedAt.

Respon Gagal
Jika terjadi kesalahan pada server selama proses pengambilan data, server akan mengirim respon dengan status 500 Internal Server Error dan body sebagai berikut:

```json
{
  "message": "Terjadi kesalahan",
  "error": "Informasi error"
}
```

# Frontend

- **Daftar Produk (/products):** Menampilkan semua produk.
- **Edit Produk (/products/[id]):** Form untuk mengedit produk.
- **Tambah (/products/create):** Form untuk menambah produk.
- **Form (/products/product_form):** Form Reusable.

## Teknologi yang Digunakan

- Next.js
- SQLite
- React

# Tambahan

## Implementasi Upload File Foto/Gambar

- Untuk upload foto/gambar, aplikasi menggunakan multer.
- Penyimpanan File: File foto/gambar berhasil di-upload dan disimpan.
- Database Update: Aplikasi belum dapat memperbarui entri database dengan path file yang baru disimpan.
