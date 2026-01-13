import React, { useState, useEffect } from "react";
import { BLOG_POSTS } from "./constants";
import { SecurityMode, Article, Comment } from "./types";
import Navbar from "./components/Navbar";
import BlogCard from "./components/BlogCard";
import ArticleDetail from "./components/ArticleDetail";
import SecurityPanel from "./components/SecurityPanel";
import DefacementMonitor from "./components/DefacementMonitor";
import EducationPanel from "./components/EducationPanel";
import DemoController from "./components/DemoController";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  const [securityMode, setSecurityMode] = useState<SecurityMode>(
    SecurityMode.VULNERABLE,
  );
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Record<number, Comment[]>>({});
  const [searchResults, setSearchResults] = useState<Article[]>(BLOG_POSTS);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Initialize comments from localStorage or empty
  useEffect(() => {
    const saved = localStorage.getItem("blog_comments");
    if (saved) {
      setComments(JSON.parse(saved));
    }
  }, []);

  const saveComments = (newComments: Record<number, Comment[]>) => {
    setComments(newComments);
    localStorage.setItem("blog_comments", JSON.stringify(newComments));
  };

  const handleAddComment = (postId: number, author: string, text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      author,
      text,
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updated = {
      ...comments,
      [postId]: [...(comments[postId] || []), newComment],
    };
    saveComments(updated);
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
        setSecurityMode={setSecurityMode}
        onHomeClick={() => setSelectedPostId(null)}
      />

      <main className="flex-grow container mx-auto px-4 py-8 lg:flex lg:gap-8">
        <div className="lg:w-2/3">
          {selectedPostId ? (
            <ArticleDetail
              article={selectedPost!}
              securityMode={securityMode}
              comments={comments[selectedPostId] || []}
              onAddComment={(author, text) =>
                handleAddComment(selectedPostId, author, text)
              }
              onBack={() => setSelectedPostId(null)}
            />
          ) : (
            <>
              <SearchBar securityMode={securityMode} onSearch={handleSearch} />

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

        <aside className="lg:w-1/3 mt-8 lg:mt-0 space-y-6">
          <SecurityPanel
            securityMode={securityMode}
            setSecurityMode={setSecurityMode}
          />

          <DefacementMonitor
            securityMode={securityMode}
            comments={
              selectedPostId
                ? comments[selectedPostId] || []
                : Object.values(comments).flat()
            }
          />

          <EducationPanel securityMode={securityMode} />

          <DemoController
            securityMode={securityMode}
            onModeChange={setSecurityMode}
            onAddComment={(author, text) => {
              if (selectedPostId) {
                handleAddComment(selectedPostId, author, text);
              }
            }}
            currentPostId={selectedPostId}
          />
        </aside>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            &copy; 2024 SecurePath Education. Lab ini hanya untuk tujuan edukasi
            keamanan web.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
