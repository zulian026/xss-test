
import React, { useState } from 'react';
import { Comment, SecurityMode } from '../types';

interface CommentSectionProps {
  postId: number;
  securityMode: SecurityMode;
  comments: Comment[];
  onAddComment: (author: string, text: string) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  securityMode, 
  comments, 
  onAddComment 
}) => {
  const [author, setAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !commentText) return;
    onAddComment(author, commentText);
    setAuthor('');
    setCommentText('');
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

      <form onSubmit={handleSubmit} className="mb-12 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Anda</label>
          <input 
            type="text" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            placeholder="Ketik nama anda..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Komentar</label>
          <textarea 
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            placeholder="Tulis pendapat anda (Atau coba payload XSS di sini)..."
          ></textarea>
        </div>
        <button 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
        >
          Kirim Komentar
          <i className="fas fa-paper-plane text-xs"></i>
        </button>
      </form>

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-400 italic bg-white rounded-xl border border-dashed border-gray-200">
            Belum ada komentar. Jadilah yang pertama berdiskusi!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all hover:border-indigo-100">
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
                  A. Mode Rentan: Meniru 'element.innerHTML' yang tidak disanitasi.
                  B. Mode Aman: Meniru 'element.textContent' atau standar React rendering.
                */}
                {securityMode === SecurityMode.VULNERABLE ? (
                  <div 
                    className="text-gray-700 text-sm leading-relaxed p-2 bg-red-50 rounded border border-red-100"
                    dangerouslySetInnerHTML={{ __html: comment.text }} 
                  />
                ) : (
                  <div className="text-gray-700 text-sm leading-relaxed p-2 bg-green-50 rounded border border-green-100">
                    {comment.text}
                  </div>
                )}
                
                {securityMode === SecurityMode.VULNERABLE && (
                  <div className="mt-2 text-[10px] uppercase font-bold text-red-400 tracking-tighter">
                    <i className="fas fa-exclamation-triangle mr-1"></i> Vulnerable Rendering (innerHTML)
                  </div>
                )}
                {securityMode === SecurityMode.SECURE && (
                  <div className="mt-2 text-[10px] uppercase font-bold text-green-400 tracking-tighter">
                    <i className="fas fa-check-circle mr-1"></i> Safe Rendering (Escaped Text)
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
