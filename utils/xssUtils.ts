// XSS Utilities for Educational Demo
// WARNING: This is for educational purposes only!

export interface XSSExecutionResult {
  success: boolean;
  error?: string;
  executedAt: Date;
  payload: string;
}

export class XSSExecutor {
  private static instance: XSSExecutor;
  private executionHistory: XSSExecutionResult[] = [];

  private constructor() {}

  public static getInstance(): XSSExecutor {
    if (!XSSExecutor.instance) {
      XSSExecutor.instance = new XSSExecutor();
    }
    return XSSExecutor.instance;
  }

  /**
   * Execute XSS payload safely for educational demonstration
   * @param payload JavaScript code to execute
   * @returns Execution result
   */
  public executePayload(payload: string): XSSExecutionResult {
    const result: XSSExecutionResult = {
      success: false,
      executedAt: new Date(),
      payload: payload
    };

    try {
      // Log execution for monitoring
      console.log(`[XSS Demo] Executing payload at ${result.executedAt.toISOString()}`);
      console.log(`[XSS Demo] Payload: ${payload}`);

      // Clean and prepare payload
      const cleanPayload = this.cleanPayload(payload);

      // Execute using Function constructor (safer than eval)
      const executionFunction = new Function(cleanPayload);
      executionFunction();

      result.success = true;
      this.executionHistory.push(result);

      // Log successful execution
      console.log(`[XSS Demo] Payload executed successfully`);

    } catch (error: any) {
      result.error = error.message;
      this.executionHistory.push(result);

      console.error(`[XSS Demo] Execution failed:`, error);

      // Show user-friendly error for demo purposes
      alert(`🚨 XSS Execution Error\n\nPayload: ${payload.substring(0, 50)}...\nError: ${error.message}\n\nThis is normal in a real security environment!`);
    }

    return result;
  }

  /**
   * Clean and prepare payload for execution
   * @param payload Raw payload string
   * @returns Cleaned payload
   */
  private cleanPayload(payload: string): string {
    // Remove script tags if present
    let cleaned = payload.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '$1');

    // Handle HTML entities
    cleaned = cleaned
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'");

