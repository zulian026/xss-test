import React, { useState } from "react";
import { SecurityMode } from "../types";
import XSSExecutor from "./XSSExecutor";
import { xssExecutor, SecurityChecker, DEMO_PAYLOADS } from "../utils/xssUtils";

interface SearchBarProps {
  securityMode: SecurityMode;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ securityMode, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [executedPayload, setExecutedPayload] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Add to search history
    setSearchHistory((prev) => [searchQuery, ...prev.slice(0, 4)]);

    // Execute XSS if in vulnerable mode
    if (securityMode === SecurityMode.VULNERABLE) {
      setExecutedPayload(searchQuery);
    }

    // Call parent search function
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Reset executed payload when input changes
    setExecutedPayload("");
  };

  const quickPayloads = [
    {
      label: "Basic Alert",
      payload: DEMO_PAYLOADS.BASIC.ALERT,
      icon: "fas fa-exclamation-circle",
    },
    {
      label: "Background Change",
      payload: DEMO_PAYLOADS.DEFACEMENT.BACKGROUND,
      icon: "fas fa-palette",
    },
    {
      label: "Title Hijack",
      payload: DEMO_PAYLOADS.DEFACEMENT.TITLE,
      icon: "fas fa-edit",
    },
    {
      label: "Cookie Stealer",
      payload: DEMO_PAYLOADS.BASIC.COOKIE,
      icon: "fas fa-cookie-bite",
    },
  ];

  const insertPayload = (payload: string) => {
    setSearchQuery(payload);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-search text-blue-500"></i>
          Search Articles
        </h2>

        <div
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            securityMode === SecurityMode.VULNERABLE
              ? "bg-red-100 text-red-700 animate-pulse"
              : "bg-green-100 text-green-700"
          }`}
        >
          <i
            className={`fas ${securityMode === SecurityMode.VULNERABLE ? "fa-unlock" : "fa-lock"} mr-1`}
          ></i>
          {securityMode === SecurityMode.VULNERABLE ? "VULNERABLE" : "SECURE"}
        </div>
      </div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-3">
          <div className="flex-grow relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder={
                securityMode === SecurityMode.VULNERABLE
                  ? "Search articles (or try XSS payload)..."
                  : "Search articles (XSS protected)..."
              }
              className={`w-full px-4 py-3 rounded-lg border-2 focus:outline-none focus:ring-2 transition-all ${
                securityMode === SecurityMode.VULNERABLE
                  ? "border-red-200 focus:border-red-500 focus:ring-red-500/20 bg-red-50"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 bg-white"
              }`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>

          <button
            type="submit"
            className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
              securityMode === SecurityMode.VULNERABLE
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {securityMode === SecurityMode.VULNERABLE ? (
              <>
                <i className="fas fa-bug"></i>
                Execute
              </>
            ) : (
              <>
                <i className="fas fa-search"></i>
                Search
              </>
            )}
          </button>
        </div>
      </form>
      {/* XSS Execution Result */}
      {executedPayload && securityMode === SecurityMode.VULNERABLE && (
        <div className="mb-4">
          <XSSExecutor
            payload={executedPayload}
            securityMode={securityMode}
            onExecuted={() =>
              console.log("XSS Executed from search:", executedPayload)
            }
          />
        </div>
      )}
      {/* Instant Demo Section */}
      <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fas fa-zap text-purple-500"></i>
          Instant XSS Demo
        </h3>
        <p className="text-xs text-gray-600 mb-3">
          Klik tombol di bawah untuk melihat efek XSS langsung tanpa mengetik
          payload:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              SecurityChecker.executeIfVulnerable(
                securityMode,
                "alert('🚨 INSTANT XSS DEMO! 🚨\\n\\nWebsite berhasil di-hack!\\nIni menunjukkan betapa berbahayanya XSS!');",
              );
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <i className="fas fa-bolt"></i>
            <span>Alert Test</span>
          </button>

          <button
            onClick={() => {
              if (securityMode === SecurityMode.VULNERABLE) {
                xssExecutor.executeDefacement("background");
              } else {
                alert("🛡️ Secure Mode Active\\n\\nDefacement blocked!");
              }
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <i className="fas fa-palette"></i>
            <span>Deface Test</span>
          </button>

          <button
            onClick={() => {
              if (securityMode === SecurityMode.VULNERABLE) {
                xssExecutor.executeDefacement("title");
              } else {
                alert("🛡️ Secure Mode Active\\n\\nTitle hijacking blocked!");
              }
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <i className="fas fa-edit"></i>
            <span>Title Hack</span>
          </button>

          <button
            onClick={() => {
              SecurityChecker.executeIfVulnerable(
                securityMode,
                "alert('🍪 COOKIE STEALER DEMO! 🍪\\n\\nCookies Found:\\n' + (document.cookie || 'No cookies available') + '\\n\\n⚠️ In real attack, this would be sent to attacker!');",
              );
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <i className="fas fa-cookie-bite"></i>
            <span>Cookie Theft</span>
          </button>
        </div>

        <div className="mt-3 p-2 bg-white rounded border border-purple-200 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <i className="fas fa-info-circle text-blue-500"></i>
            <span className="font-semibold text-gray-700">
              Cara Penggunaan:
            </span>
          </div>
          <ol className="text-gray-600 list-decimal list-inside space-y-1">
            <li>
              Pastikan mode{" "}
              <strong>
                {securityMode === SecurityMode.VULNERABLE
                  ? "VULNERABLE sudah aktif"
                  : "diubah ke VULNERABLE"}
              </strong>
            </li>
            <li>Klik salah satu tombol demo di atas</li>
            <li>Lihat efek XSS langsung terjadi!</li>
            <li>Refresh halaman untuk mengembalikan tampilan normal</li>
          </ol>
        </div>
      </div>
      ){/* Spectacular Demo Showcase */}
      <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fas fa-fire text-red-500"></i>
          Spectacular XSS Showcase
        </h3>
        <p className="text-xs text-gray-600 mb-3">
          Demo efek visual yang menakjubkan untuk memahami dampak XSS:
        </p>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <button
            onClick={() => {
              if (securityMode === SecurityMode.VULNERABLE) {
                xssExecutor.executeDefacement("shake");
              } else {
                alert("🛡️ Secure Mode Active\n\nShake effect blocked!");
              }
            }}
            className="text-xs bg-orange-100 hover:bg-orange-200 text-orange-700 py-2 px-2 rounded-lg transition-all flex items-center gap-1 justify-center"
          >
            <i className="fas fa-earthquake"></i>
            <span>Shake Page</span>
          </button>

          <button
            onClick={() => {
              if (securityMode === SecurityMode.VULNERABLE) {
                xssExecutor.executeDefacement("matrix");
              } else {
                alert("🛡️ Secure Mode Active\n\nMatrix effect blocked!");
              }
            }}
            className="text-xs bg-green-100 hover:bg-green-200 text-green-700 py-2 px-2 rounded-lg transition-all flex items-center gap-1 justify-center"
          >
            <i className="fas fa-code"></i>
            <span>Matrix Mode</span>
          </button>

          <button
            onClick={() => {
              if (securityMode === SecurityMode.VULNERABLE) {
                xssExecutor.executeDefacement("fullpage");
              } else {
                alert("🛡️ Secure Mode Active\n\nFull defacement blocked!");
              }
            }}
            className="text-xs bg-red-100 hover:bg-red-200 text-red-700 py-2 px-2 rounded-lg transition-all flex items-center gap-1 justify-center"
          >
            <i className="fas fa-skull"></i>
            <span>Full Deface</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              SecurityChecker.executeIfVulnerable(
                securityMode,
                DEMO_PAYLOADS.ADVANCED.KEYLOGGER,
              );
            }}
            className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-3 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <i className="fas fa-keyboard"></i>
            <span>Keylogger Demo</span>
          </button>

          <button
            onClick={() => {
              SecurityChecker.executeIfVulnerable(
                securityMode,
                DEMO_PAYLOADS.ADVANCED.FORM_HIJACK,
              );
            }}
            className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-3 rounded-lg transition-all flex items-center gap-2 justify-center"
          >
            <i className="fas fa-hijacking"></i>
            <span>Form Hijack</span>
          </button>
        </div>

        <div className="mt-3 p-2 bg-white rounded border border-red-200 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <i className="fas fa-exclamation-triangle text-red-500"></i>
            <span className="font-semibold text-red-700">
              Warning: Spectacular Effects!
            </span>
          </div>
          <p className="text-gray-600">
            These demos will dramatically change the page appearance.
            <strong>Refresh the page</strong> to restore normal view after
            testing.
          </p>
        </div>
      </div>
      {/* Quick Payload Buttons */}
      {securityMode === SecurityMode.VULNERABLE && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-bolt text-yellow-500"></i>
            Quick XSS Payloads
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {quickPayloads.map((item, index) => (
              <button
                key={index}
                onClick={() => insertPayload(item.payload)}
                className="text-xs bg-red-100 hover:bg-red-200 text-red-700 py-2 px-3 rounded-lg transition-all flex items-center gap-2 justify-center"
                title={item.payload}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Search History */}
      {searchHistory.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-history text-gray-500"></i>
            Recent Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(query)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded-full transition-all flex items-center gap-1"
              >
                <i className="fas fa-clock text-gray-400"></i>
                <span className="truncate max-w-32">
                  {query.length > 30 ? `${query.substring(0, 30)}...` : query}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Warning for Vulnerable Mode */}
      {securityMode === SecurityMode.VULNERABLE && (
        <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex items-start">
            <i className="fas fa-exclamation-triangle text-red-500 mt-0.5 mr-2"></i>
            <div>
              <h4 className="text-sm font-bold text-red-800">
                Vulnerable Mode Active
              </h4>
              <p className="text-xs text-red-700 mt-1">
                Search input is not sanitized. XSS payloads will be executed for
                educational demonstration. In real applications, always validate
                and sanitize user input!
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Safe Mode Info */}
      {securityMode === SecurityMode.SECURE && (
        <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded">
          <div className="flex items-start">
            <i className="fas fa-shield-alt text-green-500 mt-0.5 mr-2"></i>
            <div>
              <h4 className="text-sm font-bold text-green-800">
                Secure Mode Active
              </h4>
              <p className="text-xs text-green-700 mt-1">
                Search input is properly sanitized and validated. XSS attacks
                are prevented.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
