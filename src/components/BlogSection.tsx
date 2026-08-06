import React, { useState } from 'react';
import { BlogPost, Comment } from '../types';
import { MOCK_BLOG_POSTS } from '../data/mockData';
import { 
  getLikedPostIds, 
  togglePostLike, 
  getSavedComments, 
  saveComment 
} from '../utils/storage';
import { 
  BookOpen, 
  Search, 
  Heart, 
  MessageSquare, 
  Share2, 
  Clock, 
  MapPin, 
  X, 
  Send, 
  UserCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Likes state
  const [likedIds, setLikedIds] = useState<string[]>(getLikedPostIds());

  // Comments state inside modal
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const categories = ['All', 'Clean Water', 'Education', 'Disaster Relief', 'Field Report'];

  const filteredPosts = MOCK_BLOG_POSTS.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleOpenPost = (post: BlogPost) => {
    setActivePost(post);
    setCommentsList(getSavedComments(post.id));
  };

  const handleToggleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    togglePostLike(postId);
    setLikedIds(getLikedPostIds());
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !newCommentText.trim()) return;

    const commentObj: Comment = {
      id: `cm-${Date.now()}`,
      postId: activePost.id,
      author: newCommentAuthor.trim() || 'Supporter',
      text: newCommentText.trim(),
      createdAt: 'Just now',
    };

    const updated = saveComment(commentObj);
    setCommentsList(updated);
    setNewCommentText('');
  };

  const featuredPost = MOCK_BLOG_POSTS.find((p) => p.featured) || MOCK_BLOG_POSTS[0];

  return (
    <section className="py-12 sm:py-16 bg-[#FDFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F7F3EA] text-[#556B2F] font-bold text-xs uppercase tracking-[0.2em] border border-[#E6E1D6]">
            <BookOpen className="w-3.5 h-3.5 text-[#556B2F]" /> Frontline Field Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#2F4F4F]">
            Field Updates & Stories of Hope
          </h1>
          <p className="text-[#6B6B5E] text-base sm:text-lg font-sans">
            Direct dispatches from our water engineers, educators, and disaster response teams across 14 countries.
          </p>
        </div>

        {/* Featured Post Hero */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <div
            onClick={() => handleOpenPost(featuredPost)}
            className="group cursor-pointer bg-[#F7F3EA] rounded-[32px] overflow-hidden border border-[#E6E1D6] shadow-sm grid grid-cols-1 lg:grid-cols-12 transform transition-all hover:border-[#556B2F]"
          >
            <div className="lg:col-span-7 relative h-64 sm:h-96 overflow-hidden">
              <img
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1 bg-[#CC7A5C] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-xs">
                  ★ Featured Dispatch
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#8B8B7A]">
                  <span className="px-2.5 py-0.5 bg-[#E2DFD4] text-[#556B2F] font-bold uppercase tracking-wider rounded-md">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#556B2F]" /> {featuredPost.location}
                  </span>
                  <span>• {featuredPost.date}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2F4F4F] group-hover:text-[#556B2F] transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-[#6B6B5E] text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-[#E6E1D6] pt-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#E2DFD4]"
                  />
                  <div>
                    <p className="font-bold text-xs text-[#2F4F4F] font-serif">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-[#8B8B7A]">{featuredPost.author.role}</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#556B2F] uppercase tracking-wider">
                  Read Journal <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Filter Bar & Search */}
        <div className="bg-[#F7F3EA] p-4 rounded-2xl border border-[#E6E1D6] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#556B2F] text-white shadow-xs'
                    : 'bg-[#FDFBF7] text-[#5A5A40] hover:bg-[#E2DFD4] border border-[#E6E1D6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#8B8B7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search field reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl text-xs font-medium text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => {
            const isLiked = likedIds.includes(post.id);
            const extraLikes = isLiked ? 1 : 0;
            return (
              <article
                key={post.id}
                onClick={() => handleOpenPost(post)}
                className="group cursor-pointer bg-[#F7F3EA] rounded-[32px] overflow-hidden border border-[#E6E1D6] shadow-xs flex flex-col justify-between transform transition-all hover:border-[#556B2F] hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 bg-[#FDFBF7]/90 backdrop-blur-md text-[#2F4F4F] font-bold text-[10px] uppercase tracking-wider rounded-lg border border-[#E6E1D6]">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-[#8B8B7A]">
                      <span className="flex items-center gap-1 font-semibold text-[#556B2F]">
                        <MapPin className="w-3 h-3 text-[#556B2F]" /> {post.location}
                      </span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#2F4F4F] group-hover:text-[#556B2F] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#6B6B5E] leading-relaxed line-clamp-3 font-sans">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#E6E1D6] mt-4 flex items-center justify-between text-xs text-[#6B6B5E]">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="font-semibold text-[#2F4F4F] text-[11px] font-serif">{post.author.name}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleToggleLike(post.id, e)}
                      className={`flex items-center gap-1 transition-colors ${
                        isLiked ? 'text-[#CC7A5C] font-bold' : 'hover:text-[#CC7A5C]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-[#CC7A5C]' : ''}`} />
                      <span>{post.likes + extraLikes}</span>
                    </button>

                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.commentsCount}</span>
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Blog Detail Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2F4F4F]/80 backdrop-blur-md overflow-y-auto">
          <div className="bg-[#FDFBF7] rounded-[32px] max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#E6E1D6] shadow-2xl my-8">
            {/* Modal Top Bar */}
            <div className="relative h-64 sm:h-80 overflow-hidden">
              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F4F4F] via-[#2F4F4F]/40 to-transparent" />

              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-2.5 bg-[#2F4F4F]/80 hover:bg-[#2F4F4F] text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="px-3 py-1 bg-[#556B2F] text-white font-bold text-xs uppercase tracking-wider rounded-lg">
                  {activePost.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{activePost.title}</h2>
                <div className="flex items-center gap-3 text-xs text-[#E2DFD4]">
                  <span>{activePost.location}</span>
                  <span>•</span>
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                </div>
              </div>
            </div>

            {/* Author Bar */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[#E6E1D6]">
                <div className="flex items-center gap-3">
                  <img
                    src={activePost.author.avatar}
                    alt={activePost.author.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#556B2F]"
                  />
                  <div>
                    <p className="font-serif font-bold text-sm text-[#2F4F4F]">{activePost.author.name}</p>
                    <p className="text-xs text-[#8B8B7A]">{activePost.author.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleLike(activePost.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all ${
                      likedIds.includes(activePost.id)
                        ? 'bg-[#F7F3EA] text-[#CC7A5C] border-[#CC7A5C]'
                        : 'bg-[#F7F3EA] text-[#5A5A40] border-[#E6E1D6] hover:bg-[#E2DFD4]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedIds.includes(activePost.id) ? 'fill-[#CC7A5C] text-[#CC7A5C]' : ''}`} />
                    <span>{activePost.likes + (likedIds.includes(activePost.id) ? 1 : 0)} Likes</span>
                  </button>

                  <button
                    onClick={() => alert('Article link copied to clipboard!')}
                    className="p-2.5 bg-[#F7F3EA] text-[#2F4F4F] rounded-full border border-[#E6E1D6] hover:bg-[#E2DFD4]"
                    title="Share Article"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body Text */}
              <div className="prose max-w-none text-[#333333] text-sm leading-relaxed space-y-4 font-sans">
                {activePost.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Comments Section */}
              <div className="border-t border-[#E6E1D6] pt-8 space-y-6">
                <h3 className="text-lg font-serif font-bold text-[#2F4F4F] flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#556B2F]" />
                  Community Comments ({commentsList.length})
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="space-y-3 bg-[#F7F3EA] p-4 rounded-2xl border border-[#E6E1D6]">
                  <input
                    type="text"
                    placeholder="Your Name (Optional)"
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                  />
                  <textarea
                    rows={2}
                    placeholder="Leave an encouraging comment for our field team..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 text-xs bg-[#FDFBF7] border border-[#E6E1D6] rounded-xl text-[#2F4F4F] focus:outline-hidden focus:border-[#556B2F]"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#556B2F] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#435424] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" /> Post Comment
                  </button>
                </form>

                {/* Comments Stream */}
                <div className="space-y-3">
                  {commentsList.length === 0 ? (
                    <p className="text-xs text-[#8B8B7A] italic">Be the first to comment on this field story.</p>
                  ) : (
                    commentsList.map((c) => (
                      <div key={c.id} className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E6E1D6] space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-serif font-bold text-[#2F4F4F]">{c.author}</span>
                          <span className="text-[10px] text-[#8B8B7A]">{c.createdAt}</span>
                        </div>
                        <p className="text-xs text-[#6B6B5E] font-sans">{c.text}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
