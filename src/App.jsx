import React, { useState, useEffect } from 'react';
import { RefreshCw, BookOpen, ExternalLink } from 'lucide-react';

// 💡 별도의 CSS 설정 없이도 이 코드가 실행되면 자동으로 디자인이 입혀집니다.
const App = () => {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    fetch('/books.json')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setCurrentBook(data[0]);
      })
      .catch(err => console.error("데이터 로드 실패:", err));
    
    // Tailwind CSS를 동적으로 불러오기 위한 스크립트 추가
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
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

  if (!currentBook) return (
    <div className="h-screen flex items-center justify-center bg-stone-50 text-stone-400 font-serif">
      문장을 불러오는 중입니다...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f5f2] flex flex-col items-center justify-center p-6 font-serif">
      {/* 헤더 */}
      <header className="mb-12 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 text-stone-400">
          <BookOpen size={20} />
          <span className="text-xs tracking-[0.3em] uppercase">Reading Moment</span>
        </div>
        <h1 className="text-3xl font-light tracking-tighter text-stone-800">MOMENT OF BOOKS</h1>
      </header>

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
            <p className="relative text-xl text-stone-700 leading-relaxed text-center px-2 italic">
              {currentBook.content}
            </p>
          </div>

          {/* 도서 정보 */}
          <div className="text-center pt-8 border-t border-stone-50">
            <h2 className="text-lg font-bold text-stone-800 mb-1">{currentBook.title}</h2>
            <p className="text-sm text-stone-400 uppercase tracking-widest">{currentBook.author}</p>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="bg-stone-50/50 px-8 py-4 flex justify-between items-center">
          <a href={currentBook.url} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-600 flex items-center gap-1 text-xs">
            Detail <ExternalLink size={12} />
          </a>
          <button 
            onClick={nextBook}
            className="flex items-center gap-2 bg-stone-800 text-white px-5 py-2.5 rounded-full text-sm hover:bg-stone-700 active:scale-95 transition-all shadow-lg shadow-stone-200"
          >
            <RefreshCw size={14} className={!fade ? 'animate-spin' : ''} />
            Next Quote
          </button>
        </div>
      </div>

      <footer className="mt-16 text-stone-300 text-[10px] tracking-widest">
        © 2026 CURATED BY BOOKLOVERS
      </footer>
    </div>
  );
};

export default App;