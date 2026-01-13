import React, { useState, useEffect } from 'react';
import { SecurityMode } from '../types';

interface DemoControllerProps {
  securityMode: SecurityMode;
  onModeChange: (mode: SecurityMode) => void;
  onAddComment: (author: string, text: string) => void;
  currentPostId: number | null;
}

const DemoController: React.FC<DemoControllerProps> = ({
  securityMode,
  onModeChange,
  onAddComment,
  currentPostId
}) => {
  const [isAutoDemo, setIsAutoDemo] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const demoScenarios = [
    {
      title: "Basic XSS Demo",
      description: "Demonstrasi serangan XSS dasar dengan alert",
      payload: "<script>alert('🚨 XSS Attack Detected!')</script>",
      author: "Hacker",
      delay: 2000,
      mode: SecurityMode.VULNERABLE
    },
    {
      title: "Defacement - Background",
      description: "Mengubah tampilan background halaman",
      payload: "<script>document.body.style.background='linear-gradient(45deg, #ff0000, #000000)'; document.body.style.color='#00ff00';</script>",
      author: "Anonymous",
      delay: 3000,
      mode: SecurityMode.VULNERABLE
    },
    {
      title: "Matrix Effect",
      description: "Efek Matrix dengan kode biner hijau",
      payload: '<script>document.body.style.background=\'black\'; document.body.innerHTML=\'<div id="matrix" style="position:fixed;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:9999;"></div><script>function matrix(){var canvas=document.createElement("canvas");canvas.width=window.innerWidth;canvas.height=window.innerHeight;canvas.style.position="absolute";canvas.style.top="0";canvas.style.left="0";document.getElementById("matrix").appendChild(canvas);var ctx=canvas.getContext("2d");var letters="01";letters=letters.split("");var fontSize=10;var columns=canvas.width/fontSize;var drops=[];for(var i=0;i<columns;i++)drops[i]=1;function draw(){ctx.fillStyle="rgba(0,0,0,0.05)";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#00ff00";ctx.font=fontSize+"px monospace";for(var i=0;i<drops.length;i++){var text=letters[Math.floor(Math.random()*letters.length)];ctx.fillText(text,i*fontSize,drops[i]*fontSize);drops[i]++;if(drops[i]*fontSize>canvas.height&&Math.random()>0.95)drops[i]=0;}}setInterval(draw,35);}matrix();</script>\';</script>',
      author: "Neo",
      delay: 5000,
      mode: SecurityMode.VULNERABLE
    },
    {
      title: "Security Mode Demo",
      description: "Menunjukkan bagaimana mode aman mencegah XSS",
      payload: "<script>alert('This should not execute!')</script>",
      author: "SecurityTester",
      delay: 2000,
      mode: SecurityMode.SECURE
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoDemo && isPlaying) {
      interval = setInterval(() => {
        setDemoProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            executeCurrentStep();
            return 0;
          }
          return newProgress;
        });
      }, demoScenarios[demoStep].delay / 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoDemo, isPlaying, demoStep]);

  const executeCurrentStep = () => {
    if (demoStep >= demoScenarios.length || !currentPostId) return;

    const scenario = demoScenarios[demoStep];

    // Change mode first
    onModeChange(scenario.mode);

    // Wait a bit then add comment
    setTimeout(() => {
      onAddComment(scenario.author, scenario.payload);

      // Move to next step or stop
      if (demoStep < demoScenarios.length - 1) {
        setDemoStep(prev => prev + 1);
        setDemoProgress(0);
      } else {
        // Demo completed
        setIsAutoDemo(false);
        setIsPlaying(false);
        setDemoStep(0);
        setDemoProgress(0);
      }
    }, 500);
  };

  const startAutoDemo = () => {
    if (!currentPostId) {
      alert('⚠️ Pilih artikel terlebih dahulu untuk memulai demo!');
      return;
    }

    setIsAutoDemo(true);
    setIsPlaying(true);
    setDemoStep(0);
    setDemoProgress(0);
  };

  const stopAutoDemo = () => {
    setIsAutoDemo(false);
    setIsPlaying(false);
    setDemoProgress(0);
  };

  const skipToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < demoScenarios.length) {
      setDemoStep(stepIndex);
      setDemoProgress(0);
    }
  };

  const executeManualStep = (stepIndex: number) => {
    if (!currentPostId) {
      alert('⚠️ Pilih artikel terlebih dahulu!');
      return;
    }

    const scenario = demoScenarios[stepIndex];
    onModeChange(scenario.mode);

    setTimeout(() => {
      onAddComment(scenario.author, scenario.payload);
    }, 500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <i className="fas fa-play-circle text-purple-500"></i>
          Demo Controller
        </h3>

        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`}></div>
          <span className="text-xs text-gray-500">
            {isPlaying ? 'Recording' : 'Stopped'}
          </span>
        </div>
      </div>

      {/* Auto Demo Controls */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2">
            <i className="fas fa-magic text-purple-500"></i>
            Automated Demo
          </h4>

          <div className="flex gap-2">
            {!isAutoDemo ? (
              <button
                onClick={startAutoDemo}
                disabled={!currentPostId}
                className={`text-xs px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  currentPostId
                    ? 'bg-purple-500 hover:bg-purple-600 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <i className="fas fa-play"></i>
                Start Demo
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-xs px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-all"
                >
                  <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                </button>
                <button
                  onClick={stopAutoDemo}
                  className="text-xs px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
                >
                  <i className="fas fa-stop"></i>
                </button>
              </>
            )}
          </div>
        </div>

        {isAutoDemo && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Step {demoStep + 1}: {demoScenarios[demoStep]?.title}
              </span>
              <span className="text-xs text-gray-500">{demoProgress}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-200"
                style={{ width: `${demoProgress}%` }}
              ></div>
            </div>

            <p className="text-xs text-gray-600 italic">
              {demoScenarios[demoStep]?.description}
            </p>
          </div>
        )}

        {!currentPostId && (
          <div className="mt-3 p-2 bg-amber-100 border border-amber-300 rounded text-xs text-amber-800 flex items-center gap-2">
            <i className="fas fa-exclamation-triangle"></i>
            Pilih artikel terlebih dahulu untuk menjalankan demo
          </div>
        )}
      </div>

      {/* Manual Demo Steps */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <i className="fas fa-hand-pointer text-blue-500"></i>
          Manual Execution
        </h4>

        <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto">
          {demoScenarios.map((scenario, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border transition-all hover:border-blue-300 hover:shadow-sm ${
                isAutoDemo && demoStep === index
                  ? 'border-purple-300 bg-purple-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="font-semibold text-sm text-gray-800">
                      {index + 1}. {scenario.title}
                    </h5>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      scenario.mode === SecurityMode.VULNERABLE
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {scenario.mode === SecurityMode.VULNERABLE ? 'Vulnerable' : 'Secure'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{scenario.description}</p>
                  <code className="text-xs bg-white p-1 rounded border font-mono text-gray-700 block overflow-x-auto">
                    {scenario.payload.length > 60
                      ? `${scenario.payload.substring(0, 60)}...`
                      : scenario.payload
                    }
                  </code>
                </div>

                <div className="flex gap-1 ml-3">
                  {isAutoDemo && (
                    <button
                      onClick={() => skipToStep(index)}
                      className="text-xs px-2 py-1 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded transition-all"
                      title="Skip to this step"
                    >
                      <i className="fas fa-forward"></i>
                    </button>
                  )}
                  <button
                    onClick={() => executeManualStep(index)}
                    disabled={!currentPostId}
                    className={`text-xs px-2 py-1 rounded transition-all ${
                      currentPostId
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    title="Execute this step"
                  >
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="font-semibold text-gray-800 mb-3 text-sm flex items-center gap-2">
          <i className="fas fa-bolt text-yellow-500"></i>
          Quick Actions
        </h4>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => window.location.reload()}
            className="text-xs bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-undo"></i>
            Reset Page
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="text-xs bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-trash"></i>
            Clear Data
          </button>

          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('✅ URL copied to clipboard!');
            }}
            className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-share"></i>
            Share Demo
          </button>

          <button
            onClick={() => {
              const payload = demoScenarios[0].payload;
              navigator.clipboard.writeText(payload);
              alert('✅ Sample payload copied!');
            }}
            className="text-xs bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded transition-all flex items-center justify-center gap-2"
          >
            <i className="fas fa-copy"></i>
            Copy Payload
          </button>
        </div>
      </div>

      {/* Status Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-4">
            <span>
              <i className="fas fa-eye mr-1"></i>
              Mode: <strong>{securityMode}</strong>
            </span>
            <span>
              <i className="fas fa-file mr-1"></i>
              Article: {currentPostId ? `#${currentPostId}` : 'None'}
            </span>
          </div>
          <div className="text-right">
            <span>
              <i className="fas fa-clock mr-1"></i>
              {new Date().toLocaleTimeString('id-ID')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoController;
