import React, { useState, useEffect } from "react";
import { BLOG_POSTS } from "./constants";
import { SecurityMode, Article, Comment } from "./types";
import Navbar from "./components/Navbar";
import BlogCard from "./components/BlogCard";
import ArticleDetail from "./components/ArticleDetail";
import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import AttackerDashboard from "./components/AttackerDashboard";

const App: React.FC = () => {
  const [securityMode, setSecurityMode] = useState<SecurityMode>(
    SecurityMode.VULNERABLE,
  );
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchResults, setSearchResults] = useState<Article[]>(BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [user, setUser] = useState<{ username: string } | null>(null);

  // Navigation State
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'attacker'>('home');

  // Check login status and mode on mount
  useEffect(() => {
    fetch('/api/user')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));

    fetch('/api/status')
      .then(res => res.json())
      .then(data => {
        if (data.mode) setSecurityMode(data.mode as SecurityMode);
      });
  }, []);

  const handleModeChange = (newMode: SecurityMode) => {
    setSecurityMode(newMode);
    fetch('/api/mode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: newMode })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log("Mode switched to", newMode);
          if (selectedPostId) {
            fetch(`/api/comments?postId=${selectedPostId}`)
              .then(res => res.json())
              .then(d => setComments(d));
          }
        }
      });
  };

  // Fetch comments when post selected
  useEffect(() => {
    if (selectedPostId) {
      fetch(`/api/comments?postId=${selectedPostId}`)
        .then(res => res.json())
        .then(data => setComments(data))
        .catch(err => console.error(err));
    }
  }, [selectedPostId]);

  const handleAddComment = (postId: number, author: string, text: string) => {
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, author, text })
    })
      .then(res => res.json())
      .then(newComment => {
        setComments(prev => [newComment, ...prev]);
      })
      .catch(err => console.error(err));
  };

  const handleLoginSuccess = () => {
    // Refresh user state
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setCurrentPage('home'); // Redirect to home after login
      });
  };

  const handleLogout = () => {
    fetch('/api/logout', { method: 'POST' })
      .then(() => {
        setUser(null);
        alert("Logged out.");
      });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults(BLOG_POSTS);
      return;
    }

    const filtered = BLOG_POSTS.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase()) ||
        post.category.toLowerCase().includes(query.toLowerCase()),
    );

    setSearchResults(filtered);
  };

  const selectedPost = BLOG_POSTS.find((p) => p.id === selectedPostId);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        securityMode={securityMode}
        setSecurityMode={handleModeChange}
        onHomeClick={() => {
          setSelectedPostId(null);
          setCurrentPage('home');
        }}
        user={user}
        onLogin={() => setCurrentPage('login')}
        onLogout={handleLogout}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {currentPage === 'attacker' ? (
            <AttackerDashboard />
          ) : currentPage === 'login' ? (
            <Login onLoginSuccess={handleLoginSuccess} />
          ) : selectedPostId ? (
            <ArticleDetail
              article={selectedPost!}
              securityMode={securityMode}
              comments={comments}
              onAddComment={(author, text) =>
                handleAddComment(selectedPostId, author, text)
              }
              onBack={() => setSelectedPostId(null)}
            />
          ) : (
            <>
              <SearchBar onSearch={handleSearch} />

              {searchQuery && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-800">
                        Search Results
                      </h3>
                      <p className="text-sm text-blue-600">
                        {searchResults.length} result(s) for "{searchQuery}"
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults(BLOG_POSTS);
                      }}
                      className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-all"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {searchResults.length > 0 ? (
                  searchResults.map((post) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      onClick={() => setSelectedPostId(post.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <i className="fas fa-search text-4xl"></i>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">
                      No articles found
                    </h3>
                    <p className="text-gray-500">
                      Try a different search term or clear your search
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p className="mb-2">
            &copy; 2024 SecurePath Education. Lab ini hanya untuk tujuan edukasi
            keamanan web.
          </p>
          <button
            onClick={() => setCurrentPage(currentPage === 'attacker' ? 'home' : 'attacker')}
            className="text-xs text-red-300 hover:text-red-500 transition-colors"
          >
            [ Attacker Dashboard ]
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
