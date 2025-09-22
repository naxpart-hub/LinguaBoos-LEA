
import React from 'react';
import type { Chapter } from '../types';
import { BookIcon } from './Icons';

interface SidebarProps {
  chapters: Chapter[];
  currentChapterId: string;
  onSelectChapter: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ chapters, currentChapterId, onSelectChapter }) => {
  return (
    <nav className="w-64 bg-background-light shadow-lg flex-shrink-0 p-4 hidden md:flex flex-col">
      <h2 className="text-xl font-bold text-secondary-dark mb-4 px-2">Chapitres</h2>
      <ul className="space-y-1">
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <button
              onClick={() => onSelectChapter(chapter.id)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                currentChapterId === chapter.id
                  ? 'bg-primary text-primary-contrast font-semibold shadow-md scale-105'
                  : 'text-secondary hover:bg-slate-200/60 hover:text-secondary-dark'
              }`}
            >
              <BookIcon />
              <span className="flex-1">{chapter.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};