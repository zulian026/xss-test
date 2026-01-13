
import React from 'react';
import { Article } from '../types';

interface BlogCardProps {
  post: Article;
  onClick: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-indigo-600 uppercase">
          {post.category}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <span>{post.date}</span>
          <span>•</span>
          <span>Oleh {post.author}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {post.excerpt}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
