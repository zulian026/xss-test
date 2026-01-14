import React, { useState } from "react";
import { Comment, SecurityMode } from "../types";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !commentText) return;
    onAddComment(author, commentText);
    setAuthor("");
    setCommentText("");
  };

  return (
    <section id="comments">
      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <i className="far fa-comments text-indigo-500"></i>
        Diskusi ({comments.length})
      </h3>

      <div className="mb-8 text-sm text-gray-500 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="mb-1">
          <strong>Security Mode:</strong> {securityMode === SecurityMode.VULNERABLE ? <span className="text-red-600 font-bold">VULNERABLE</span> : <span className="text-green-600 font-bold">SAFE</span>}
        </p>
        <p>
          {securityMode === SecurityMode.VULNERABLE
            ? "Server saves raw input. Client renders HTML directly. (Stored XSS possible)."
            : "Server sanitizes input. (XSS prevented)."}
        </p>
      </div>

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
            placeholder="John Doe"
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
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            placeholder="Write a comment..."
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            Kirim Komentar
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-400 italic bg-white rounded-xl border border-dashed border-gray-200">
            Belum ada komentar. Jadilah yang pertama berdiskusi!
          </div>
        ) : (
          comments.map((comment, index) => (
            <div
              key={index} // prefer ID if available, but backend logic sends ID
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
                  REALISTIC XSS IMPLEMENTATION:
                  
                  [VULNERABLE MODE]
                  - We use dangerouslySetInnerHTML. 
                  - XSS payloads (<script>, <img onerror>, styles) will execute.
                  
                  [SAFE MODE]
                  - We use standard React children rendering: <div>{text}</div>.
                  - React AUTOMATICALLY escapes content (Output Encoding).
                  - This is the #1 defense against XSS on the client side.
                */}
                {securityMode === SecurityMode.VULNERABLE ? (
                  <div
                    className="text-gray-700 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  />
                ) : (
                  <div className="text-gray-700 prose prose-sm max-w-none">
                    {comment.text}
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
