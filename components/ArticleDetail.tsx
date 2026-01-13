
import React from 'react';
import { Article, Comment, SecurityMode } from '../types';
import CommentSection from './CommentSection';

interface ArticleDetailProps {
  article: Article;
  securityMode: SecurityMode;
  comments: Comment[];
  onAddComment: (author: string, text: string) => void;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ 
  article, 
  securityMode, 
  comments, 
  onAddComment, 
  onBack 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      <div className="p-6 md:p-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6 transition-colors"
        >
          <i className="fas fa-arrow-left"></i> Kembali ke Daftar
        </button>
        
        <header className="mb-8">
          <div className="flex items-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4">
            <span className="bg-indigo-50 px-2 py-1 rounded">{article.category}</span>
            <span>•</span>
            <span className="text-gray-400">{article.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
              {article.author[0]}
            </div>
            <div className="text-sm">
              <div className="font-bold text-gray-900">{article.author}</div>
              <div className="text-gray-500 italic">Kontributor Blog</div>
            </div>
          </div>
        </header>

        <div className="rounded-2xl overflow-hidden mb-8">
          <img src={article.image} alt={article.title} className="w-full object-cover max-h-96" />
        </div>

        <article className="prose prose-indigo max-w-none text-gray-700 leading-relaxed text-lg">
          <p className="mb-6">{article.content}</p>
          <p>Ut id facilisis lectus. Praesent hendrerit libero vitae ante vehicula, vitae bibendum lacus euismod. Integer non purus eget diam fringilla posuere sed vitae neque. Cras sollicitudin massa quis urna tincidunt, eu aliquet ex dictum. Sed quis arcu id lacus feugiat ultrices.</p>
        </article>
      </div>

      <div className="border-t border-gray-100 bg-gray-50/50 p-6 md:p-10">
        <CommentSection 
          postId={article.id}
          securityMode={securityMode}
          comments={comments}
          onAddComment={onAddComment}
        />
      </div>
    </div>
  );
};

export default ArticleDetail;
