import React, { useEffect, useRef } from "react";
import { SecurityMode } from "../types";

interface XSSExecutorProps {
  payload: string;
  securityMode: SecurityMode;
  onExecuted?: () => void;
}

const XSSExecutor: React.FC<XSSExecutorProps> = ({
  payload,
  securityMode,
  onExecuted,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const executedRef = useRef<boolean>(false);

  useEffect(() => {
    if (
      securityMode === SecurityMode.VULNERABLE &&
      payload &&
      !executedRef.current
    ) {
      executePayload(payload);
      executedRef.current = true;
      onExecuted?.();
    }
  }, [payload, securityMode]);

  const executePayload = (payloadText: string) => {
    try {
      console.log("Executing XSS Payload:", payloadText);

      // Check if payload contains script tags
      const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi;
      const scriptMatch = scriptRegex.exec(payloadText);

      if (scriptMatch && scriptMatch[1]) {
        // Execute script content
        const scriptContent = scriptMatch[1];
        const executeScript = new Function(scriptContent);
        executeScript();
      } else {
        // For payloads that are just JavaScript code (without script tags)
        if (
          payloadText.includes("alert(") ||
          payloadText.includes("document.") ||
          payloadText.includes("window.") ||
          payloadText.includes("console.")
        ) {
          // Direct JavaScript execution
          const executeScript = new Function(payloadText);
          executeScript();
        } else {
          // Handle HTML-based XSS (img onerror, svg onload, etc.)
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = payloadText;

          // Execute any inline event handlers
          const elementsWithEvents = tempDiv.querySelectorAll(
            "[onerror], [onload], [onclick], [onmouseover]",
          );
          elementsWithEvents.forEach((element) => {
            ["onerror", "onload", "onclick", "onmouseover"].forEach(
              (eventType) => {
                const handler = element.getAttribute(eventType);
                if (handler) {
                  try {
                    const executeHandler = new Function(handler);
                    executeHandler();
                  } catch (e) {
                    console.error(`Error executing ${eventType}:`, e);
                  }
                }
              },
            );
          });
        }
      }
    } catch (error) {
      console.error("XSS Execution Error:", error);

      // Show error alert for debugging
      if (securityMode === SecurityMode.VULNERABLE) {
        alert(`🚨 XSS Execution Error: ${error.message}`);
      }
    }
  };

  // Reset execution flag when payload changes
  useEffect(() => {
    executedRef.current = false;
  }, [payload]);

  if (securityMode === SecurityMode.SECURE) {
    return (
      <div className="text-xs bg-green-100 text-green-700 p-2 rounded border">
        <i className="fas fa-shield-alt mr-1"></i>
        <strong>Secure Mode:</strong> XSS payload blocked and displayed safely
        <div className="mt-1 font-mono text-green-600 bg-white p-1 rounded text-xs break-all">
          {payload}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="text-xs bg-red-100 text-red-700 p-2 rounded border"
    >
      <i className="fas fa-exclamation-triangle mr-1"></i>
      <strong>Vulnerable Mode:</strong> XSS payload executed
      <div className="mt-1 font-mono text-red-600 bg-white p-1 rounded text-xs break-all">
        {payload}
      </div>
    </div>
  );
};

export default XSSExecutor;
