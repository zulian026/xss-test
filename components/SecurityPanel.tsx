
import React from 'react';
import { SecurityMode } from '../types';
import { XSS_PAYLOADS } from '../constants';

interface SecurityPanelProps {
  securityMode: SecurityMode;
  setSecurityMode: (mode: SecurityMode) => void;
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({ securityMode, setSecurityMode }) => {
  return (
    <div className="space-y-6 sticky top-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="fas fa-flask text-indigo-500"></i>
          XSS Security Lab
        </h3>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Gunakan tombol di bawah untuk beralih antara implementasi kode yang rentan dan yang aman.
          </p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setSecurityMode(SecurityMode.VULNERABLE)}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                securityMode === SecurityMode.VULNERABLE 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>Vulnerable Mode</span>
              {securityMode === SecurityMode.VULNERABLE && <i className="fas fa-check"></i>}
            </button>
            <button 
              onClick={() => setSecurityMode(SecurityMode.SECURE)}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                securityMode === SecurityMode.SECURE 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span>Secure Mode</span>
              {securityMode === SecurityMode.SECURE && <i className="fas fa-check"></i>}
            </button>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800">
          <i className="fas fa-info-circle mr-1"></i>
          <strong>Edukasi:</strong> Di dunia nyata, jangan pernah gunakan <code className="bg-amber-100 px-1 rounded">innerHTML</code> dengan input dari pengguna tanpa sanitasi.
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-widest flex items-center gap-2">
          <i className="fas fa-bug text-red-500"></i>
          Payload Testing
        </h3>
        <p className="text-xs text-gray-500 mb-4 italic">
          Copy & paste payload ini ke kolom komentar untuk melihat perbedaannya:
        </p>
        <div className="space-y-2">
          {XSS_PAYLOADS.map((p, i) => (
            <div key={i} className="group relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase">{p.label}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(p.payload)}
                  className="text-[10px] text-indigo-500 hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Copy
                </button>
              </div>
              <code className="block p-2 bg-gray-50 rounded border border-gray-100 text-[10px] font-mono break-all text-gray-600">
                {p.payload}
              </code>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-indigo-900 text-white rounded-xl shadow-lg">
        <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
          <i className="fas fa-graduation-cap"></i>
          Tugas Belajar
        </h4>
        <ol className="text-xs space-y-2 list-decimal list-inside opacity-90">
          <li>Aktifkan <strong>Vulnerable Mode</strong></li>
          <li>Masukkan payload "Basic Alert"</li>
          <li>Lihat alert muncul</li>
          <li>Aktifkan <strong>Secure Mode</strong></li>
          <li>Lihat payload ditampilkan sebagai teks biasa tanpa dieksekusi</li>
        </ol>
      </div>
    </div>
  );
};

export default SecurityPanel;
