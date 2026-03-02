import React, { useState, useEffect } from 'react';
import { RefreshCw, BookOpen, ExternalLink } from 'lucide-react';

const App = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch('/books.json')
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setCurrentBook(data[0]);
      })
      .catch((err) => console.error("데이터 로드 실패:", err));
  }, []);

  const nextBook = () => {
    if (books.length === 0) return;
    setFade(false);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * books.length);
      setCurrentBook(books[randomIndex]);
      setFade(true);
    }, 300);
  };

  if (!currentBook) return <div className="h-screen flex items-center justify-center bg-[#f8f5f2] text-stone-400">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex flex-col items-center justify-center p-6 font-serif">
      {/* 도서 정보 */}
        <div className="text-center pt-8 border-t border-stone-50 mb-8"> 
          <h2 className="text-3xl font-extrabold text-stone-800 mb-1">{currentBook.title}</h2>
          <p className="text-lg text-stone-400 uppercase tracking-widest">{currentBook.author}</p>
          
          <a 
            href={currentBook.url} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-block mt-4 text-stone-300 hover:text-stone-500 text-[15px] underline underline-offset-4"
          >
            View Details
          </a>
        </div>

      {/* 카드 레이아웃 */}
      <div className={`w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="p-10">
          {/* 책 표지 */}
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-stone-200 rounded blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img 
                src={currentBook.thumbnail} 
                className="relative w-36 h-52 object-cover rounded-lg shadow-2xl" 
                alt="book cover" 
              />
            </div>
          </div>

          {/* 인용구 */}
          <div className="relative mb-10">
            <span className="absolute -top-4 -left-2 text-6xl text-stone-100 font-serif">“</span>
            <p className="relative text-lg text-stone-700 leading-relaxed text-center px-2 italic">
              {currentBook.contents || currentBook.content} 
            </p>
          </div>
          </div>
          </div>

      {/* 플로팅버튼 */}
          <button 
  onClick={nextBook}
  className="fixed bottom-10 left-6 right-6 z-50 flex items-center justify-center gap-3 bg-stone-800 text-white py-4 rounded-xl shadow-2xl hover:bg-stone-700 active:scale-95 transition-all"
>
  <RefreshCw 
    size={20} 
    className={!fade ? 'animate-spin' : ''} 
  />
  <span className="text-base tracking-[0.2em] font-bold uppercase">다음</span>
</button>

          <footer className="mt-20 text-stone-300 text-[10px] tracking-widest pb-20">
            © 2026 CURATED BY BOOKLOVERS
          </footer>
        </div>
  
  );
};

export default App;