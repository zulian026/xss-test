
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
let SECURITY_MODE = process.env.SECURITY_MODE || 'VULNERABLE'; // 'VULNERABLE' or 'SECURE'

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Adjust if Vite runs on a different port
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Database Setup
const dbPath = path.resolve(__dirname, 'xss-demo.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            postId INTEGER,
            author TEXT,
            text TEXT,
            date TEXT
        )`);
    }
});

// Helper for Safe Mode
const escapeHtml = (unsafe) => {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

// Routes

// Get Comments
app.get('/api/comments', (req, res) => {
    const { postId } = req.query;
    if (!postId) {
        return res.status(400).json({ error: 'postId is required' });
    }

    db.all('SELECT * FROM comments WHERE postId = ? ORDER BY id DESC', [postId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Post Comment
app.post('/api/comments', (req, res) => {
    const { postId, author, text } = req.body;

    if (!postId || !author || !text) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    let finalAuthor = author;
    let finalText = text;

    if (SECURITY_MODE === 'SECURE') {
        finalAuthor = escapeHtml(author);
        finalText = escapeHtml(text);
        console.log(`[SAFE MODE] Sanitized input: ${text} -> ${finalText}`);
    } else {
        console.log(`[VULN MODE] Raw input saved: ${text}`);
    }

    const date = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const stmt = db.prepare('INSERT INTO comments (postId, author, text, date) VALUES (?, ?, ?, ?)');
    stmt.run(postId, finalAuthor, finalText, date, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID, postId, author: finalAuthor, text: finalText, date });
    });
    stmt.finalize();
});

// Mock Login
app.post('/api/login', (req, res) => {
    // In a real app, verify credentials.
    // Here we just set a session cookie to simulate an authenticated user.
    res.cookie('session_id', 'secret_session_token_12345', {
        httpOnly: false, // VULNERABLE: Allow JS to read it for the demo
        secure: false,
        sameSite: 'lax'
    });
    res.json({ success: true, message: 'Logged in', user: 'AdminUser' });
});

app.get('/api/user', (req, res) => {
    const sessionId = req.cookies.session_id;
    if (sessionId === 'secret_session_token_12345') {
        res.json({ username: 'AdminUser', role: 'admin' });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

app.post('/api/logout', (req, res) => {
    res.clearCookie('session_id');
    res.json({ success: true });
});

// Attacker Logs Storage (In-Memory for demo)
const attackerLogs = [];

// Attacker Tracking Endpoint (Cookie Stealing Demo)
app.get('/api/track', (req, res) => {
    const stolenData = req.query;
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = {
        id: Date.now(),
        timestamp,
        ...stolenData,
        ip: req.ip
    };

    attackerLogs.unshift(logEntry); // Add to beginning
    console.log('!!! STEAL DETECTED !!!', logEntry);

    // Return a transparent 1x1 pixel gif or just 200 OK
    res.set('Content-Type', 'image/gif');
    res.send(Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64'));
});

// Endpoint for Attacker Dashboard to view stolen data
app.get('/api/attacker/logs', (req, res) => {
    res.json(attackerLogs);
});

// Clear logs
app.post('/api/attacker/clear', (req, res) => {
    attackerLogs.length = 0;
    res.json({ success: true });
});

app.get('/api/status', (req, res) => {
    res.json({ mode: SECURITY_MODE });
});

app.post('/api/mode', (req, res) => {
    const { mode } = req.body;
    // Accept SECURE or VULNERABLE
    if (mode === 'VULNERABLE' || mode === 'SECURE') {
        SECURITY_MODE = mode;
        console.log(`[MODE SWITCH] Security Mode changed to: ${SECURITY_MODE}`);
        res.json({ success: true, mode: SECURITY_MODE });
    } else {
        res.status(400).json({ error: 'Invalid mode' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Security Mode: ${SECURITY_MODE}`);
});
