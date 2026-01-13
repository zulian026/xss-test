import React, { useState } from 'react';
import { SecurityMode } from '../types';

interface EducationPanelProps {
  securityMode: SecurityMode;
}

const EducationPanel: React.FC<EducationPanelProps> = ({ securityMode }) => {
  const [activeTab, setActiveTab] = useState<string>('xss-basics');

  const educationContent = {
    'xss-basics': {
      title: 'XSS Fundamentals',
      icon: 'fas fa-book',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">What is XSS?</h4>
            <p className="text-gray-700 mb-3">
              Cross-Site Scripting (XSS) adalah kerentanan keamanan web yang memungkinkan
              penyerang menyisipkan script berbahaya ke dalam halaman web yang dilihat pengguna lain.
            </p>

            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
              <h5 className="font-semibold text-blue-800 mb-2">Tipe XSS:</h5>
              <ul className="text-blue-700 text-xs space-y-1">
                <li><strong>Reflected XSS:</strong> Script dieksekusi langsung dari URL/input</li>
                <li><strong>Stored XSS:</strong> Script tersimpan di database (seperti komentar)</li>
                <li><strong>DOM XSS:</strong> Manipulasi DOM di sisi client</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Bagaimana XSS Bekerja?</h4>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <span>Attacker menyisipkan payload ke input form</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <span>Server menyimpan data tanpa validasi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <span>Korban mengakses halaman dengan payload</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <span>Browser mengeksekusi script berbahaya</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    'defacement': {
      title: 'Web Defacement',
      icon: 'fas fa-skull',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Apa itu Defacement?</h4>
            <p className="text-gray-700 mb-3">
              Defacement adalah teknik serangan yang mengubah tampilan visual dari sebuah website.
              Dalam konteks XSS, attacker dapat memodifikasi DOM untuk mengubah konten halaman.
            </p>

            <div className="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
              <h5 className="font-semibold text-red-800 mb-2">Teknik Defacement via XSS:</h5>
              <ul className="text-red-700 text-xs space-y-1">
                <li><strong>Background Manipulation:</strong> Mengubah warna dan style halaman</li>
                <li><strong>Content Replacement:</strong> Mengganti seluruh isi halaman</li>
                <li><strong>Title Hijacking:</strong> Mengubah judul browser</li>
                <li><strong>Visual Effects:</strong> Menambah animasi atau efek visual</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Impact Defacement</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-50 p-2 rounded">
                <h6 className="font-semibold text-orange-800 text-xs mb-1">Reputasi</h6>
                <p className="text-orange-700 text-xs">Merusak kredibilitas website</p>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <h6 className="font-semibold text-orange-800 text-xs mb-1">Bisnis</h6>
                <p className="text-orange-700 text-xs">Kehilangan kepercayaan user</p>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <h6 className="font-semibold text-orange-800 text-xs mb-1">SEO</h6>
                <p className="text-orange-700 text-xs">Penurunan ranking search</p>
              </div>
              <div className="bg-orange-50 p-2 rounded">
                <h6 className="font-semibold text-orange-800 text-xs mb-1">Legal</h6>
                <p className="text-orange-700 text-xs">Potensi masalah hukum</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Code Examples</h4>
            <div className="space-y-2">
              <div className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono">
                <div className="text-gray-400 mb-1">// Background Change</div>
                <div>document.body.style.background = 'black';</div>
              </div>
              <div className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono">
                <div className="text-gray-400 mb-1">// Content Replace</div>
                <div>document.body.innerHTML = '&lt;h1&gt;Hacked!&lt;/h1&gt;';</div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    'prevention': {
      title: 'Prevention & Mitigation',
      icon: 'fas fa-shield-alt',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Input Sanitization</h4>
            <p className="text-gray-700 mb-3">
              Teknik utama mencegah XSS adalah dengan melakukan sanitasi dan validasi input pengguna.
            </p>

            <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
              <h5 className="font-semibold text-green-800 mb-2">Best Practices:</h5>
              <ul className="text-green-700 text-xs space-y-1">
                <li>✅ <strong>HTML Encoding:</strong> Encode special characters (&lt;, &gt;, &amp;, ")</li>
                <li>✅ <strong>Whitelist Validation:</strong> Hanya izinkan karakter yang dibutuhkan</li>
                <li>✅ <strong>CSP Headers:</strong> Content Security Policy untuk membatasi script</li>
                <li>✅ <strong>HttpOnly Cookies:</strong> Mencegah akses cookie via JavaScript</li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Framework Protection</h4>
            <div className="space-y-2">
              <div className="bg-blue-50 p-2 rounded">
                <h6 className="font-semibold text-blue-800 text-xs mb-1">React</h6>
                <p className="text-blue-700 text-xs">Otomatis escape content, avoid dangerouslySetInnerHTML</p>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <h6 className="font-semibold text-blue-800 text-xs mb-1">Angular</h6>
                <p className="text-blue-700 text-xs">Built-in XSS protection dengan sanitization</p>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <h6 className="font-semibold text-blue-800 text-xs mb-1">Vue.js</h6>
                <p className="text-blue-700 text-xs">Template sanitization, avoid v-html dengan user input</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Code Comparison</h4>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <h6 className="text-xs font-semibold text-red-600 mb-1">❌ Vulnerable Code</h6>
                <div className="bg-red-50 p-2 rounded text-xs font-mono text-red-800">
                  element.innerHTML = userInput;
                </div>
              </div>
              <div>
                <h6 className="text-xs font-semibold text-green-600 mb-1">✅ Secure Code</h6>
                <div className="bg-green-50 p-2 rounded text-xs font-mono text-green-800">
                  element.textContent = userInput;
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    'pentesting': {
      title: 'Ethical Pentesting',
      icon: 'fas fa-user-ninja',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Pentesting Methodology</h4>
            <p className="text-gray-700 mb-3">
              Pendekatan sistematis untuk menguji kerentanan XSS dalam aplikasi web.
            </p>

            <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
              <h5 className="font-semibold text-purple-800 mb-2">Testing Steps:</h5>
              <ol className="text-purple-700 text-xs space-y-1 list-decimal list-inside">
                <li>Identifikasi input fields dan parameter</li>
                <li>Test basic payloads (&lt;script&gt;alert()&lt;/script&gt;)</li>
                <li>Bypass filtering dengan encoding</li>
                <li>Test event handlers (onload, onerror)</li>
                <li>Uji berbagai context (HTML, attribute, JavaScript)</li>
                <li>Dokumentasikan hasil dan impact</li>
              </ol>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Common Payloads</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              <div className="bg-gray-100 p-2 rounded text-xs">
                <strong>Basic:</strong> &lt;script&gt;alert('XSS')&lt;/script&gt;
              </div>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <strong>Image:</strong> &lt;img src=x onerror="alert(1)"&gt;
              </div>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <strong>SVG:</strong> &lt;svg onload=alert(1)&gt;
              </div>
              <div className="bg-gray-100 p-2 rounded text-xs">
                <strong>Body:</strong> &lt;body onload=alert(1)&gt;
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Ethical Guidelines</h4>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
              <ul className="text-amber-800 text-xs space-y-1">
                <li>🔒 <strong>Permission:</strong> Hanya test pada sistem yang diizinkan</li>
                <li>📊 <strong>Documentation:</strong> Catat semua findings dengan jelas</li>
                <li>🛡️ <strong>Responsible:</strong> Laporkan vulnerability secara bertanggung jawab</li>
                <li>🚫 <strong>No Damage:</strong> Jangan merusak atau mengakses data sensitive</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },

    'tools': {
      title: 'Security Tools',
      icon: 'fas fa-tools',
      content: (
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Automated Scanners</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-2 rounded text-center">
                <i className="fas fa-spider text-red-500 text-lg mb-1"></i>
                <h6 className="font-semibold text-xs">Burp Suite</h6>
                <p className="text-xs text-gray-600">Web vulnerability scanner</p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <i className="fas fa-search text-blue-500 text-lg mb-1"></i>
                <h6 className="font-semibold text-xs">OWASP ZAP</h6>
                <p className="text-xs text-gray-600">Free security testing proxy</p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <i className="fas fa-code text-green-500 text-lg mb-1"></i>
                <h6 className="font-semibold text-xs">XSStrike</h6>
                <p className="text-xs text-gray-600">Advanced XSS detection tool</p>
              </div>
              <div className="bg-gray-50 p-2 rounded text-center">
                <i className="fas fa-terminal text-purple-500 text-lg mb-1"></i>
                <h6 className="font-semibold text-xs">Nuclei</h6>
                <p className="text-xs text-gray-600">Fast vulnerability scanner</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Browser Extensions</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                <i className="fab fa-firefox text-orange-500"></i>
                <div>
                  <h6 className="font-semibold text-xs">HackBar</h6>
                  <p className="text-xs text-gray-600">Testing toolbar untuk penetration testing</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                <i className="fas fa-bug text-red-500"></i>
                <div>
                  <h6 className="font-semibold text-xs">XSS Hunter</h6>
                  <p className="text-xs text-gray-600">Platform untuk blind XSS detection</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-2">Manual Testing</h4>
            <div className="bg-indigo-50 p-3 rounded-lg">
              <h5 className="font-semibold text-indigo-800 mb-2 text-xs">Testing Checklist:</h5>
              <ul className="text-indigo-700 text-xs space-y-1">
                <li>□ Test all input fields (search, login, comment, etc.)</li>
                <li>□ Check URL parameters dan headers</li>
                <li>□ Test different payload encoding (URL, HTML, JS)</li>
                <li>□ Verify context (HTML tag, attribute, script)</li>
                <li>□ Check for filtering bypass techniques</li>
                <li>□ Test DOM-based XSS scenarios</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  };

  const tabs = Object.keys(educationContent);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-graduation-cap text-indigo-500"></i>
          XSS Education Center
        </h3>

        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          securityMode === SecurityMode.VULNERABLE
            ? 'bg-red-100 text-red-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {securityMode === SecurityMode.VULNERABLE ? '🔓 Learning Mode' : '🔒 Safe Mode'}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 mb-6">
        {tabs.map((tab) => {
          const content = educationContent[tab as keyof typeof educationContent];
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-3 py-2 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === tab
                  ? 'bg-indigo-500 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <i className={content.icon}></i>
              <span className="hidden sm:inline">{content.title}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px] max-h-96 overflow-y-auto">
        {educationContent[activeTab as keyof typeof educationContent]?.content}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            <i className="fas fa-info-circle mr-1"></i>
            Educational content untuk ethical security testing
          </span>
          <div className="flex items-center gap-4">
            <span>
              <i className="fas fa-eye mr-1"></i>
              Mode: {securityMode}
            </span>
            <button
              onClick={() => setActiveTab('xss-basics')}
              className="text-indigo-500 hover:underline"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPanel;
