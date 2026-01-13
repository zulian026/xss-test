import React, { useState, useEffect } from 'react';
import { SecurityMode } from '../types';

interface DefacementMonitorProps {
  securityMode: SecurityMode;
  comments: any[];
}

interface AttackStat {
  type: string;
  count: number;
  lastOccurred: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const DefacementMonitor: React.FC<DefacementMonitorProps> = ({
  securityMode,
  comments
}) => {
  const [attackStats, setAttackStats] = useState<AttackStat[]>([]);
  const [isDefaced, setIsDefaced] = useState(false);
  const [totalAttacks, setTotalAttacks] = useState(0);

  useEffect(() => {
    analyzeComments();
    checkDefacementStatus();
  }, [comments]);

  const analyzeComments = () => {
    const stats: Record<string, AttackStat> = {};
    let total = 0;

    comments.forEach(comment => {
      const text = comment.text.toLowerCase();

      // Basic XSS Detection
      if (text.includes('<script>')) {
        updateStat(stats, 'Script Injection', 'high');
        total++;
      }

      // Defacement Detection
      if (text.includes('document.body') || text.includes('document.title')) {
        updateStat(stats, 'Defacement', 'critical');
        total++;
      }

      // Image XSS
      if (text.includes('<img') && text.includes('onerror')) {
        updateStat(stats, 'Image XSS', 'medium');
        total++;
      }

      // SVG XSS
      if (text.includes('<svg') && text.includes('onload')) {
        updateStat(stats, 'SVG Injection', 'medium');
        total++;
      }

      // Cookie Stealing
      if (text.includes('document.cookie')) {
        updateStat(stats, 'Cookie Theft', 'high');
        total++;
      }

      // Keylogger
      if (text.includes('keydown') || text.includes('keystroke')) {
        updateStat(stats, 'Keylogger', 'critical');
        total++;
      }

      // Form Hijacking
      if (text.includes('form') && text.includes('submit')) {
        updateStat(stats, 'Form Hijack', 'high');
        total++;
      }

      // Social Engineering
      if (text.includes('login') || text.includes('password')) {
        updateStat(stats, 'Phishing', 'critical');
        total++;
      }
    });

    setAttackStats(Object.values(stats));
    setTotalAttacks(total);
  };

  const updateStat = (stats: Record<string, AttackStat>, type: string, severity: AttackStat['severity']) => {
    if (stats[type]) {
      stats[type].count++;
      stats[type].lastOccurred = new Date().toLocaleTimeString('id-ID');
    } else {
      stats[type] = {
        type,
        count: 1,
        lastOccurred: new Date().toLocaleTimeString('id-ID'),
        severity
      };
    }
  };

  const checkDefacementStatus = () => {
    // Check if page has been defaced by looking at document changes
    const hasDefacementPayload = comments.some(comment => {
      const text = comment.text.toLowerCase();
      return text.includes('document.body') ||
             text.includes('document.title') ||
             text.includes('matrix') ||
             text.includes('innerHTML');
    });

    setIsDefaced(hasDefacementPayload && securityMode === SecurityMode.VULNERABLE);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return 'fas fa-info-circle';
      case 'medium': return 'fas fa-exclamation-circle';
      case 'high': return 'fas fa-exclamation-triangle';
      case 'critical': return 'fas fa-skull';
      default: return 'fas fa-question-circle';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-shield-alt text-indigo-500"></i>
          Security Monitor
        </h3>

        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          isDefaced ? 'bg-red-100 text-red-700 animate-pulse' :
          totalAttacks > 0 ? 'bg-orange-100 text-orange-700' :
          'bg-green-100 text-green-700'
        }`}>
          {isDefaced ? '🚨 DEFACED' : totalAttacks > 0 ? '⚠️ UNDER ATTACK' : '✅ SECURE'}
        </div>
      </div>

      {/* Attack Statistics */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <i className="fas fa-chart-bar text-blue-500"></i>
          Attack Statistics
        </h4>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-indigo-600">{totalAttacks}</div>
            <div className="text-xs text-gray-600">Total Attempts</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-600">{attackStats.length}</div>
            <div className="text-xs text-gray-600">Attack Types</div>
          </div>
        </div>

        {attackStats.length > 0 ? (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {attackStats.sort((a, b) => b.count - a.count).map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <i className={`${getSeverityIcon(stat.severity)} ${getSeverityColor(stat.severity).split(' ')[0]}`}></i>
                  <span className="text-sm font-medium text-gray-700">{stat.type}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(stat.severity)}`}>
                    {stat.severity.toUpperCase()}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{stat.count}x</div>
                  <div className="text-xs text-gray-500">{stat.lastOccurred}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 text-gray-400 italic">
            No attacks detected
          </div>
        )}
      </div>

      {/* Defacement Alert */}
      {isDefaced && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-pulse">
          <div className="flex items-start">
            <i className="fas fa-skull text-red-500 text-xl mr-3"></i>
            <div>
              <h4 className="text-sm font-bold text-red-800">DEFACEMENT DETECTED</h4>
              <p className="text-xs text-red-700 mt-1">
                The page appearance has been compromised. Visual elements may have been altered.
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => window.location.reload()}
                  className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                >
                  <i className="fas fa-refresh mr-1"></i>
                  Restore Page
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <i className="fas fa-lightbulb text-yellow-500"></i>
          Security Recommendations
        </h4>

        <ul className="text-xs space-y-1 text-gray-600">
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Always sanitize user input before rendering</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Use Content Security Policy (CSP) headers</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Implement proper input validation</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="fas fa-check text-green-500 mt-0.5"></i>
            <span>Use secure coding frameworks</span>
          </li>
        </ul>

        <div className="mt-3 p-2 bg-white rounded border border-blue-200">
          <p className="text-xs text-blue-800">
            <i className="fas fa-info-circle mr-1"></i>
            <strong>Current Mode:</strong> {securityMode === SecurityMode.VULNERABLE ?
              'Vulnerable (demonstrating risks)' :
              'Secure (input properly escaped)'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default DefacementMonitor;
