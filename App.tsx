
import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from './constants';
import { SecurityMode, Article, Comment } from './types';
import Navbar from './components/Navbar';
import BlogCard from './components/BlogCard';
import ArticleDetail from './components/ArticleDetail';
import SecurityPanel from './components/SecurityPanel';

const App: React.FC = () => {
  const [securityMode, setSecurityMode] = useState<SecurityMode>(SecurityMode.VULNERABLE);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});

  // Initialize comments from localStorage or empty
  useEffect(() => {
    const saved = localStorage.getItem('blog_comments');
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  const saveComments = (newComments: Record<number, Comment[]>) => {
    setComments(newComments);
    localStorage.setItem('blog_comments', JSON.stringify(newComments));
  };

  const handleAddComment = (postId: number, author: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author,
      text,
      date: new Date().toLocaleDateString('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    const updated = {
      ...comments,
      [postId]: [...(comments[postId] || []), newComment]
    };
    saveComments(updated);
  };

  const selectedPost = BLOG_POSTS.find(p => p.id === selectedPostId);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar 
        securityMode={securityMode} 
        setSecurityMode={setSecurityMode} 
        onHomeClick={() => setSelectedPostId(null)}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8 lg:flex lg:gap-8">
        <div className="lg:w-3/4">
          {selectedPostId ? (
            <ArticleDetail 
              article={selectedPost!} 
              securityMode={securityMode}
              comments={comments[selectedPostId] || []}
              onAddComment={(author, text) => handleAddComment(selectedPostId, author, text)}
              onBack={() => setSelectedPostId(null)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BLOG_POSTS.map(post => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  onClick={() => setSelectedPostId(post.id)} 
                />
              ))}
            </div>
          )}
        </div>
        
        <aside className="lg:w-1/4 mt-8 lg:mt-0">
          <SecurityPanel 
            securityMode={securityMode} 
            setSecurityMode={setSecurityMode}
          />
        </aside>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; 2024 SecurePath Education. Lab ini hanya untuk tujuan edukasi keamanan web.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
