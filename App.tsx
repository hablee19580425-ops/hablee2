import React, { useState, useEffect } from 'react';
import { Game, GameFormData } from './types';
import { GameCard } from './components/GameCard';
import { AddGameModal } from './components/AddGameModal';
import { GameDetailModal } from './components/GameDetailModal';
import { Plus, Search, FolderOpen, Trash2 } from 'lucide-react';

const GAME_TITLES = [
  { 
    ko: "조커스 주얼즈 홀드 앤 스핀", 
    en: "Joker’s Jewels Hold & Spin",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs5jokjewhs%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "포춘 오브 올림푸스", 
    en: "Fortune of Olympus",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs20olympgcl%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "아나콘다 골드", 
    en: "Anaconda Gold",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvswaysacnd%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "해머스톰", 
    en: "Hammerstorm",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs40hmrstrm%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "럭키 포춘 트리", 
    en: "Lucky Fortune Tree",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs5luckycol%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "게이츠 오브 가톳카카 슈퍼 스캐터", 
    en: "Gates of Gatot Kaca Super Scatter",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3FgameSymbol%3Dvs20olgatssc%26websiteUrl%3Dhttps%253A%252F%252Fdemogamesfree.pragmaticplay.net%26jurisdiction%3D99%26lobby_url%3Dhttps%253A%252F%252Fwww.pragmaticplay.com%252Fko%252F%26lang%3DKO%26cur%3DKRW"
  },
  { 
    ko: "빅배스 스플레쉬 1000", 
    en: "Big Bass Splash 1000",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs10bbsplashx%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "블러디 던", 
    en: "Bloody Dawn",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvswayswildb%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "게이츠 오브 파이로스", 
    en: "Gates of Pyroth",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3FgameSymbol%3Dvs20shmnarise%26websiteUrl%3Dhttps%253A%252F%252Fdemogamesfree.pragmaticplay.net%26jurisdiction%3D99%26lobby_url%3Dhttps%253A%252F%252Fwww.pragmaticplay.com%252Fko%252F%26lang%3DKO%26cur%3DKRW"
  },
  { 
    ko: "스위트 크레이지", 
    en: "Sweet Craze",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs20chestcol%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "위즈덤 오브 아테나 1000 X마스", 
    en: "Wisdom of Athena 1000 Xmas",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs20procountxm%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "제우스 vs 타이픈", 
    en: "Zeus vs Typhon",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3F%3Flang%3Dko%26cur%3DKRW%26jurisdiction%3D99%26gameSymbol%3Dvswaysreelbtl"
  },
  { 
    ko: "산타스 슬레이", 
    en: "Santa’s Slay",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs10santasl%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2Fv"
  },
  { 
    ko: "수퍼 거미 스트라이크", 
    en: "Super Gummy Strike",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs5supergummy%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "디제이 네코", 
    en: "DJ Neko",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs10djneko%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "듀얼스 오브 나이트 앤 데이", 
    en: "Duels of Night & Day",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net%2Fhub-demo%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvswaysyinyang%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "스타라이트 아처 1000", 
    en: "Starlight Archer 1000",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3FgameSymbol%3Dvs20stararx%26websiteUrl%3Dhttps%253A%252F%252Fdemogamesfree.pragmaticplay.net%26jurisdiction%3D99%26lobby_url%3Dhttps%253A%252F%252Fwww.pragmaticplay.com%252Fko%252F%26lang%3DKO%26cur%3DKRW"
  },
  { 
    ko: "빅 배스 크리스마스 프로즌 레이크", 
    en: "Big Bass Christmas Frozen Lake",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs10bbglxmas%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "와일드 와일드 리치스 리턴즈", 
    en: "Wild Wild Riches Returns",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvswayswwrichr%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "오라클 오브 골드", 
    en: "Oracle of Gold",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs20oragold%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
  { 
    ko: "스타라이트 프린세스 슈퍼 스캐터", 
    en: "Starlight Princess Super Scatter",
    url: "https://slotbuff3.com/FreeSlot?executeurl=https%3A%2F%2Fdemogamesfree-asia.pragmaticplay.net%2Fgs2c%2FopenGame.do%3Flang%3Dko%26cur%3DKRW%26websiteUrl%3Dhttps%253A%252F%252Fclienthub.pragmaticplay.com%252F%26gcpif%3D2831%26gameSymbol%3Dvs20starprss%26jurisdiction%3D99%26lobbyUrl%3Dhttps%3A%2F%2Fclienthub.pragmaticplay.com%2Fslots%2Fgame-library%2F"
  },
];

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Determine the next title to suggest based on how many games are already added
  const nextGameIndex = games.length % GAME_TITLES.length;
  const nextGameData = GAME_TITLES[nextGameIndex];

  // Initial demo data
  useEffect(() => {
    // Only add demo data if empty
    if (games.length === 0) {
       // Optional: Add some persistence logic here later
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddGame = (data: GameFormData) => {
    if (!data.imageFile) return;

    // Convert file to Base64 for storage/display in this session
    const reader = new FileReader();
    reader.onloadend = () => {
      const newGame: Game = {
        id: crypto.randomUUID(),
        titleKorean: data.titleKorean,
        titleEnglish: data.titleEnglish,
        linkUrl: data.linkUrl,
        imageUrl: reader.result as string,
      };
      setGames(prev => [newGame, ...prev]);
    };
    reader.readAsDataURL(data.imageFile);
  };

  const handleDeleteGame = (id: string) => {
    // Logic moved to Modal or triggered here directly if needed
    setGames(prev => prev.filter(g => g.id !== id));
    setSelectedGame(null); // Close modal if open
  };

  const handleLaunchGame = (game: Game) => {
    if (game.linkUrl) {
      window.open(game.linkUrl, '_blank');
    }
  };

  const handleRemoveDuplicates = () => {
    const uniqueGames: Game[] = [];
    const seenImages = new Set<string>();

    games.forEach(game => {
      // Check for duplicate images (Base64 string comparison)
      if (!seenImages.has(game.imageUrl)) {
        seenImages.add(game.imageUrl);
        uniqueGames.push(game);
      }
    });

    const count = games.length - uniqueGames.length;

    if (count === 0) {
      alert("중복된 그림이 없습니다.");
      return;
    }

    if (window.confirm(`중복된 그림 ${count}개를 발견했습니다. 삭제하시겠습니까?`)) {
      setGames(uniqueGames);
    }
  };

  const filteredGames = games
    .filter(game => 
      game.titleKorean.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.titleKorean.localeCompare(b.titleKorean, 'ko'));

  return (
    <div className="min-h-screen bg-nexus-dark text-nexus-text selection:bg-nexus-accent selection:text-white">
      
      {/* Background Ambience Removed for Pure Black Theme */}
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header Section - Removed Logo and Title, kept Search and Add Button */}
        <header className="flex justify-end items-center mb-8 gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 md:w-64 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input
              type="text"
              placeholder="Search library..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-nexus-card rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-nexus-accent transition-all text-neutral-200 placeholder-neutral-600"
            />
          </div>

          <button
            onClick={handleRemoveDuplicates}
            className="flex items-center gap-2 bg-neutral-800 hover:bg-red-900/40 text-neutral-400 hover:text-red-200 px-4 py-2.5 rounded-full font-medium transition-all"
            title="중복 그림 삭제"
          >
            <Trash2 size={20} />
            <span className="hidden sm:inline">중복 제거</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-nexus-accent hover:bg-nexus-accentHover text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-nexus-accent/25 hover:shadow-nexus-accent/40 transition-all transform hover:-translate-y-0.5"
          >
            <Plus size={20} strokeWidth={2.5} />
            <span className="hidden sm:inline">Add Game</span>
          </button>
        </header>

        {/* Content Grid */}
        {games.length > 0 ? (
          <div className="flex flex-wrap gap-6 items-start justify-start">
            {filteredGames.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onLaunch={handleLaunchGame}
                onOpenDetails={setSelectedGame}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center rounded-3xl bg-neutral-900/30 p-8">
             <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-neutral-600">
                <FolderOpen size={40} />
             </div>
             <h3 className="text-2xl font-bold text-neutral-300 mb-2">Your Library is Empty</h3>
             <p className="text-neutral-500 max-w-md mb-8">
               Import images from <code className="bg-black/50 px-2 py-1 rounded text-neutral-400 font-mono text-sm">C:\Users\a1\Pictures\spimage</code> to get started.
             </p>
             <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              <Plus size={20} /> Add First Game
            </button>
          </div>
        )}

      </div>

      <AddGameModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddGame}
        initialData={nextGameData}
      />

      <GameDetailModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onDelete={handleDeleteGame}
      />
    </div>
  );
};

export default App;