    return cleaned.trim();
  }

  /**
   * Execute defacement payload with visual effects
   * @param type Type of defacement
   * @param customPayload Optional custom payload
   */
  public executeDefacement(type: 'background' | 'title' | 'fullpage' | 'shake' | 'matrix', customPayload?: string): void {
    let payload = '';

    switch (type) {
      case 'background':
        payload = `
          document.body.style.background = 'linear-gradient(45deg, #000000, #ff0000, #000000)';
          document.body.style.color = '#00ff00';
          document.body.style.fontFamily = 'Courier New, monospace';
          alert('🎨 DEFACEMENT SUCCESS!\\n\\nBackground has been hijacked!\\nWebsite appearance compromised!');
        `;
        break;

      case 'title':
        payload = `
          document.title = '💀 HACKED BY ETHICAL PENTESTER 💀';
          alert('📝 TITLE HIJACKED!\\n\\nCheck your browser tab title!\\nTitle has been changed to indicate compromise!');
        `;
        break;

      case 'fullpage':
        payload = `
          document.body.innerHTML = \`
            <div style="
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: linear-gradient(45deg, #000000, #ff0000);
              color: #00ff00;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: 'Courier New', monospace;
              z-index: 999999;
              animation: pulse 1s infinite;
            ">
              <div style="font-size: 4rem; margin-bottom: 20px; text-shadow: 0 0 20px #00ff00;">
                💀 WEBSITE DEFACED 💀
              </div>
              <div style="font-size: 1.5rem; margin-bottom: 20px;">
                🔥 XSS Vulnerability Exploited 🔥
              </div>
              <div style="font-size: 1rem; margin-bottom: 30px; text-align: center;">
                This is a demonstration of website defacement<br>
                through Cross-Site Scripting (XSS) attack
              </div>
              <button
                onclick="location.reload()"
                style="
                  background: #ff0000;
                  color: white;
                  padding: 15px 30px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 1.2rem;
                  font-weight: bold;
                ">
                🔄 RESTORE WEBSITE
              </button>
            </div>
            <style>
              @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.7; }
                100% { opacity: 1; }
              }
            </style>
          \`;
        `;
        break;

      case 'shake':
        payload = `
          document.body.style.animation = 'shake 0.5s infinite';
          document.head.insertAdjacentHTML('beforeend', \`
            <style>
              @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-1deg); }
                80% { transform: translate(-1px, -1px) rotate(1deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
                100% { transform: translate(1px, -2px) rotate(-1deg); }
              }
            </style>
          \`);
          alert('🌪️ EARTHQUAKE MODE ACTIVATED!\\n\\nThe entire page is now shaking!\\nRefresh to stop the effect.');
        `;
        break;

      case 'matrix':
        payload = `
          document.body.style.background = 'black';
          document.body.innerHTML = \`
            <div style="
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: black;
              color: #00ff00;
              display: flex;
              align-items: center;
              justify-content: center;
              font-family: 'Courier New', monospace;
              z-index: 999999;
              flex-direction: column;
            ">
              <div style="font-size: 3rem; margin-bottom: 20px; animation: glow 2s infinite;">
                🔮 MATRIX MODE ACTIVATED 🔮
              </div>
              <div style="font-size: 1.2rem; margin-bottom: 20px;">
                Digital Rain Effect Simulation
              </div>
              <div style="font-size: 1rem; color: #00aa00;">
                Wake up, Neo... The Matrix has you...
              </div>
              <button
                onclick="location.reload()"
                style="
                  margin-top: 30px;
                  background: #00ff00;
                  color: black;
                  padding: 10px 20px;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-weight: bold;
                ">
                Exit Matrix
              </button>
            </div>
            <style>
              @keyframes glow {
                0% { text-shadow: 0 0 5px #00ff00; }
                50% { text-shadow: 0 0 20px #00ff00, 0 0 30px #00ff00; }
                100% { text-shadow: 0 0 5px #00ff00; }
              }
            </style>
          \`;
        `;
        break;
    }

    if (customPayload) {
      payload = customPayload;
    }

    this.executePayload(payload);
  }

  /**
   * Get execution history for monitoring
   * @returns Array of execution results
   */
  public getExecutionHistory(): XSSExecutionResult[] {
    return [...this.executionHistory];
  }

  /**
   * Clear execution history
   */
  public clearHistory(): void {
    this.executionHistory = [];
  }

  /**
   * Get execution statistics
   */
  public getStats(): { total: number; successful: number; failed: number } {
    const total = this.executionHistory.length;
    const successful = this.executionHistory.filter(r => r.success).length;
    const failed = total - successful;

    return { total, successful, failed };
  }
}

/**
 * Common XSS payloads for educational purposes
 */
export const DEMO_PAYLOADS = {
  BASIC: {
    ALERT: "alert('🚨 XSS Demo Alert! Website compromised!')",
    CONSOLE: "console.log('XSS executed successfully!'); alert('Check browser console!')",
    COOKIE: "alert('🍪 Cookies: ' + (document.cookie || 'No cookies found'))"
  },

  DEFACEMENT: {
    BACKGROUND: "document.body.style.background='linear-gradient(45deg, #000, #ff0000)'; alert('Background hijacked!')",
    TITLE: "document.title='💀 HACKED 💀'; alert('Title changed!')",
    SHAKE: "document.body.style.animation='shake 0.5s infinite'; alert('Earthquake mode!')"
  },

  ADVANCED: {
    KEYLOGGER: `
      let keyCount = 0;
      document.addEventListener('keydown', function(e) {
        keyCount++;
        console.log('Key pressed:', e.key);
        if(keyCount % 5 === 0) {
          alert('Keylogger active! Captured ' + keyCount + ' keystrokes');
        }
      });
      alert('Keylogger installed! Start typing...');
    `,
    FORM_HIJACK: `
      document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Form hijacked! Data intercepted!');
        });
      });
      alert('All forms are now being monitored!');
    `
  }
};

/**
 * Security mode checker
 */
export const SecurityChecker = {
  isVulnerable: (mode: string): boolean => mode === 'VULNERABLE',

  executeIfVulnerable: (mode: string, payload: string): boolean => {
    if (SecurityChecker.isVulnerable(mode)) {
      XSSExecutor.getInstance().executePayload(payload);
      return true;
    } else {
      alert('🛡️ SECURE MODE ACTIVE\n\nXSS execution blocked!\nPayload would have been: ' + payload.substring(0, 50) + '...');
      return false;
    }
  }
};

// Export singleton instance
export const xssExecutor = XSSExecutor.getInstance();
