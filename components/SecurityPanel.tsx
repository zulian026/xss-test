import React, { useState } from "react";
import { SecurityMode, XSSPayload } from "../types";
import { XSS_PAYLOADS } from "../constants";

interface SecurityPanelProps {
  securityMode: SecurityMode;
  setSecurityMode: (mode: SecurityMode) => void;
}

const SecurityPanel: React.FC<SecurityPanelProps> = ({
  securityMode,
  setSecurityMode,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Basic XSS");
  const [showAllPayloads, setShowAllPayloads] = useState<boolean>(false);

  // Group payloads by category
  const payloadsByCategory = XSS_PAYLOADS.reduce(
    (acc, payload) => {
      if (!acc[payload.category]) {
        acc[payload.category] = [];
      }
      acc[payload.category].push(payload);
      return acc;
    },
    {} as Record<string, XSSPayload[]>,
  );

  const categories = Object.keys(payloadsByCategory);

  return (
    <div className="space-y-6 sticky top-20">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <i className="fas fa-flask text-indigo-500"></i>
          XSS Security Lab
        </h3>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Gunakan tombol di bawah untuk beralih antara implementasi kode yang
            rentan dan yang aman.
          </p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setSecurityMode(SecurityMode.VULNERABLE)}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                securityMode === SecurityMode.VULNERABLE
                  ? "bg-red-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>Vulnerable Mode</span>
              {securityMode === SecurityMode.VULNERABLE && (
                <i className="fas fa-check"></i>
              )}
            </button>
            <button
              onClick={() => setSecurityMode(SecurityMode.SECURE)}
              className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                securityMode === SecurityMode.SECURE
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <span>Secure Mode</span>
              {securityMode === SecurityMode.SECURE && (
                <i className="fas fa-check"></i>
              )}
            </button>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-xs text-amber-800">
          <i className="fas fa-info-circle mr-1"></i>
          <strong>Edukasi:</strong> Di dunia nyata, jangan pernah gunakan{" "}
          <code className="bg-amber-100 px-1 rounded">innerHTML</code> dengan
          input dari pengguna tanpa sanitasi.
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-bug text-red-500"></i>
            Payload Arsenal
          </h3>
          <button
            onClick={() => setShowAllPayloads(!showAllPayloads)}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            {showAllPayloads ? "Collapse" : "Expand All"}
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-4 italic">
          Pilih kategori dan copy payload ke kolom komentar:
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs px-3 py-1 rounded-full transition-all ${
                selectedCategory === category
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Payload Display */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {(showAllPayloads ? categories : [selectedCategory]).map(
            (category) => (
              <div key={category}>
                {showAllPayloads && (
                  <h4 className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1">
                    {category === "Defacement" && (
                      <i className="fas fa-skull text-red-500"></i>
                    )}
                    {category === "Basic XSS" && (
                      <i className="fas fa-code text-blue-500"></i>
                    )}
                    {category === "Advanced" && (
                      <i className="fas fa-rocket text-purple-500"></i>
                    )}
                    {category === "Social Engineering" && (
                      <i className="fas fa-mask text-orange-500"></i>
                    )}
                    {category}
                  </h4>
                )}
                {payloadsByCategory[category]?.map((payload, i) => (
                  <div
                    key={`${category}-${i}`}
                    className="group relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="text-xs font-bold text-gray-700">
                          {payload.label}
                        </span>
                        {payload.category === "Defacement" && (
                          <span className="ml-2 text-[9px] bg-red-100 text-red-600 px-1 rounded">
                            VISUAL IMPACT
                          </span>
                        )}
                        {payload.category === "Advanced" && (
                          <span className="ml-2 text-[9px] bg-purple-100 text-purple-600 px-1 rounded">
                            HIGH RISK
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(payload.payload);
                          // Visual feedback
                          const btn = document.activeElement;
                          if (btn) {
                            (btn as HTMLElement).style.background = "#10b981";
                            (btn as HTMLElement).innerText = "Copied!";
                            setTimeout(() => {
                              (btn as HTMLElement).style.background = "";
                              (btn as HTMLElement).innerText = "Copy";
                            }, 1000);
                          }
                        }}
                        className="text-[10px] px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-[9px] text-gray-500 mb-2 italic">
                      {payload.description}
                    </p>
                    <code className="block p-2 bg-white rounded border border-gray-200 text-[9px] font-mono break-all text-gray-600 max-h-20 overflow-y-auto">
                      {payload.payload}
                    </code>
                  </div>
                ))}
              </div>
            ),
          )}
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-indigo-900 to-purple-900 text-white rounded-xl shadow-lg">
        <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
          <i className="fas fa-graduation-cap"></i>
          Lab Exercises
        </h4>

        <div className="space-y-4">
          {/* Basic Lab */}
          <div>
            <h5 className="text-xs font-semibold mb-2 text-indigo-200">
              🔰 Basic XSS Lab:
            </h5>
            <ol className="text-[10px] space-y-1 list-decimal list-inside opacity-90">
              <li>
                Aktifkan <strong>Vulnerable Mode</strong>
              </li>
              <li>Copy payload "Basic Alert"</li>
              <li>Paste di kolom komentar dan submit</li>
              <li>Lihat alert muncul</li>
              <li>
                Switch ke <strong>Secure Mode</strong> dan ulangi
              </li>
            </ol>
          </div>

          {/* Defacement Lab */}
          <div className="border-t border-indigo-700 pt-3">
            <h5 className="text-xs font-semibold mb-2 text-red-200">
              💀 Defacement Lab:
            </h5>
            <ol className="text-[10px] space-y-1 list-decimal list-inside opacity-90">
              <li>
                Pilih kategori <strong>"Defacement"</strong>
              </li>
              <li>Coba "Background Hijack" atau "Title Deface"</li>
              <li>Refresh halaman untuk reset</li>
              <li>Bandingkan efek visual di kedua mode</li>
            </ol>
          </div>

          {/* Advanced Lab */}
          <div className="border-t border-indigo-700 pt-3">
            <h5 className="text-xs font-semibold mb-2 text-purple-200">
              🚀 Advanced Lab:
            </h5>
            <ol className="text-[10px] space-y-1 list-decimal list-inside opacity-90">
              <li>Test "Keylogger Demo" - ketik sesuatu</li>
              <li>Coba "Form Hijack" - submit form komentar</li>
              <li>Analisa impact dari setiap payload</li>
            </ol>
          </div>
        </div>

        <div className="mt-4 p-2 bg-black/30 rounded text-[9px] flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-yellow-400"></i>
          <span>Hanya untuk keperluan edukasi dan ethical hacking!</span>
        </div>
      </div>

      {/* Reset Button */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <h4 className="font-bold text-sm mb-2 flex items-center gap-2 text-gray-900">
          <i className="fas fa-undo text-green-500"></i>
          Quick Actions
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => window.location.reload()}
            className="w-full text-xs bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
          >
            <i className="fas fa-refresh"></i>
            Reset Page (Undo Defacement)
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="w-full text-xs bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded transition-colors flex items-center justify-center gap-2"
          >
            <i className="fas fa-trash"></i>
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;
