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
        <div className="text-center pt-8 mb-4"> 
          <h2 className="text-3xl font-extrabold text-stone-800 mb-1">{currentBook.title}</h2>
          <p className="text-lg text-stone-400 uppercase tracking-widest">{currentBook.author}</p>
        </div>

            {/* 카드 레이아웃 */}
            <div className={`w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 transform ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} min-h-[650px] flex flex-col`}>
              <div className="p-9">
           {/* 책 표지 */}
              <div className="flex justify-center mb-10">
        <a 
          href={currentBook.url} 
          target="_blank" 
          rel="noreferrer" 
          className="relative group cursor-pointer transition-transform active:scale-95"
        >
          {/* 이미지 호버 시 살짝 밝아지는 효과 추가 */}
          <div className="absolute -inset-1 bg-stone-200 rounded blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
          <img 
            src={currentBook.thumbnail} 
            className="relative w-40 h-56 object-cover rounded-lg shadow-2xl transition-all group-hover:shadow-stone-300" 
            alt="book cover" 
          />
          
          {/* 안내 툴팁 (선택 사항: 사진 위에 살짝 띄움) */}
          <div className="absolute bottom-[-25px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-stone-400 whitespace-nowrap">
            Click to view details
          </div>
        </a>
      </div>    

          {/* 인용구 */}
          <div className="relative mb-10 -mx-4">
            <p className="relative text-lg text-stone-700 leading-relaxed text-center px-0 italic">
              {currentBook.contents || currentBook.content} 
            </p>
          </div>
          </div>
          </div>

      {/* 플로팅버튼 */}
          <button 
  onClick={nextBook}
  className="fixed bottom-5 left-6 right-6 z-50 flex items-center justify-center gap-3 bg-stone-800 text-white py-4 rounded-xl shadow-2xl hover:bg-stone-700 active:scale-95 transition-all"
>
  <RefreshCw 
    size={20} 
    className={!fade ? 'animate-spin' : ''} 
  />
  <span className="text-base tracking-[0.2em] font-bold uppercase">다음</span>
</button>

          <footer className="mt-20 text-stone-300 text-[10px] tracking-widest pb-2">
            © 2026 CURATED BY BOOKLOVERS
          </footer>
        </div>
  
  );
};

export default App;