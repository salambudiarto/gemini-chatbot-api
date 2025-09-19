# Chatbot AI Gemini - Layanan Pelanggan Coffee Shop

Aplikasi chatbot modern dan responsif yang didukung oleh Google Gemini AI, dirancang khusus untuk layanan pelanggan coffee shop. Sistem ini memberikan respons yang cerdas dan kontekstual dengan nada yang hangat dan ramah untuk meningkatkan pengalaman pelanggan.

## 🌟 Demo Langsung

**[Coba Demo Langsung](https://cbt-fp-htv8-w6-s5.arto.biz.id/)**

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Arsitektur Sistem](#arsitektur-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Cara Penggunaan](#cara-penggunaan)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Keamanan](#keamanan)
- [Performa dan Optimasi](#performa-dan-optimasi)
- [Monitoring dan Logging](#monitoring-dan-logging)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## ✨ Fitur Utama

### Fungsionalitas Inti
- **Respons AI yang Cerdas**: Didukung oleh Google Gemini AI dengan sistem fallback multi-model
- **Percakapan Kontekstual**: Mempertahankan riwayat chat untuk interaksi yang koheren dan kontekstual
- **Dukungan Multi-Sesi**: Menangani beberapa sesi pengguna secara bersamaan dan independen
- **Komunikasi Real-time**: Pemrosesan pesan dan pengiriman respons secara instan
- **Desain Responsif**: Dioptimalkan untuk desktop, tablet, dan perangkat mobile

### Pengalaman Pengguna
- **Persona Coffee Shop**: AI yang dilatih khusus untuk layanan pelanggan coffee shop
- **Nada Hangat & Ramah**: Gaya komunikasi yang konsisten dan menyambut
- **Indikator Mengetik**: Umpan balik visual selama pemrosesan pesan
- **Percakapan Baru**: Fungsi reset percakapan yang mudah digunakan
- **Riwayat Pesan**: Riwayat chat yang persisten dalam sesi
- **Penanganan Error**: Manajemen error yang elegan dengan pesan yang user-friendly

### Fitur Teknis Lanjutan
- **Sistem Fallback Model**: Failover otomatis antar multiple model Gemini
- **Penanganan Rate Limit**: Mekanisme retry yang cerdas untuk batasan API
- **Manajemen Sesi**: Penanganan sesi yang aman dengan identifier unik
- **Health Monitoring**: Endpoint pemantauan kesehatan sistem built-in
- **Caching Cerdas**: Optimasi performa dengan caching response
- **Load Balancing Ready**: Siap untuk implementasi load balancing

## 🛠 Teknologi yang Digunakan

### Backend
- **Runtime**: Node.js dengan ES Modules
- **Framework**: Express.js 4.18.2 - Framework web yang cepat dan minimalis
- **AI Integration**: Google Generative AI SDK (@google/generative-ai)
- **Environment Management**: dotenv untuk manajemen konfigurasi
- **Arsitektur API**: Desain RESTful API yang clean dan scalable
- **Memory Management**: In-memory storage untuk chat histories (dapat diupgrade ke database)

### Frontend
- **Bahasa**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Styling**: CSS modern dengan Flexbox, CSS Grid, dan animasi smooth
- **Desain Responsif**: Pendekatan mobile-first dengan media queries
- **User Interface**: Interface chat yang bersih dan intuitif
- **Aksesibilitas**: HTML semantik dan dukungan navigasi keyboard
- **Progressive Enhancement**: Degradasi yang elegan untuk browser lama

### Model AI (Urutan Fallback)
1. **gemini-2.5-flash** (Utama) - Model terbaru dengan performa optimal
2. **gemini-2.5-flash-lite** - Versi ringan untuk respons cepat
3. **gemini-2.0-flash** - Model stabil dengan akurasi tinggi
4. **gemini-2.0-flash-lite** - Backup dengan latensi rendah
5. **gemini-1.5-flash** (Fallback) - Model cadangan yang reliable

## 🏗 Arsitektur Sistem

### Gambaran Umum Sistem
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Gemini AI     │
│   (Static)      │◄──►│   (Express)     │◄──►│   (Google)      │
│                 │    │                 │    │                 │
│ • HTML/CSS/JS   │    │ • Session Mgmt  │    │ • Multiple      │
│ • Chat UI       │    │ • API Routes    │    │   Models        │
│ • Responsive    │    │ • Error Handle  │    │ • Fallback      │
│ • Real-time     │    │ • Rate Limiting │    │ • Safety Filter │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Komponen Utama

#### Komponen Backend
- **Chat Controller**: Menangani pemrosesan pesan dan integrasi AI
- **Session Manager**: Mengelola sesi pengguna dan riwayat chat
- **Model Fallback**: Implementasi switching model yang cerdas
- **Error Handler**: Penanganan error yang robust dan recovery
- **Static Server**: Melayani aset frontend dengan efisien
- **Rate Limiter**: Kontrol laju permintaan untuk stabilitas sistem

#### Komponen Frontend
- **Chat Interface**: UI messaging yang interaktif dan responsif
- **Message Handler**: Memproses input pengguna dan menampilkan respons
- **Session Manager**: Mengelola state sesi di sisi klien
- **UI Controller**: Menangani feedback visual dan animasi
- **Error Display**: Tampilan error yang informatif dan user-friendly

## 🚀 Instalasi

### Prasyarat
- Node.js (v16 atau lebih tinggi)
- npm atau yarn package manager
- Akun Google Cloud Platform dengan akses Gemini API
- Koneksi internet yang stabil

### Langkah-langkah Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd gemini-ai-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi environment**
   ```bash
   cp .env.example .env
   # Edit .env dengan konfigurasi Anda
   ```

4. **Jalankan aplikasi**
   ```bash
   npm start
   ```

Aplikasi akan tersedia di `http://localhost:3000`

## ⚙️ Konfigurasi

### Environment Variables

Buat file `.env` di root directory:

```env
# Wajib: Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Opsional: Konfigurasi Server
PORT=3000
NODE_ENV=production

# Opsional: Konfigurasi AI
MAX_TOKENS=150
TEMPERATURE=0.7
TOP_P=0.8
TOP_K=40
```

### Konfigurasi Gemini AI

Sistem menggunakan konfigurasi AI berikut:
- **Temperature**: 0.7 (keseimbangan kreativitas/konsistensi)
- **Top P**: 0.8 (nucleus sampling)
- **Top K**: 40 (diversitas seleksi token)
- **Max Output Tokens**: 150 (respons yang ringkas)
- **Safety Settings**: Blocking medium+ untuk konten berbahaya

### Konfigurasi Sistem Prompt

```javascript
const systemPrompt = `
Sistem: Kamu adalah customer service dari coffee shop, 
selalu hangat kepada customer, dan selalu beri jawaban 
kurang dari 1 kalimat
`;
```

## 📖 Cara Penggunaan

### Memulai Percakapan
1. Buka aplikasi di web browser Anda
2. Ketik pesan Anda di kolom input
3. Tekan Enter atau klik "Send"
4. AI akan merespons sebagai customer service coffee shop yang ramah

### Mengelola Percakapan
- **Percakapan Baru**: Klik tombol "🔄 New Conversation" untuk reset riwayat chat
- **Persistensi Sesi**: Riwayat chat dipertahankan dalam sesi browser
- **Multiple Tab**: Setiap tab mempertahankan percakapan independen

### Contoh Interaksi
```
User: "Kopi apa yang direkomendasikan?"
Bot: "Saya rekomendasikan espresso blend signature kami! ☕"

User: "Ada pastry tidak?"
Bot: "Ada croissant dan muffin fresh hari ini! 🥐"

User: "Berapa harga cappuccino?"
Bot: "Cappuccino kami 25rb, dengan foam art cantik! ☕✨"
```

## 🔌 API Endpoints

### Chat Endpoints

#### POST `/chat`
Mengirim pesan ke AI chatbot.

**Request Body:**
```json
{
  "message": "Halo, kopi apa yang direkomendasikan?",
  "sessionId": "session_123456789"
}
```

**Response:**
```json
{
  "response": "Saya rekomendasikan espresso blend signature kami! ☕",
  "sessionId": "session_123456789"
}
```

**Error Response:**
```json
{
  "error": "Maaf, terjadi kesalahan sistem. Silakan coba lagi dalam beberapa saat."
}
```

#### GET `/chat/:sessionId/history`
Mengambil riwayat chat untuk sesi tertentu.

**Response:**
```json
{
  "sessionId": "session_123456789",
  "history": [
    {
      "role": "user",
      "parts": [{"text": "Halo"}]
    },
    {
      "role": "model", 
      "parts": [{"text": "Halo! Selamat datang di coffee shop kami! ☕"}]
    }
  ]
}
```

#### DELETE `/chat/:sessionId`
Menghapus riwayat chat untuk sesi tertentu.

**Response:**
```json
{
  "message": "Chat history cleared",
  "sessionId": "session_123456789"
}
```

### Utility Endpoints

#### GET `/health`
Endpoint health check untuk monitoring.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600
}
```

## 🚀 Deployment

### Production Deployment

1. **Setup Environment**
   ```bash
   export NODE_ENV=production
   export GEMINI_API_KEY=your_production_api_key
   export PORT=3000
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

### Docker Deployment

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
CMD ["npm", "start"]
```

### Reverse Proxy Configuration

Untuk deployment production, gunakan nginx sebagai reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    
    location / {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
        
        # Timeout settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

## 🔒 Keamanan

### Implementasi Keamanan
- **API Key Protection**: API key disimpan dengan aman di environment variables
- **Rate Limiting**: Pembatasan laju permintaan untuk mencegah abuse
- **Input Validation**: Validasi input pengguna untuk mencegah injection
- **CORS Configuration**: Konfigurasi CORS yang tepat untuk keamanan
- **Error Sanitization**: Sanitasi error message untuk mencegah information leakage

### Safety Settings Gemini AI
```javascript
safetySettings: [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  // ... pengaturan keamanan lainnya
]
```

## ⚡ Performa dan Optimasi

### Optimasi Backend
- **Memory Management**: Pengelolaan memori yang efisien untuk chat histories
- **Connection Pooling**: Optimasi koneksi ke Gemini API
- **Response Caching**: Caching respons untuk query yang sering muncul
- **Compression**: Kompresi response untuk mengurangi bandwidth

### Optimasi Frontend
- **Lazy Loading**: Loading konten secara bertahap
- **Debouncing**: Optimasi input handling untuk mengurangi API calls
- **Local Storage**: Penyimpanan lokal untuk preferensi pengguna
- **Progressive Enhancement**: Peningkatan bertahap untuk berbagai browser

### Metrics Performa
- **Response Time**: < 2 detik untuk respons AI
- **Uptime**: 99.9% availability target
- **Concurrent Users**: Mendukung hingga 100 pengguna bersamaan
- **Memory Usage**: Optimasi penggunaan memori untuk long-running sessions

## 📊 Monitoring dan Logging

### Logging System
```javascript
// Contoh implementasi logging
console.log(`[${new Date().toISOString()}] Received message:`, { message, sessionId });
console.log(`[${new Date().toISOString()}] Using model: ${modelName}`);
console.error(`[${new Date().toISOString()}] API Error:`, error.message);
```

### Monitoring Metrics
- **API Response Times**: Monitoring waktu respons API
- **Error Rates**: Tracking tingkat error dan jenis error
- **User Sessions**: Monitoring jumlah sesi aktif
- **Model Usage**: Tracking penggunaan model AI dan fallback

### Health Checks
- **Server Health**: Endpoint `/health` untuk monitoring server
- **API Connectivity**: Pengecekan konektivitas ke Gemini API
- **Memory Usage**: Monitoring penggunaan memori sistem
- **Response Quality**: Monitoring kualitas respons AI

## 🔧 Development

### Struktur Proyek
```
├── index.js              # File server utama
├── package.json          # Dependencies dan scripts
├── .env                  # Environment variables
├── static/               # Aset frontend
│   ├── index.html       # File HTML utama
│   ├── style.css        # Styling
│   └── script.js        # JavaScript client-side
├── docs/                 # Dokumentasi
├── tests/                # Test files
└── README.md            # File ini
```

### Implementasi Fitur Utama

#### Sistem Fallback Model
Aplikasi mengimplementasikan mekanisme fallback yang sophisticated yang secara otomatis beralih antar model Gemini yang berbeda jika satu model tidak tersedia atau terkena rate limit.

#### Manajemen Sesi
Setiap sesi pengguna diberi identifier unik, memungkinkan riwayat percakapan yang independen dan dukungan pengguna bersamaan.

#### Penanganan Error
Penanganan error yang komprehensif memastikan degradasi yang elegan dan pesan error yang user-friendly, bahkan selama kegagalan API.

### Testing Strategy
- **Unit Tests**: Testing komponen individual
- **Integration Tests**: Testing integrasi antar komponen
- **Load Testing**: Testing performa dengan beban tinggi
- **User Acceptance Testing**: Testing pengalaman pengguna

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Berikut cara berkontribusi:

1. Fork repository ini
2. Buat feature branch (`git checkout -b feature/fitur-amazing`)
3. Commit perubahan Anda (`git commit -m 'Tambah fitur amazing'`)
4. Push ke branch (`git push origin feature/fitur-amazing`)
5. Buat Pull Request

### Guidelines Kontribusi
- Ikuti coding standards yang ada
- Tambahkan tests untuk fitur baru
- Update dokumentasi jika diperlukan
- Pastikan semua tests pass sebelum submit PR

## 📈 Roadmap

### Fitur yang Akan Datang
- **Database Integration**: Migrasi dari in-memory ke database persistent
- **User Authentication**: Sistem login dan profil pengguna
- **Analytics Dashboard**: Dashboard untuk monitoring dan analytics
- **Multi-language Support**: Dukungan bahasa Indonesia dan Inggris
- **Voice Integration**: Dukungan input dan output suara
- **Mobile App**: Aplikasi mobile native

### Peningkatan Teknis
- **Microservices Architecture**: Migrasi ke arsitektur microservices
- **Redis Caching**: Implementasi Redis untuk caching
- **WebSocket Support**: Real-time communication dengan WebSocket
- **API Versioning**: Versioning API untuk backward compatibility

## 📄 Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 🙏 Acknowledgments

- Google Gemini AI untuk menyediakan model bahasa yang powerful
- Komunitas Express.js untuk framework web yang robust
- Semua kontributor yang membantu meningkatkan proyek ini
- Coffee shop lokal yang menginspirasi persona AI ini

## 📞 Dukungan

Untuk pertanyaan, bug report, atau saran:
- **Email**: support@example.com
- **Issues**: Buka issue di repository ini
- **Documentation**: Lihat dokumentasi lengkap di `/docs`

---

**Dibuat dengan ❤️ untuk para pecinta kopi di mana saja** ☕

*Terakhir diupdate: Januari 2024*