import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onLaunch: (game: Game) => void;
  onOpenDetails: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onLaunch, onOpenDetails }) => {
  return (
    <div 
      className="group relative bg-black overflow-hidden rounded-none animate-slide-up flex flex-col items-center"
      onContextMenu={(e) => {
        e.preventDefault();
        onOpenDetails(game);
      }}
    >
      {/* Image Container */}
      <div 
        className="w-full flex justify-center cursor-pointer bg-black"
        onClick={() => onLaunch(game)}
      >
        <div className="relative w-[270px] h-[140px] overflow-hidden">
          <img
            src={game.imageUrl}
            alt={game.titleEnglish}
            className="w-full h-full object-fill block" 
          />
        </div>
      </div>

      {/* Title Section */}
      <div 
        className="w-[270px] pb-4 mt-3 bg-black cursor-pointer text-center"
        onClick={() => onLaunch(game)}
      >
        <h3 className="text-nexus-text font-bold text-sm group-hover:text-nexus-accent transition-colors line-clamp-2 leading-tight break-keep">
          {game.titleKorean}
        </h3>
        {game.titleEnglish && (
          <p className="text-nexus-muted text-xs mt-0.5 line-clamp-2 leading-tight break-all">
            {game.titleEnglish}
          </p>
        )}
      </div>
    </div>
  );
};