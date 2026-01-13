import React, { useState, useEffect } from "react";
import { Comment, SecurityMode } from "../types";
import XSSExecutor from "./XSSExecutor";

interface CommentSectionProps {
  postId: number;
  securityMode: SecurityMode;
  comments: Comment[];
  onAddComment: (author: string, text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  securityMode,
  comments,
  onAddComment,
}) => {
  const [author, setAuthor] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showDefacementWarning, setShowDefacementWarning] = useState(false);

  // Detect potential defacement payloads
  useEffect(() => {
    const defacementKeywords = [
      "document.body",
      "document.title",
      "innerHTML",
      "style.background",
      "matrix",
    ];
    const hasDefacementPayload = defacementKeywords.some((keyword) =>
      commentText.toLowerCase().includes(keyword.toLowerCase()),
    );
    setShowDefacementWarning(
      hasDefacementPayload && securityMode === SecurityMode.VULNERABLE,
    );
  }, [commentText, securityMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !commentText) return;
    onAddComment(author, commentText);
    setAuthor("");
    setCommentText("");
  };

  /**
   * CATATAN EDUKASI:
   * Dalam React, secara default {} akan meng-escape konten (Mode Aman).
   * Untuk mensimulasikan kerentanan XSS (innerHTML di vanilla JS),
   * kita menggunakan properti 'dangerouslySetInnerHTML'.
   */

  return (
    <section id="comments">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <i className="far fa-comments text-indigo-500"></i>
        Diskusi ({comments.length})
      </h3>

      {/* Defacement Warning */}
      {showDefacementWarning && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <i className="fas fa-skull text-red-500 text-lg"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-red-800">
                ⚠️ DEFACEMENT PAYLOAD DETECTED
              </h3>
              <p className="text-xs text-red-700 mt-1">
                Payload ini akan mengubah tampilan halaman secara drastis
                (defacement). Dalam mode vulnerable, halaman akan ter-deface
                setelah submit.
              </p>
              <div className="mt-2 flex gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                  <i className="fas fa-eye mr-1"></i>
                  Visual Impact
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
                  <i className="fas fa-refresh mr-1"></i>
                  Refresh to Reset
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm"
      >
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nama Anda
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="Ketik nama anda..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Komentar
          </label>
          <textarea
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border transition-all resize-none ${
              showDefacementWarning
                ? "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 bg-red-50"
                : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            }`}
            placeholder={
              securityMode === SecurityMode.VULNERABLE
                ? "Tulis pendapat anda (Atau coba payload XSS/Defacement di sini)..."
                : "Tulis pendapat anda (Mode aman - XSS akan di-escape)..."
            }
          ></textarea>
          {showDefacementWarning && (
            <div className="mt-2 text-xs text-red-600 flex items-center gap-1">
              <i className="fas fa-exclamation-triangle"></i>
              Defacement payload terdeteksi - akan mengubah tampilan halaman!
            </div>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2 ${
              showDefacementWarning
                ? "bg-red-600 hover:bg-red-700 text-white animate-pulse"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            {showDefacementWarning ? (
              <>
                <i className="fas fa-skull"></i>
                Execute Defacement
              </>
            ) : (
              <>
                Kirim Komentar
                <i className="fas fa-paper-plane text-xs"></i>
              </>
            )}
          </button>

          <div className="text-xs text-gray-500">
            Mode:{" "}
            <span
              className={`font-bold ${
                securityMode === SecurityMode.VULNERABLE
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {securityMode === SecurityMode.VULNERABLE
                ? "🔓 VULNERABLE"
                : "🔒 SECURE"}
            </span>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-400 italic bg-white rounded-xl border border-dashed border-gray-200">
            Belum ada komentar. Jadilah yang pertama berdiskusi!
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:border-indigo-100"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-50 flex-shrink-0 flex items-center justify-center text-indigo-400">
                <i className="fas fa-user"></i>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-gray-900">{comment.author}</h4>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>

                {/*
                  IMPLEMENTASI KEAMANAN (CRITICAL):
                  A. Mode Rentan: Execute JavaScript untuk demonstrasi XSS.
                  B. Mode Aman: Display sebagai text biasa (React auto-escape).
                */}
                <div className="mb-2">
                  <XSSExecutor
                    payload={comment.text}
                    securityMode={securityMode}
                    onExecuted={() =>
                      console.log(
                        `XSS executed from comment by ${comment.author}`,
                      )
                    }
                  />
                </div>

                {securityMode === SecurityMode.VULNERABLE && (
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-[10px] uppercase font-bold text-red-400 tracking-tighter">
                      <i className="fas fa-exclamation-triangle mr-1"></i>{" "}
                      Vulnerable Rendering (innerHTML)
                    </div>
                    {comment.text.toLowerCase().includes("document.body") && (
                      <span className="text-[8px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold">
                        DEFACEMENT
                      </span>
                    )}
                  </div>
                )}
                {securityMode === SecurityMode.SECURE && (
                  <div className="mt-2 text-[10px] uppercase font-bold text-green-400 tracking-tighter">
                    <i className="fas fa-check-circle mr-1"></i> Safe Rendering
                    (Escaped Text)
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CommentSection;
