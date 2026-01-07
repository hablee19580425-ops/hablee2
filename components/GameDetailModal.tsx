import React from 'react';
import { Game } from '../types';
import { X, Play, Trash2 } from 'lucide-react';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose, onDelete }) => {
  if (!game) return null;

  const handleLaunch = () => {
    window.open(game.linkUrl, '_blank');
  };

  const handleDelete = () => {
    if (window.confirm("정말 이 게임을 라이브러리에서 삭제하시겠습니까?")) {
      onDelete(game.id);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button - Top Right fixed */}
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 z-50 p-3 bg-black/40 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-all"
      >
        <X size={28} />
      </button>

      {/* Main Image Area - Takes full viewport space */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
         <img 
           src={game.imageUrl} 
           alt={game.titleEnglish} 
           className="w-full h-full object-contain"
           onClick={(e) => e.stopPropagation()}
         />
      </div>

      {/* Floating Action Bar - Minimal, Bottom Right only */}
      <div 
          className="absolute bottom-0 left-0 right-0 pb-10 px-8 md:px-16 flex items-center justify-end gap-6 z-40"
          onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={handleDelete}
            className="p-4 rounded-full bg-black/40 hover:bg-red-900/40 text-slate-300 hover:text-red-200 transition-all shadow-lg"
            title="Delete Game"
          >
            <Trash2 size={24} />
          </button>
          <button
            onClick={handleLaunch}
            className="flex items-center gap-3 bg-white text-black hover:bg-nexus-accent hover:text-white px-10 py-4 rounded-full font-black text-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105 transition-all"
          >
            <Play fill="currentColor" size={24} />
            PLAY
          </button>
        </div>
      </div>
    </div>
  );
};